import { HTMLTable } from "@blueprintjs/core";
import { Task } from "../App";


interface ProposedTaskProps {
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