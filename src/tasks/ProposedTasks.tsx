import React from 'react';
import { HTMLTable, Button, Intent } from '@blueprintjs/core';
import { Task } from '../Task';

interface ProposedTaskProps {
  proposedTasks: Array<Task>;
  isClientView: boolean;
}

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export function ProposedTasks(props: ProposedTaskProps) {
  const { proposedTasks, isClientView } = props;
  const [proposedTaskLoading, setProposedTaskLoading] =
    React.useState(false);
  const acceptTask = React.useCallback(async () => {
    setProposedTaskLoading(true);
    await delay(10000);
    setProposedTaskLoading(false);
  }, []);
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
                    onClick={acceptTask}
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
