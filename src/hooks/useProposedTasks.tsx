import { BigNumber } from 'ethers';
import { Task, TaskStatus } from '../Task';

const useProposedTasks = (walletAddr: any) => {
  return [
    new Task(
      'Clone fiverr and upwork',
      getWeiFromEth(31),
      walletAddr,
      TaskStatus.proposed,
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    ),
    new Task(
      'Swap out dynamo for ethereum',
      getWeiFromEth(22),
      walletAddr,
      TaskStatus.proposed,
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    ),
    new Task(
      'Build a pretty frontend',
      getWeiFromEth(10),
      walletAddr,
      TaskStatus.proposed,
      '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    ),
  ];
};

export function getWeiFromEth(eth: number) {
  let exp = BigNumber.from("10").pow(18);
  return BigNumber.from(eth).mul(exp)
}

export default useProposedTasks;
