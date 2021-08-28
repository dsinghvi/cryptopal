import { Task } from '../Task';

const useProposedTasks = (walletAddr: any) => {
  return [
    new Task(
      'Integrate my app with polygon',
      1,
      walletAddr,
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    ),
    new Task(
      'Mint 400 NFTs and store them in wallet',
      2,
      walletAddr,
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    ),
    new Task(
      'Win 10 races on my zed run account',
      3,
      walletAddr,
      '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    ),
    // new Task(
    //   'Build your first dApp',
    //   1,
    //   walletAddr,
    //   '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
    // ),
    // new Task(
    //   'Build your second dApp',
    //   2,
    //   walletAddr,
    //   '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
    // ),
    // new Task(
    //   'Build your third dApp',
    //   3,
    //   walletAddr,
    //   '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
    // ),
  ];
};

export default useProposedTasks;
