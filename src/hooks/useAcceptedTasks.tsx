import { BigNumber } from 'ethers';
import { Task } from '../Task';
import { getWeiFromEth } from './useProposedTasks';

const useAcceptedTasks = (walletAddr: any) => {
  return [
    new Task(
      'Integrate my app with polygon',
      getWeiFromEth(1),
      walletAddr,
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    ),
    new Task(
      'Mint 400 NFTs',
      getWeiFromEth(2),
      walletAddr,
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    ),
    new Task(
      'Win 10 races on my zed run account',
      getWeiFromEth(3),
      walletAddr,
      '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    )
  ];
};

export default useAcceptedTasks;
