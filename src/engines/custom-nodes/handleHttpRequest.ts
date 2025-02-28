import { TaskNode } from '@logicflow/engine';
import { ElMessage } from 'element-plus';

class HandleHttpRequestTask extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
  }): Promise<any> {
    console.log('params-HandleHttpRequestTask', params);
    const { attributeList } = this.properties!;
    console.log(this.properties, 'this.properties-HandleHttpRequestTask');
    // const path: string = ((attributeList || []) as any).find(
    //   (item: any) => item.property === 'Allowed Paths'
    // )?.value;
    // this.globalData.request = {
    //   attributeList
    // };
    console.log('this.globalData-HandleHttpRequestTask', this.globalData);
    ElMessage.info('HandleHttpRequestTask');
    return {
      status: 'success'
    };
  }
}

export default HandleHttpRequestTask;
