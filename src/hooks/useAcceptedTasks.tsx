import { Task } from '../Task';

const useAcceptedTasks = (walletAddr: any) => {
  return [
    new Task(
      'Integrate my app with polygon',
      1000000,
      walletAddr,
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    ),
    new Task(
      'Mint 400 NFTs',
      2000000,
      walletAddr,
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    ),
    new Task(
      'Win 10 races on my zed run account',
      3000000,
      walletAddr,
      '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    ),
    // new Task(
    //   'Integrate my app with polygon',
    //   1,
    //   walletAddr,
    //   '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
    // ),
    // new Task(
    //   'Mint 400 NFTs',
    //   2,
    //   walletAddr,
    //   '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
    // ),
    // new Task(
    //   'Win 10 races on my zed run account',
    //   3,
    //   walletAddr,
    //   '0x976ea74026e726554db657fa54763abd0c3a0aa9',
    // ),
  ];
};

export default useAcceptedTasks;
