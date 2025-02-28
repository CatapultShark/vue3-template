import { TaskNode } from '@logicflow/engine';

class ParallelGateway extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    console.log(this.properties, 'this.properties');
    // const { variable } = this.properties!;
    // const value = window.prompt(`请输入${variable}的值`);
    // console.log(value, '并行网关');

    console.log('this.globalData', this.globalData);
    // this.globalData[variable as string] = value;
    // const userName = window.prompt('请输入用户的名字');
    // const userAge = window.prompt('请输入用户的年龄');
    // const userRole = window.prompt('请输入用户的角色');

    // this.globalData.user = {
    //   name: userName,
    //   age: userAge,
    //   role: userRole
    // }; // 设置对象

    const type = window.prompt('请输入类型');
    this.globalData.query = {
      type
    }; // 设置对象
    return {
      status: 'success'
    };
  }
}

export default ParallelGateway;
