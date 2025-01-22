import { TaskNode } from '@logicflow/engine';

class Gateway extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    console.log(this.properties, 'this.properties');
    const { variable } = this.properties!;
    // const value = window.prompt(`请输入${variable}的值`);
    const username = window.prompt(`请输入username的值`);
    const password = window.prompt(`请输入password的值`);
    // console.log(value, '11');

    console.log('this.globalData', this.globalData);
    // this.globalData[variable as string] = value;

    this.globalData.userInfo = {
      username,
      password
    };
    return {
      status: 'success'
    };
  }
}

export default Gateway;
