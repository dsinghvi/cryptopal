import { Button, HTMLTable, Intent } from "@blueprintjs/core";
import { Task, TaskVote } from "../App";
import { Freelancer } from "../generated/abis";


interface ActiveTaskProps {
    isCLientView: boolean;
    activeTasks: Array<Task>;
    smartContract: Freelancer;
}

export function ActiveTasks(props: ActiveTaskProps) {
    return (
        <div>
            <h4>Active Tasks</h4>
            <HTMLTable bordered={true} interactive={true} striped={true}>
                <thead>
                    <tr>
                    <th>Task Description</th>
                    <th>Task Price</th>
                    <th>Contractor Wallet</th>
                    <th>{props.isCLientView ? "Contractor Vote" : "Client Vote"}</th>
                    <th>Your vote</th>
                    </tr>
                </thead>
                <tbody>
                    {props.activeTasks.map(activeTask => {
                        return (
                            <tr>
                                <td>{activeTask.taskDescription}</td>
                                <td>{activeTask.taskPrice}</td>
                                <td>{activeTask.contractorWallet}</td>
                                <td>{props.isCLientView ? TaskVote[activeTask.contractorVote] : TaskVote[activeTask.clientVote]}</td>
                                { renderVoteCell(props, activeTask) }
                            </tr>
                         );
                    }
                    )}
                </tbody>
                <tfoot>
                </tfoot>
            </HTMLTable>
        </div>);
}

function renderVoteCell(props: ActiveTaskProps, task: Task) {
    const voted = hasVoted(props.isCLientView, task);
    if (voted) {
        return (
            <td>
                {props.isCLientView ? TaskVote[task.clientVote] : TaskVote[task.contractorVote]}
            </td>
        );
    } else {
        return (
            <td>
                <Button 
                    intent={Intent.SUCCESS} 
                    onClick={() => castApproval(props.isCLientView, props.smartContract, task)}>
                    Approve!
                </Button> 
                <Button
                    intent={Intent.DANGER} 
                    onClick={() => castDeclined(props.isCLientView, props.smartContract, task)}>
                    Deny!
                </Button> 
            </td>
        );
    }
}

function castApproval(isClientView: boolean, smartContract: Freelancer, task: Task) {
    if (isClientView) {
        smartContract
            .clientVote(task.taskId, TaskVote.Approved)
            .catch(err => console.log(err))
    } else {
        smartContract
            .clientVote(task.taskId, TaskVote.Approved)
            .catch(err => console.log(err))
    }
}

function castDeclined(isClientView: boolean, smartContract: Freelancer, task: Task) {
    if (isClientView) {
        smartContract
            .clientVote(task.taskId, TaskVote.Declined)
            .catch(err => console.log(err))
    } else {
        smartContract
            .clientVote(task.taskId, TaskVote.Declined)
            .catch(err => console.log(err))
    }
}

function hasVoted(isClientView: boolean, task: Task) {
    if (isClientView) {
        return task.clientVote !== TaskVote.Undecided;
    } else {
        return task.contractorVote !== TaskVote.Undecided;
    }
}