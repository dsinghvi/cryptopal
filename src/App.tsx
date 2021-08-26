import React from 'react';
import './App.css';
import { Freelancer__factory } from "./generated/abis";
import { CONTRACT_ADDR } from "./ContractAddress"
import { useState } from "react";
import { ethers } from "ethers";
import { Contractor } from "./Contractor";
import { ConnectWallet } from './ConnectWallet';

declare global {
  interface Window {
      ethereum: any;
  }
}

export class Task {

  constructor(taskDescription: string, clientWallet: string, contractorWallet ?: string) {
    this.taskId = "";
    this.taskDescription = taskDescription;
    this.clientWallet = clientWallet;
    this.contractorWallet = contractorWallet;
  }

  taskId: string;
  taskDescription: string;
  clientWallet: string;
  contractorWallet?: string; 
}

function App() {
  const [provider] = useState(new ethers.providers.Web3Provider(window.ethereum));
  const [freelancerSmartContract] = useState(Freelancer__factory.connect(CONTRACT_ADDR, provider.getSigner(0)));
  const [proposedTasks, setProposedTasks] = useState([ new Task("bla", "bla"), new Task("bla", "bla"), new Task("bla", "bla")])
  const [acceptedTasks, setAcceptedTasks] = useState([ new Task("bla", "bla", "bla"), new Task("bla", "bla", "bla"), new Task("bla", "bla", "bla")])
  const [walletAddr, setWalletAddr] = useState("");

  return (
    <div>
      <ConnectWallet setWalletAddress={walletAddress => setWalletAddr(walletAddress)}/>
      <Contractor smartContract={freelancerSmartContract} proposedTasks={proposedTasks} acceptedTasks={acceptedTasks}></Contractor>
    </div>
  );
}

export default App;
