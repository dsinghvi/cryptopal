import React from "react";
import { ethers } from "ethers";
import { Freelancer, Freelancer__factory } from "./generated/abis";
import { CONTRACT_ADDR } from "./ContractAddress"
import { useState } from "react-dom/node_modules/@types/react";
import { Task } from "./App";
import { TaskList } from "./TaskList";
import { Button } from "@blueprintjs/core";

interface ContractorProps {
    walletAddress: string;
    smartContract: Freelancer;
    proposedTasks: Array<Task>;
    acceptedTasks: Array<Task>;
}

export class Contractor extends React.Component<ContractorProps, {}> {

    render() {
        // console.log(this.props.smartContract?.clientToContractId(this.props.walletAddress));
        return <div>
            <Button onClick={() => 
                this.props.smartContract.fundWork("taskDescription", 30, "0x70997970c51812dc3a010c7d01b50e0d17dc79c8", { value: 30})
                .catch(error => console.log(error))}>    
            </Button>
            <TaskList tasks={this.props.proposedTasks} title="Proposed Tasks"></TaskList>
            <TaskList tasks={this.props.acceptedTasks} title="Accepted Tasks"></TaskList>
            <TaskList tasks={[]} title="Active Tasks"></TaskList>
            <TaskList tasks={[]} title="Finished Tasks"></TaskList>
        </div>
    }

}

/**
 * "Error: [ethjs-query] while formatting outputs from RPC 
 * '{"value":{"code":-32603,"data":{"code":-32602,"message":"Invalid transaction"}}}'"
 */