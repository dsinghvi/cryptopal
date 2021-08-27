import React from "react";
import { Freelancer } from "./generated/abis";
import { Task } from "./App";
import { useState } from "react";
import { ActiveTasks } from "./tasks/ActiveTasks";
import { ProposedTasks } from "./tasks/ProposedTasks";
import { AcceptedTasks } from "./tasks/AcceptedTasks";

interface ContractorProps {
    walletAddress: string;
    smartContract: Freelancer;
    proposedTasks: Array<Task>;
}

const styles = {
    container: {
        margin: '40px'
    }
}

export function Contractor(props: ContractorProps) {
    const { smartContract, walletAddress} = props;
    const [tasks, setTasks] = useState(new Array<Task>());
    const [pollData, setPollData] = React.useState(false);
    const [pollDataInterval, setPollDataInterval] = React.useState<NodeJS.Timeout>();
  
    const fetchTasks = React.useCallback(async () => {
        const taskIds = await smartContract.getTaskForFreelancer(walletAddress);
        const tasks = await Promise.all(taskIds.map(async (taskId) => {
            const task =  await smartContract.getTask(taskId);
            return new Task(task.description, Number(task.value), task.client.addr, task.freelancer.addr, task.client.vote, task.freelancer.vote, taskId)
        }))
        setTasks(tasks);
    }, [walletAddress, smartContract])

    React.useEffect(() => {
        if (!pollData) {
          const pollDataInterval = setInterval(() => {
              fetchTasks();
          }, 1000);
          setPollData(true);
          setPollDataInterval(pollDataInterval);
        }
        return () => {
            //@ts-ignore
            clearInterval(pollDataInterval);
        }
    }, [pollData, pollDataInterval]);

    return (<div style={styles.container}>
        <ProposedTasks isClientView={false} proposedTasks={props.proposedTasks} />
        <ActiveTasks isCLientView={false} smartContract={props.smartContract}  activeTasks={tasks} />
    </div>)
}