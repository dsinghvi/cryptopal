import React from 'react';
import { Button, HTMLTable, Intent } from "@blueprintjs/core";
import { Task } from "../App";
import { Freelancer } from "../generated/abis";


interface AcceptedTaskProps {
    acceptedTasks: Array<Task>;
    smartContract: Freelancer;
}

export function AcceptedTasks(props: AcceptedTaskProps) {
    const { acceptedTasks } = props;
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
                    {acceptedTasks && acceptedTasks.map(acceptedTask => 
                        <tr>
                            <td>{acceptedTask.taskDescription}</td>
                            <td>{acceptedTask.taskPrice}</td>
                            <td>{acceptedTask.contractorWallet}</td>
                            <td>
                                <Button 
                                    intent={Intent.PRIMARY} 
                                    onClick={() => 
                                    props.smartContract
                                    .fundWork(
                                        acceptedTask.taskDescription, 
                                        acceptedTask.taskPrice, 
                                        acceptedTask.contractorWallet as string, 
                                        { value: acceptedTask.taskPrice}
                                    )
                                    .catch(error => console.log(error))}>
                                    Fund task
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