import { HtmlNode, HtmlNodeModel } from '@logicflow/core';
import { createApp, h } from 'vue';
import SqlElement from './sql-element.vue';

class SqlElementHtmlNode extends HtmlNode {
  isMounted: any;
  r: any;
  app: any;
  constructor(props: any) {
    super(props);
    this.isMounted = false;
    this.r = h(SqlElement, {
      model: props.model,
      graphModel: props.graphModel,
      disabled: props.graphModel.editConfigModel.isSilentMode,
      isSelected: props.model.isSelected,
      isHovered: props.model.isHovered,
      properties: props.model.getProperties(),
      text: props.model.inputData,
      onBtnClick: (i: any) => {
        this.r.component.props.text = String(
          Number(this.r.component.props.text) + Number(i)
        );
      }
    });
    this.app = createApp({
      render: () => this.r
    });
  }
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
  getText() {
    return null;
  }
}

class SqlElementHtmlModel extends HtmlNodeModel {
  setAttributes() {
    this.width = 300;
    this.height = 150;
    this.text.editable = false;
    this.inputData = this.text.value;
  }
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    style.hover!.stroke = 'none';
    return style;
  }
  // 锚点，返回空数组，表示不显示锚点
  // getDefaultAnchor() {
  //   return [];
  // }
  // getData() {
  //   const data = super.getData();
  //   data.text!.value = this.inputData;
  //   return data;
  // }
}

export default {
  type: 'sql-element',
  model: SqlElementHtmlModel,
  view: SqlElementHtmlNode
};
