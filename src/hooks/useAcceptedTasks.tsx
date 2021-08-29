import { BigNumber } from 'ethers';
import { Task, TaskStatus } from '../Task';
import { getWeiFromEth } from './useProposedTasks';

const useAcceptedTasks = (walletAddr: any) => {
  return [
    new Task(
      'Integrate my app with polygon',
      getWeiFromEth(10),
      walletAddr,
      TaskStatus.accepted,
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    ),
    new Task(
      'Mint 400 NFTs',
      getWeiFromEth(20),
      walletAddr,
      TaskStatus.accepted,
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    ),
    new Task(
      'Win 10 races on my zed run account',
      getWeiFromEth(30),
      walletAddr,
      TaskStatus.accepted,
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    )
  ];
};

export default useAcceptedTasks;
