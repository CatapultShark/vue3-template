import { TaskNode } from '@logicflow/engine';
import { ElMessage } from 'element-plus';

class ConvertAvroToJsonTask extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    const { attributeList } = this.properties!;
    console.log(this.properties, 'this.properties-ConvertAvroToJsonTask');

    console.log('this.globalData-ConvertAvroToJsonTask', this.globalData);

    this.globalData.json = {
      attributeList
    };

    ElMessage.info('ConvertAvroToJsonTask执行结束');

    return {
      status: 'success'
    };
  }
}

export default ConvertAvroToJsonTask;
