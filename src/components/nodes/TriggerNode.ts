import { RectNode, RectNodeModel, h } from '@logicflow/core';

// 自定义触发器节点的视图
class TriggerNodeView extends RectNode {
  /**
   * 重写 LogicFlow 提供的 getShape 方法，用于定义节点的外观。
   * @returns 节点的 SVG 形状。
   * 为什么这样做：
   * 1. LogicFlow 默认的节点样式可能无法满足实际业务需求。
   * 2. 使用自定义方法灵活设计节点外观，更贴合业务场景。
   * 意义：
   * 定制化节点的视觉样式，有助于用户快速理解节点的作用。
   */
  getShape() {
    const { x, y, width, height, properties } = this.props.model;
    // console.log(this.props.model, 'this.props.model');
    const { order = 1, title = '定时触发器' } = properties; // 动态属性

    return h('g', {}, [
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        fill: '#FFFAF0', // 背景颜色
        stroke: '#FFB74D', // 边框颜色
        rx: 6,
        ry: 6
      }),
      h(
        'text',
        {
          x,
          y: y - 5,
          textAnchor: 'middle',
          fontSize: 14,
          fill: '#333' // 主标题颜色
        },
        `${order}. ${title}` // 动态主标题，包含序号和标题
      )
    ]);
  }
}

// 自定义触发器节点的数据模型
class TriggerNodeModel extends RectNodeModel {
  /**
   * 自定义节点的初始化数据。
   * 为什么这样做：
   * 1. 我们希望每个节点在创建时具有特定的宽高等属性。
   * 2. 避免每次手动设置节点尺寸。
   * 意义：
   * 提高代码的复用性与一致性，减少冗余配置。
   */
  setAttributes() {
    this.width = 200;
    this.height = 60;
  }

  getNodeStyle() {
    const properties = this.properties;
    console.log('properties', properties);
    const style = super.getNodeStyle();
    // style.stroke = 'blue';
    // style.strokeDasharray = '3 3';
    return style;
  }
  // 自定义边被选中时展示其范围的矩形框样式
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    console.log('getOutlineStyle', style);
    style.stroke = 'red';
    // style.hover.stroke = 'none';
    return style;
  }
}

// 导出自定义节点的类型、视图和模型
export default {
  type: 'trigger-node', // 自定义节点的唯一标识符
  view: TriggerNodeView, // 节点视图类
  model: TriggerNodeModel // 节点模型类
};
