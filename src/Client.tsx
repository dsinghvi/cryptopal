import React from "react";
import { Freelancer } from "./generated/abis";
import { Task, TaskVote } from "./App";
import { TaskList } from "./TaskList";
import { Button } from "@blueprintjs/core";
import { useState } from "react";
import { ActiveTasks } from "./tasks/ActiveTasks";
import { ProposedTasks } from "./tasks/ProposedTasks";
import { AcceptedTasks } from "./tasks/AcceptedTasks";
import { BigNumber } from "ethers";

interface ClientProps {
    walletAddress: string;
    smartContract: Freelancer;
    proposedTasks: Array<Task>;
    acceptedTasks: Array<Task>;
    removeProposedTask: (taskId: BigNumber) => void;
}

export function Client(props: ClientProps) {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeContracts, setActiveContract] = useState(new Array<Task>());

    if (!loaded && !loading) {
        setLoading(true);
        console.log("Loading contracts from the chain. " + props.walletAddress)
        props.smartContract.getTaskForClient(props.walletAddress)
        .then(taskIds => {
            console.log("taskIds for the client " + taskIds.length)
            taskIds.forEach(taskId => {
                props.smartContract
                .getTask(taskId)
                .then(task => {
                    setActiveContract(prevActiveContracts => {
                        return [
                            new Task(
                                task.description,
                                Number(task.value),
                                task.client.addr,
                                task.freelancer.addr,
                                task.client.vote,
                                task.freelancer.vote, 
                                taskId), 
                            ...prevActiveContracts]    
                    });
                    setLoaded(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    console.log(activeContracts)
    console.log(activeContracts)

    return (<div>
        <ProposedTasks proposedTasks={props.proposedTasks} />
        <AcceptedTasks 
            acceptedTasks={props.acceptedTasks}
            smartContract={props.smartContract}
            removeProposedTask={props.removeProposedTask}/>
        <ActiveTasks 
            isCLientView={true} 
            smartContract={props.smartContract} 
            activeTasks={activeContracts} />
    </div>)
}