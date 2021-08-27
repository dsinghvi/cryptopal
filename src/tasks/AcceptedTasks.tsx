import { Button, HTMLTable } from "@blueprintjs/core";
import { BigNumber } from "ethers";
import { Task } from "../App";
import { Freelancer } from "../generated/abis";


interface AcceptedTaskProps {
    acceptedTasks: Array<Task>;
    smartContract: Freelancer;
    removeProposedTask: (taskId: BigNumber) => void;
}

export function AcceptedTasks(props: AcceptedTaskProps) {
    return (
        <div>
            <h4>Accepted Tasks</h4>
            <HTMLTable bordered={true} interactive={true} striped={true}>
                <thead>
                    <tr>
                    <th>Task Description</th>
                    <th>Task Price</th>
                    <th>Contractor Wallet</th>
                    </tr>
                </thead>
                <tbody>
                    {props.acceptedTasks.map(acceptedTask => 
                        <tr>
                            <td>{acceptedTask.taskDescription}</td>
                            <td>{acceptedTask.taskPrice}</td>
                            <td>{acceptedTask.contractorWallet}</td>
                            <td>
                                <Button onClick={() => fundWork(props.smartContract, acceptedTask, props.removeProposedTask)}>
                                    Start task and stake ether!
                                </Button> 
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                </tfoot>
            </HTMLTable>
        </div>);
}

function fundWork(smartContract: Freelancer, task: Task, removeProposedTask: (taskId: BigNumber) => void) {
    smartContract
    .fundWork(
        task.taskDescription, 
        task.taskPrice, 
        task.contractorWallet as string, 
        { value: task.taskPrice}
    )
    .then(_unused => {
        removeProposedTask.call(null, task.taskId);
    })
    .catch(error => console.log(error));

}