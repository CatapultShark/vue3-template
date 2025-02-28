import { TaskNode } from '@logicflow/engine';
import { ElMessage } from 'element-plus';

// import { handleTest } from '@/services/index';

class End extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    console.log(this.globalData, 'this.globalData-end');

    // const { query } = this.globalData as any;

    // window.alert('执行结束')
    ElMessage.info('执行结束');
  }
}

export default End;
