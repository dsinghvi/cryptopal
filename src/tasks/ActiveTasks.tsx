import { HTMLTable } from "@blueprintjs/core";
import { Task } from "../App";


interface ActiveTaskProps {
    activeTasks: Array<Task>;
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
                    </tr>
                </thead>
                <tbody>
                    {props.activeTasks.map(activeTask => 
                        <tr>
                            <td>{activeTask.taskDescription}</td>
                            <td>{activeTask.taskPrice}</td>
                            <td>{activeTask.contractorWallet}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                </tfoot>
            </HTMLTable>
        </div>);
}