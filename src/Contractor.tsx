import React from "react";
import { Freelancer } from "./generated/abis";
import { Task } from "./App";
import { TaskList } from "./TaskList";
import { Button } from "@blueprintjs/core";
import { useState } from "react";

interface ContractorProps {
    walletAddress: string;
    smartContract: Freelancer;
    proposedTasks: Array<Task>;
    acceptedTasks: Array<Task>;
}

export function Contractor(props: ContractorProps) {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeContracts, setActiveContract] = useState(new Array<Task>());

    if (!loaded && !loading) {
        setLoading(true);
        console.log("Loading contracts from the chain. " + props.walletAddress)
        props.smartContract.clientToContractId(props.walletAddress)
        .then(taskId => props.smartContract.contracts(taskId))
        .then(contract => {
            setActiveContract([new Task(contract.description, contract.client.addr, contract.freelancer.addr)]);
            setLoaded(true);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return <div>
        <Button onClick={() => 
            props.smartContract.fundWork("taskDescription", 30, "0x70997970c51812dc3a010c7d01b50e0d17dc79c8", { value: 30})
            .catch(error => console.log(error))}>    
        </Button>
        <TaskList tasks={props.proposedTasks} title="Proposed Tasks"></TaskList>
        <TaskList tasks={props.acceptedTasks} title="Accepted Tasks"></TaskList>
        <TaskList tasks={activeContracts} title="Active Tasks"></TaskList>
        <TaskList tasks={[]} title="Finished Tasks"></TaskList>
    </div>
}

/**
 * "Error: [ethjs-query] while formatting outputs from RPC 
 * '{"value":{"code":-32603,"data":{"code":-32602,"message":"Invalid transaction"}}}'"
 */