import React from "react";
import { ethers } from "ethers";
import { Freelancer, Freelancer__factory } from "./generated/abis";
import { CONTRACT_ADDR } from "./ContractAddress"
import { useState } from "react-dom/node_modules/@types/react";
import { Task } from "./App";
import { TaskList } from "./TaskList";

interface ContractorProps {
    walletAddress: string;
    smartContract: Freelancer;
    proposedTasks: Array<Task>;
    acceptedTasks: Array<Task>;
}

export class Contractor extends React.Component<ContractorProps, {}> {

    render() {
        console.log(this.props.smartContract?.clientToContractId(this.props.walletAddress));
        return <div>
            <TaskList tasks={this.props.proposedTasks} title="Proposed Tasks"></TaskList>
            <TaskList tasks={this.props.acceptedTasks} title="Accepted Tasks"></TaskList>
            <TaskList tasks={[]} title="Active Tasks"></TaskList>
            <TaskList tasks={[]} title="Finished Tasks"></TaskList>
        </div>
    }

}