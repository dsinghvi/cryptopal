import React from "react";
import { Freelancer } from "./generated/abis";
import { Task, TaskVote } from "./App";
import { TaskList } from "./TaskList";
import { Button } from "@blueprintjs/core";
import { useState } from "react";
import { ActiveTasks } from "./tasks/ActiveTasks";
import { ProposedTasks } from "./tasks/ProposedTasks";
import { AcceptedTasks } from "./tasks/AcceptedTasks";

interface ClientProps {
    walletAddress: string;
    smartContract: Freelancer;
    proposedTasks: Array<Task>;
    acceptedTasks: Array<Task>;
}

export function Client(props: ClientProps) {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeContracts, setActiveContract] = useState(new Array<Task>());

    if (!loaded && !loading) {
        setLoading(true);
        console.log("Loading contracts from the chain. " + props.walletAddress)
        props.smartContract.getTaskForClient(props.walletAddress)
        .then(taskId => 
            props.smartContract
                .getTask(taskId)
                .then(task => {
                    setActiveContract([new Task(task.description, Number(task.value), task.client.addr, task.freelancer.addr, task.client.vote, task.freelancer.vote, taskId)]);
                    setLoaded(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                }))
        .catch(error => {
            console.log(error);
        })
    }

    return (<div>
        <ProposedTasks proposedTasks={props.proposedTasks} />
        <AcceptedTasks acceptedTasks={props.acceptedTasks} smartContract={props.smartContract} />
        <ActiveTasks smartContract={props.smartContract} isCLientView={true} activeTasks={activeContracts} />
    </div>)
}