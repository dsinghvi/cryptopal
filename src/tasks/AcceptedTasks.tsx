import { Button, HTMLTable } from "@blueprintjs/core";
import { Task } from "../App";
import { Freelancer } from "../generated/abis";


interface AcceptedTaskProps {
    acceptedTasks: Array<Task>;
    smartContract: Freelancer;
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
                                <Button onClick={() => 
                                    props.smartContract
                                    .fundWork(
                                        acceptedTask.taskDescription, 
                                        acceptedTask.taskPrice, 
                                        acceptedTask.contractorWallet as string, 
                                        { value: acceptedTask.taskPrice}
                                    )
                                    .catch(error => console.log(error))}>
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