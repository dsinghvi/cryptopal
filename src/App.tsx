import React from 'react';
import './App.css';
import { Freelancer__factory } from "./generated/abis";
import { CONTRACT_ADDR } from "./ContractAddress"
import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { Client } from "./Client";
import { ConnectWallet } from './ConnectWallet';

declare global {
  interface Window {
      ethereum: any;
  }
}

export enum TaskVote {
  Approved, 
  Declined, 
  Undecided
}

export class Task {

  constructor(
    taskDescription: string, 
    taskPrice: number, 
    clientWallet: string, 
    contractorWallet ?: string,
    clientVote ?: TaskVote, 
    contractorVote ?: TaskVote, 
    taskId ?: BigNumber) {
    this.taskPrice = taskPrice;
    this.taskDescription = taskDescription;
    this.clientWallet = clientWallet;
    this.contractorWallet = contractorWallet;
    this.clientVote = (clientVote !== undefined) ? clientVote : TaskVote.Undecided;
    this.contractorVote = (contractorVote !== undefined) ? contractorVote : TaskVote.Undecided;
    this.taskId = taskId;
  }

  taskId?: BigNumber;
  taskPrice: number;
  taskDescription: string;
  clientWallet: string;
  contractorWallet?: string; 

  clientVote: TaskVote;
  contractorVote: TaskVote;

}

function App() {
  const [provider] = useState(new ethers.providers.Web3Provider(window.ethereum));
  const [freelancerSmartContract] = useState(Freelancer__factory.connect(CONTRACT_ADDR, provider.getSigner(0)));
  const [walletAddr, setWalletAddr] = useState("");
  const [proposedTasks, setProposedTasks] = useState([
    new Task("Build your first dApp", 1, walletAddr, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"),
    new Task("Build your second dApp", 2, walletAddr, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"),
    new Task("Build your third dApp", 3, walletAddr, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  ])
  const [acceptedTasks, setAcceptedTasks] = useState([
    new Task("Integrate my app with polygon", 1, walletAddr, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"),
    new Task("Mint 400 NFTs", 2, walletAddr, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"),
    new Task("Win 10 races on my zed run account", 3, walletAddr, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  ])

  if (walletAddr === "") {
    return <ConnectWallet setWalletAddress={walletAddress => setWalletAddr(walletAddress)}/>
  } else {
    return <Client walletAddress={walletAddr} smartContract={freelancerSmartContract} proposedTasks={proposedTasks} acceptedTasks={acceptedTasks}></Client>
  }
}

export default App;
