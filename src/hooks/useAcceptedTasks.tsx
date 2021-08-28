import { Task } from '../Task';
import React, { useState } from 'react';

const useAcceptedTasks = (walletAddr: any) => {
  return [
    new Task(
      'Integrate my app with polygon',
      1,
      walletAddr,
      '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
    ),
    new Task(
      'Mint 400 NFTs',
      2,
      walletAddr,
      '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
    ),
    new Task(
      'Win 10 races on my zed run account',
      3,
      walletAddr,
      '0x976ea74026e726554db657fa54763abd0c3a0aa9',
    ),
  ];
};

export default useAcceptedTasks;
