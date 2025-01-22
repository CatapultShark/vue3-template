import { PolylineEdge, PolylineEdgeModel, LogicFlow } from '@logicflow/core';

class BaseNodeLineModel extends PolylineEdgeModel {
  // 设置边样式
  getEdgeStyle() {
    console.log('1');
    const style = super.getEdgeStyle();
    style.stroke = 'orange';
    return style;
  }

  // 设置 hover 轮廓样式
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'blue';
    return style;
  }
}

export default {
  type: 'base-node-line',
  view: PolylineEdge,
  model: BaseNodeLineModel
};
