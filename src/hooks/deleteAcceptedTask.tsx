import { BigNumber } from 'ethers';
import { Task } from '../Task';

const deleteAcceptedTask = (tasks: Array<Task>, taskId: BigNumber) => {
  return [
    ...tasks.filter(task => task.taskId !== taskId)
  ];
};

export default deleteAcceptedTask;
