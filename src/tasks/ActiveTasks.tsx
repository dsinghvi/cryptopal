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
                        if (props.isCLientView) {
                            return (
                            <tr>
                                <td>{activeTask.taskDescription}</td>
                                <td>{activeTask.taskPrice}</td>
                                <td>{activeTask.contractorWallet}</td>
                                <td>{props.isCLientView ? TaskVote[activeTask.contractorVote] : TaskVote[activeTask.clientVote]}</td>
                                <td>
                                    <Button intent={Intent.SUCCESS} onClick={() => {
                                        if (props.isCLientView) {
                                            props.smartContract.clientVote(activeTask.taskId, TaskVote.Approved)
                                        } else {
                                            props.smartContract.clientVote(activeTask.taskId, TaskVote.Approved)
                                        }
                                    }}>
                                        Approve!
                                    </Button> 
                                    <Button intent={Intent.DANGER} onClick={() => {
                                        if (props.isCLientView) {
                                            props.smartContract.clientVote(activeTask.taskId, TaskVote.Approved)
                                        } else {
                                            props.smartContract.clientVote(activeTask.taskId, TaskVote.Approved)
                                        }
                                    }}>
                                        Deny!
                                    </Button> 
                                </td>
                            </tr>
                            );
                        }
                    }
                    )}
                </tbody>
                <tfoot>
                </tfoot>
            </HTMLTable>
        </div>);
}