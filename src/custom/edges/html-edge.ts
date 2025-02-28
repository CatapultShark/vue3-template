import { LineEdgeModel, LineEdge } from '@logicflow/core';
import { createApp, h } from 'vue';
import HtmlEdge from '../components/html-edge.vue';

const DEFAULT_WIDTH = 48;
const DEFAULT_HEIGHT = 32;

class HtmlEdgeModel extends LineEdgeModel {
  getEdgeStyle() {
    console.log('999999999');
    const edgeStyle = super.getEdgeStyle();
    edgeStyle.strokeDasharray = '4 4';
    edgeStyle.stroke = '#DDDFE3';
    return edgeStyle;
  }
}

class HtmlEdgeView extends LineEdge {
  getEdge(): any {
    console.log('0000');
    const { model } = this.props;
    console.log('model', model);
    const { customWidth = DEFAULT_WIDTH, customHeight = DEFAULT_HEIGHT } =
      model.getProperties();
    const id = model.id;
    console.log('id', id);
    const edgeStyle = model.getEdgeStyle();
    const { startPoint, endPoint, arrowConfig } = model;
    const lineData = {
      x1: startPoint.x,
      y1: startPoint.y,
      x2: endPoint.x,
      y2: endPoint.y
    };
    const positionData = {
      x: (startPoint.x + endPoint.x - customWidth) / 2,
      y: (startPoint.y + endPoint.y - customHeight) / 2,
      width: customWidth,
      height: customHeight
    };
    const wrapperStyle = {
      width: customWidth,
      height: customHeight
    };
    // 创建一个临时的 div 元素
    const tempDiv = document.createElement('div');
    tempDiv.id = id;
    tempDiv.style.width = `${customWidth}px`;
    tempDiv.style.height = `${customHeight}px`;
    // 创建 Vue 应用并挂载到临时 div 上
    const app = createApp({
      render() {
        return h(HtmlEdge);
      }
    });
    console.log('app', app, tempDiv);
    app.mount(tempDiv);
    console.log('00001');
    return h('g', {}, [
      h('line', { ...lineData, ...edgeStyle, ...arrowConfig }),
      h('foreignObject', { ...positionData }, [
        h('div', {
          id,
          style: wrapperStyle
        })
      ])
    ]);
  }
}

export default {
  type: 'html-edge',
  view: HtmlEdgeView,
  model: HtmlEdgeModel
};
