import { TaskNode } from '@logicflow/engine';
import { ElMessage } from 'element-plus';

import { transform } from '@/services/index';

class HandleHttpResponseTask extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    const { attributeList } = this.properties!;
    console.log(this.properties, 'this.properties-HandleHttpResponseTask');

    console.log('this.globalData-HandleHttpRequestTask', this.globalData);

    // this.globalData.response = {
    //   attributeList
    // };

    await transform(this.globalData).then((res) => {
      console.log(res, 'res-HandleHttpResponseTask');
    });

    ElMessage.info('HandleHttpRequestTask');

    return {
      status: 'success'
    };
  }
}

export default HandleHttpResponseTask;
