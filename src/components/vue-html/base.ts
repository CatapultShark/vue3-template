import { h, createApp } from 'vue';
import { HtmlNode, HtmlNodeModel } from '@logicflow/core';

import baseNode from './baseNode.vue';

const NEXT_X_DISTANCE = 200;
const NEXT_Y_DISTANCE = 100;

class BaseNodeView extends HtmlNode {
  root: HTMLDivElement;
  vueComponent: typeof baseNode;
  vm: any;
  app: any;
  isMounted: boolean;

  constructor(props: any) {
    super(props);
    this.root = document.createElement('div');
    this.vueComponent = baseNode;
    this.isMounted = false;
  }

  // 更新
  shouldUpdate(): boolean {
    const data = {
      ...this.props.model.properties,
      isSelected: this.props.model.isSelected,
      isHovered: this.props.model.isHovered
    };
    if (this.preProperties && this.preProperties === JSON.stringify(data))
      return false;
    this.preProperties = JSON.stringify(data);
    return true;
  }

  setHtml(rootEl: SVGForeignObjectElement) {
    rootEl.appendChild(this.root);
    // if (this.app) {
    //   this.app.mount(this.root);
    // } else {
    //   this.app = createApp({
    //     render: () =>
    //       h(this.vueComponent, {
    //         model: this.props.model,
    //         graphModel: this.props.graphModel,
    //         disabled: this.props.graphModel.editConfigModel.isSilentMode,
    //         isSelected: this.props.model.isSelected,
    //         isHovered: this.props.model.isHovered,
    //         properties: this.props.model.getProperties(),
    //         text: this.props.model.inputData,
    //         onBtnClick: (i: any) => {
    //           this.props.graphModel.eventCenter.emit('custom:onBtnClick', i);
    //         }
    //       })
    //   });
    //   this.app.mount(this.root);
    // }
    // console.log(this.props.model.isHovered, 'this.props.model');
    // if (!this.isMounted && !this.props.model.isHovered) {
    //   this.isMounted = true;
    //   return;
    // }
    // if (!this.props.model.isHovered) return;

    if (this.app) {
      // return;
      this.app.unmount();
    }
    this.app = createApp({
      render: () =>
        h(this.vueComponent, {
          // props
          model: this.props.model,
          graphModel: this.props.graphModel,
          disabled: this.props.graphModel.editConfigModel.isSilentMode,
          isSelected: this.props.model.isSelected,
          isHovered: this.props.model.isHovered,
          properties: this.props.model.getProperties(),
          text: this.props.model.inputData,
          // 事件监听器
          onBtnClick: (i: any) => {
            this.props.graphModel.eventCenter.emit('custom:onBtnClick', i);
          }
        })
    });
    this.app.mount(this.root);
  }

  // setHtml(rootEl: SVGForeignObjectElement) {
  //   if (!this.isMounted) {
  //     this.isMounted = true;
  //     const node = document.createElement('div');
  //     rootEl.appendChild(node);
  //     this.app.mount(node);
  //   } else {
  //     console.log('22222');
  //     // this.r.component.props.properties = this.props.model.getProperties();

  //     // 重新渲染组件以更新属性
  //     this.app.unmount();
  //     this.app = createApp({
  //       render: () =>
  //         h(baseNode, {
  //           model: this.props.model,
  //           graphModel: this.props.graphModel,
  //           disabled: this.props.graphModel.editConfigModel.isSilentMode,
  //           isSelected: this.props.model.isSelected,
  //           isHovered: this.props.model.isHovered,
  //           properties: this.props.model.getProperties(),
  //           text: this.props.model.inputData,
  //           onBtnClick: (i: any) => {
  //             this.props.graphModel.eventCenter.emit('custom:onBtnClick', i);
  //           }
  //         })
  //     });
  //     this.app.mount(this.root);
  //   }
  // }
}

class BaseNodeModel extends HtmlNodeModel {
  preProperties: string | null = null;

  // 设置 model 形状属性，每次 properties 发生变化会触发
  setAttributes(): void {
    this.width = 300;
    this.height = 75;
    this.text.editable = false; // 是否可以双击编辑文本
  }

  setHeight(val: number): void {
    this.height = val;
  }

  // 自定义节点轮廓框的样式属性
  getOutlineStyle(): any {
    const style = super.getOutlineStyle();
    style.hover!.stroke = 'none';
    return style;
  }

  // 重新设置默认锚点, 可以给锚点加上 id 等自定义属性，用于对锚点的验证。
  getDefaultAnchor(): any[] {
    const { id, x, y, height } = this;
    const anchors = [];
    // 定义上下锚点，底部锚点的 x 坐标与节点的中心点相同
    anchors.push({
      x,
      y: y - height / 2,
      id: `${id}_incomming`,
      edgeAddable: false,
      type: 'incomming'
    });
    anchors.push({
      x, // 底部锚点的 x 坐标与节点中心点一致
      y: y + height / 2, // 底部锚点的 y 坐标是中心点加上高度的一半
      name: 'bottom', // 锚点名称
      id: `${id}_0` // 锚点唯一 ID
    });
    return anchors;
  }

  // 自定义边箭头样式
  getArrowStyle() {
    console.log('getArrowStyle');
    const style = super.getArrowStyle();
    style.stroke = 'green';
    return style;
  }

  // getEdgeStyle() {
  //   const edgeStyle = super.getEdgeStyle();
  //   //可以自己设置线的显示样式，甚至隐藏掉原本的线，自己用react绘制
  //   edgeStyle.strokeDasharray = '4 4';
  //   edgeStyle.stroke = '#DDDFE3';
  //   return edgeStyle;
  // }

  addNode(node: any, nextY: number = 0): void {
    const isDeep = nextY !== 0;
    const nodeModel = this.graphModel.getNodeModelById(node.sourceId);
    const leftTopX = node.x + NEXT_X_DISTANCE - 50 - 10;
    const leftTopY = node.y + nextY - 40 - 8;
    const rightBottomX = node.x + NEXT_X_DISTANCE + 50 + 10;
    const rightBottomY = node.y + nextY + 40 + 8;
    const existElements = this.graphModel.getAreaElement(
      this.getHtmlPoint([leftTopX, leftTopY]),
      this.getHtmlPoint([rightBottomX, rightBottomY])
    );
    if (existElements.length) {
      this.addNode(node, nextY + NEXT_Y_DISTANCE);
      return;
    }
    const newNode = this.graphModel.addNode({
      type: node.type,
      x: node.x + NEXT_X_DISTANCE,
      y: node.y + nextY,
      properties: node.properties
    });
    let startPoint: any;
    let endPoint: any;
    if (isDeep) {
      startPoint = {
        x: node.x,
        y: node.y + nodeModel!.height / 2
      };
      endPoint = {
        x: newNode.x - newNode.width / 2,
        y: newNode.y
      };
    }
    this.graphModel.addEdge({
      sourceNodeId: node.sourceId,
      targetNodeId: newNode.id,
      startPoint,
      endPoint
    });
    this.graphModel.selectElementById(newNode.id);
    this.graphModel.showContextMenu(newNode);
  }
}

export default {
  type: 'base-node',
  model: BaseNodeModel,
  view: BaseNodeView
};
