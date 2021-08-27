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
    this.taskId = (taskId !== undefined) ? taskId : BigNumber.from(getRandomInt(1, 1000000));;
  }

  taskId: BigNumber;
  taskPrice: number;
  taskDescription: string;
  clientWallet: string;
  contractorWallet?: string; 

  clientVote: TaskVote;
  contractorVote: TaskVote;

}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function App() {
  const [provider] = useState(new ethers.providers.Web3Provider(window.ethereum));
  const [freelancerSmartContract] = useState(Freelancer__factory.connect(CONTRACT_ADDR, provider.getSigner(0)));
  const [walletAddr, setWalletAddr] = useState("");
  const [proposedTasks, setProposedTasks] = useState([
    new Task("Build your first dApp", 1, walletAddr, "0xbda5747bfd65f08deb54cb465eb87d40e51b197e"),
    new Task("Build your second dApp", 2, walletAddr, "0xbda5747bfd65f08deb54cb465eb87d40e51b197e"),
    new Task("Build your third dApp", 3, walletAddr, "0xbda5747bfd65f08deb54cb465eb87d40e51b197e")
  ])
  const [acceptedTasks, setAcceptedTasks] = useState([
    new Task("Integrate my app with polygon", 1, walletAddr, "0xbda5747bfd65f08deb54cb465eb87d40e51b197e"),
    new Task("Mint 400 NFTs", 2, walletAddr, "0xbda5747bfd65f08deb54cb465eb87d40e51b197e"),
    new Task("Win 10 races on my zed run account", 3, walletAddr, "0xbda5747bfd65f08deb54cb465eb87d40e51b197e")
  ])

  if (walletAddr === "") {
    return <ConnectWallet setWalletAddress={walletAddress => {
      console.log(walletAddress)
      setWalletAddr(walletAddress);
      return;
    }}/>
  } else {
    return (
      <Client
      removeAcceptedTask={taskId => removeAcceptedTask(taskId, setAcceptedTasks)}
        walletAddress={walletAddr} 
        smartContract={freelancerSmartContract}
        proposedTasks={proposedTasks}
        acceptedTasks={acceptedTasks} />
      )
  }
}

function removeAcceptedTask(taskId: BigNumber, setAcceptedTasks: React.Dispatch<React.SetStateAction<Task[]>>) {
  console.log("removeAcceptedTask called with " + taskId)
  setAcceptedTasks(prevAcceptedTasks => {
    const filteredTasks = prevAcceptedTasks.filter(task => !task.taskId.eq(taskId));
    return [...filteredTasks]
  })
}

export default App;
