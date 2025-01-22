import { RectNode, RectNodeModel, h } from '@logicflow/core';

// 自定义触发器节点的视图
class AddStepNodeView extends RectNode {
  /**
   * 定义添加步骤节点的外观。
   * 为什么这样做：
   * 1. 使用虚线边框和提示文字，引导用户操作。
   * 2. 设计为显眼的占位符样式，提示用户“可添加新步骤”。
   * 意义：
   * 提高交互体验，指引用户完成操作。
   */
  getShape() {
    const { x, y, width, height } = this.props.model;
    return h('g', {}, [
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        fill: 'none',
        stroke: '#999',
        strokeDasharray: '4 2',
        rx: 6,
        ry: 6
      }),
      h(
        'text',
        { x, y, textAnchor: 'middle', fontSize: 12, fill: '#666' },
        '+ 添加新步骤'
      )
    ]);
  }
}

// 自定义添加步骤节点的数据模型
class AddStepNodeModel extends RectNodeModel {
  /**
   * 设置节点的默认宽高。
   * 为什么这样做：
   * 1. 让占位符节点的尺寸较小且固定，显得简洁。
   * 意义：
   * 保证占位符节点具有一致性，便于用户识别。
   */
  setAttributes() {
    this.width = 150;
    this.height = 40;
  }
}

// 导出自定义节点的类型、视图和模型
export default {
  type: 'add-step-node',
  view: AddStepNodeView,
  model: AddStepNodeModel
};
