// 导入 HtmlNode 及其模型，为后续继承做准备
import { HtmlNode, HtmlNodeModel } from '@logicflow/core';
// 导入 Vue 相关方法，用于渲染组件
import { createApp, h } from 'vue';
// 导入 SQL 元素的 Vue 组件
import SqlElement from './sql-element.vue';

/**
 * 定义一个 SQL 元素的 HTML 节点类，继承自 HtmlNode
 * 该类负责在 HTML 中渲染 SQL 元素，并处理其交互逻辑
 */
class SqlElementHtmlNode extends HtmlNode {
  isMounted: any; // 标记组件是否已挂载
  r: any; // 渲染函数
  app: any; // Vue 应用实例

  /**
   * 构造函数
   * @param props 传递给节点的属性，包括模型、图模型等
   */
  constructor(props: any) {
    super(props);
    this.isMounted = false;
    // 创建 SQL 元素的渲染函数
    this.r = h(SqlElement, {
      model: props.model,
      graphModel: props.graphModel,
      disabled: props.graphModel.editConfigModel.isSilentMode,
      isSelected: props.model.isSelected,
      isHovered: props.model.isHovered,
      properties: props.model.getProperties(),
      text: props.model.inputData,
      // 定义按钮点击事件处理函数，更新文本内容
      onBtnClick: (i: any) => {
        this.r.component.props.text = String(
          Number(this.r.component.props.text) + Number(i)
        );
      }
    });
    // 创建 Vue 应用实例，并指定渲染函数
    this.app = createApp({
      render: () => this.r
    });
  }

  /**
   * 将 HTML 内容设置到指定的根元素上
   * @param rootEl 根元素
   */
  setHtml(rootEl: any) {
    if (!this.isMounted) {
      this.isMounted = true;
      const node = document.createElement('div');
      rootEl.appendChild(node);
      this.app.mount(node);
    } else {
      this.r.component.props.properties = this.props.model.getProperties();
    }
  }

  /**
   * 获取节点文本内容
   * 对于 SQL 元素，返回 null，因为其内容由特定组件渲染
   * @returns {null}
   */
  getText() {
    return null;
  }
}

/**
 * 定义一个 SQL 元素的 HTML 模型类，继承自 HtmlNodeModel
 * 该类主要设置节点的属性和样式
 */
class SqlElementHtmlModel extends HtmlNodeModel {
  /**
   * 设置节点属性
   * 包括宽度、高度、文本编辑属性等
   */
  setAttributes() {
    this.width = 300;
    this.height = 160;
    this.text.editable = false;
    // this.inputData = this.text.value;
  }

  // 定义节点只有左右两个锚点. 锚点位置通过中心点和宽度算出来。
  getDefaultAnchor() {
    const { width, x, y, id } = this;
    return [
      {
        x: x - width / 2,
        y,
        name: 'left',
        id: `${id}_0`
      },
      {
        x: x + width / 2,
        y,
        name: 'right',
        id: `${id}_1`
      }
    ];
  }

  /**
   * 获取节点轮廓样式
   * 覆盖父类方法，设置 stroke 属性为 none，以适应特定的视觉效果
   * @returns {object} 节点轮廓样式
   */
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    style.hover!.stroke = 'none';
    return style;
  }
}

// 导出默认对象，定义 SQL 元素的类型、模型和视图
export default {
  type: 'lxbpmn:HandleHttpResponse',
  model: SqlElementHtmlModel,
  view: SqlElementHtmlNode
};
