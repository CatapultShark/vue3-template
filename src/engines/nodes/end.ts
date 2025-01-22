import { TaskNode } from '@logicflow/engine';
import { ElMessage } from 'element-plus';

class End extends TaskNode {
  async action(params: {
    executionId: string;
    actionId: string;
    nodeId: string;
    data?: Record<string, any>;
  }): Promise<any> {
    // window.alert('执行结束')
    ElMessage.info('执行结束');
  }
}

export default End;
