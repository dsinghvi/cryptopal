import React from "react";
import { Task } from "./App";
import { Freelancer } from "./generated/abis";

class TaskListProps {
    title?: string;
    tasks: Array<Task> = [];
}

export class TaskList extends React.Component<TaskListProps, {}> {

    render() {
        return (
            <div>
            <h4>{this.props.title}</h4>
            <table className="table">
                <thead>
                    <th>Description</th>
                    <th>Contractor Wallet</th>
                </thead>
                <tbody>
            {
              this.props.tasks.map(task => {
                    return (
                        <tr>
                            <td>{task.taskDescription}</td>
                            <td>{task.contractorWallet}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        )
    }

}