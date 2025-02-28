import { TaskNode } from '@logicflow/engine';
import { ElMessage } from 'element-plus';

class JoltTransformJsonTask extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    const { attributeList } = this.properties!;
    console.log(this.properties, 'this.properties-JoltTransformJsonTask');

    console.log('this.globalData-JoltTransformJsonTask', this.globalData);
    this.globalData.joltTransform = {
      attributeList
    };
    console.log(JSON.stringify(this.properties));
    ElMessage.info('JoltTransformJsonTask');

    return {
      status: 'success'
    };
  }
}

export default JoltTransformJsonTask;
