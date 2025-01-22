import { RectNode, RectNodeModel, h } from '@logicflow/core';

class ActionNodeView extends RectNode {
  getShape() {
    const { x, y, width, height } = this.props.model;
    return h('g', {}, [
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        fill: '#F0F9FF',
        stroke: '#4FC3F7',
        rx: 6,
        ry: 6
      }),
      h(
        'text',
        { x, y: y - 5, textAnchor: 'middle', fontSize: 14, fill: '#333' },
        '2. 请选执行应用'
      )
    ]);
  }
}

class ActionNodeModel extends RectNodeModel {
  setAttributes() {
    this.width = 200;
    this.height = 60;
  }
}

export default {
  type: 'action-node',
  view: ActionNodeView,
  model: ActionNodeModel
};
