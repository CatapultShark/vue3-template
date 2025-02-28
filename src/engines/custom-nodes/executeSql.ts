import { TaskNode } from '@logicflow/engine';
import { ElMessage } from 'element-plus';

import { executeSql } from '@/services/index';

class ExecuteSQLTask extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    const { attributeList } = this.properties!;
    console.log(this.properties, 'this.properties-ExecuteSQLTask');

    console.log('this.globalData-ExecuteSQL', this.globalData);

    // this.globalData.sql = {
    //   attributeList
    // };

    ElMessage.info('ExecuteSQLTask执行结束');
    return {
      status: 'success'
    };
  }
}

export default ExecuteSQLTask;
