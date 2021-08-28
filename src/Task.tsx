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
    taskPriceInWei: BigNumber,
    clientWallet: string,
    contractorWallet?: string,
    clientVote?: TaskVote,
    contractorVote?: TaskVote,
    taskId?: BigNumber,
  ) {
    this.taskPriceInWei = taskPriceInWei;
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
        : BigNumber.from(getRandomInt(1, 1000));
  }

  taskId: BigNumber;
  taskPriceInWei: BigNumber;
  taskDescription: string;
  clientWallet: string;
  contractorWallet?: string;

  clientVote: TaskVote;
  contractorVote: TaskVote;

  getPricingText() {
    let exp = BigNumber.from("10").pow(18);
    const eth = this.taskPriceInWei.div(exp);
    const usd = eth.mul(3000)
    return eth + " eth (" + usd + " usd)";
  }
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
