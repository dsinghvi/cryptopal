import React from 'react';
import { HTMLTable, Button, Intent } from '@blueprintjs/core';
import { Task } from '../Task';

interface ProposedTaskProps {
  proposedTasks: Array<Task>;
  isClientView: boolean;
}

export function ProposedTasks(props: ProposedTaskProps) {
  const { proposedTasks, isClientView } = props;
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
          {proposedTasks.map((proposedTask) => (
            <tr>
              <td>{proposedTask.taskDescription}</td>
              <td>{proposedTask.taskPrice}</td>
              {isClientView ? null : (
                <td>
                  <Button
                    intent={Intent.PRIMARY}
                    onClick={() => console.log('Accept task')}
                  >
                    Accept Task
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </HTMLTable>
    </div>
  );
}
