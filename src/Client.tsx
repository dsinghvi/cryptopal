import React from "react";
import { Freelancer } from "./generated/abis";
import { Task } from "./App";
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


const styles = {
    container: {
        margin: '40px'
    }
}
export function Client(props: ClientProps) {
    const { smartContract, walletAddress} = props;
    const [tasks, setTasks] = useState(new Array<Task>());

    React.useEffect(() => {
        const fetchTasks = async () => {
            if(tasks.length <= 0) {
                const taskIds = await smartContract.getTaskForClient(walletAddress);
                const tasks = await Promise.all(taskIds.map(async (taskId) => {
                    const task =  await smartContract.getTask(taskId);
                    return new Task(task.description, Number(task.value), task.client.addr, task.freelancer.addr, task.client.vote, task.freelancer.vote, taskId)
                }))
                setTasks(tasks);
            }
        }
        fetchTasks();
    }, [tasks])

    return (<div style={styles.container}>
        <ProposedTasks proposedTasks={props.proposedTasks} />
        <AcceptedTasks acceptedTasks={props.acceptedTasks} smartContract={props.smartContract} />
        <ActiveTasks smartContract={props.smartContract} isCLientView={true} activeTasks={tasks} />
    </div>)
}