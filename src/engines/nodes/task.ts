import { TaskNode } from '@logicflow/engine';
import { ElMessageBox } from 'element-plus';

import { handleTest } from '@/services/index';

class ManualTask extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    const { type } = this.properties!;
    console.log(this.properties, 'this.properties-ManualTask');

    console.log('this.globalData-task', this.globalData);

    const { query } = this.globalData as any;

    // if (query.type == 'all') {
    //   return {
    //     status: 'success'
    //   };
    // }

    await handleTest(query.type == 'all' ? type : query.type)
      .then((res) => {
        console.log(res, 'res-task', query.type);
        this.globalData.res = res.data;
        return {
          status: 'success'
        };
      })
      .catch((err) => {
        console.log(err, 'err');
        return {
          status: 'error'
        };
      });

    // return {
    //   status: 'success'
    // };
    // const value = window.confirm(`${flag}是否通过？`);
    // ElMessageBox.confirm(`${flag ? flag : '当前任务'}是否通过？`, '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // })
    //   .then(() => {
    //     console.log('执行');
    //     return {
    //       status: 'success'
    //     };
    //   })
    //   .catch(() => {
    //     return {
    //       status: 'error'
    //     };
    //   });
    // if (value) {
    //   return {
    //     status: 'success'
    //   };
    // } else {
    //   return {
    //     status: 'error'
    //   };
    // }
  }
}

export default ManualTask;
