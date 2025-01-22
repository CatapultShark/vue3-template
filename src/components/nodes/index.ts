import LogicFlow from '@logicflow/core';
import TriggerNode from './TriggerNode';
import ActionNode from './ActionNode';
import AddStepNode from './AddStepNode';

export const registerNodes = (lfInstance: LogicFlow) => {
  [TriggerNode, ActionNode, AddStepNode].forEach((node) => {
    lfInstance.register(node);
  });
};
