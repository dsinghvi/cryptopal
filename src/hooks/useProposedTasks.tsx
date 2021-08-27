import { Task } from '../Task';

const useProposedTasks = (walletAddr: any) => {
  return [
    new Task(
      'Build your first dApp',
      1,
      walletAddr,
      '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
    ),
    new Task(
      'Build your second dApp',
      2,
      walletAddr,
      '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
    ),
    new Task(
      'Build your third dApp',
      3,
      walletAddr,
      '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
    ),
  ];
};

export default useProposedTasks;
