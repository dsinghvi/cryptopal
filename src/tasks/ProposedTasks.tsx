import React from 'react';
import { Button, HTMLTable, Intent } from "@blueprintjs/core";
import { Task } from "../App";


const styles = {
    buttonMargin: {
        marginRight: '10px',
    }
}
interface ProposedTaskProps {
    isClientView: boolean;
    proposedTasks: Array<Task>;
}

export function ProposedTasks(props: ProposedTaskProps) {
    return (
        <div>
            <h4>Proposed Tasks</h4>
            <HTMLTable bordered={true} interactive={true} striped={true}>
                <thead>
                    <tr>
                    <th>Task Description</th>
                    <th>Task Price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.proposedTasks.map(proposedTask => 
                        <tr>
                            <td>{proposedTask.taskDescription}</td>
                            <td>{proposedTask.taskPrice}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                </tfoot>
            </HTMLTable>
        </div>);
}

function renderProposedTasks(props: ProposedTaskProps) {
    if (props.isClientView) {
        return (
            <HTMLTable bordered={true} interactive={true} striped={true}>
                <thead>
                    <tr>
                    <th>Task Description</th>
                    <th>Task Price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.proposedTasks.map(proposedTask => 
                        <tr>
                            <td>{proposedTask.taskDescription}</td>
                            <td>{proposedTask.taskPrice}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                </tfoot>
            </HTMLTable>
        );
    } else {
        return (
            <HTMLTable bordered={true} interactive={true} striped={true}>
                <thead>
                    <tr>
                    <th>Task Description</th>
                    <th>Task Price</th>
                    <th>Would you like to accept ?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.proposedTasks.map(proposedTask => 
                        <tr>
                            <td>{proposedTask.taskDescription}</td>
                            <td>{proposedTask.taskPrice}</td>
                            <td>
                                <Button 
                                    style={styles.buttonMargin}
                                    intent={Intent.SUCCESS} 
                                    onClick={() => console.log("Accept task")}>
                                    Accept Task
                                </Button> 
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                </tfoot>
            </HTMLTable>
        )
    }
}