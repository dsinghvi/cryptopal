//@ts-ignore
import { BigNumber } from 'ethers';

export enum TaskVote {
  Approved,
  Declined,
  Undecided,
}

export class Task {
  constructor(
    taskDescription: string,
    taskPriceInGwei: number,
    clientWallet: string,
    contractorWallet?: string,
    clientVote?: TaskVote,
    contractorVote?: TaskVote,
    taskId?: BigNumber,
  ) {
    this.taskPriceInGwei = taskPriceInGwei;
    this.taskDescription = taskDescription;
    this.clientWallet = clientWallet;
    this.contractorWallet = contractorWallet;
    this.clientVote =
      clientVote !== undefined ? clientVote : TaskVote.Undecided;
    this.contractorVote =
      contractorVote !== undefined
        ? contractorVote
        : TaskVote.Undecided;
    this.taskId =
      taskId !== undefined
        ? taskId
        : BigNumber.from(getRandomInt(1, 1000000));
  }

  taskId: BigNumber;
  taskPriceInGwei: number;
  taskDescription: string;
  clientWallet: string;
  contractorWallet?: string;

  clientVote: TaskVote;
  contractorVote: TaskVote;

  getPricingText() {
    const eth = 0.000000001 * this.taskPriceInGwei;
    const usd = eth * 3000;
    return eth + " eth (" + usd + " usd)";
  }
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
