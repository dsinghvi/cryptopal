import { Button, HTMLTable, Intent } from '@blueprintjs/core';
import { Task } from '../Task';
import { Freelancer } from '../generated/abis';
import { Link } from 'react-router-dom';
import { BigNumber } from 'ethers';

interface AcceptedTaskProps {
  acceptedTasks: Array<Task>;
  smartContract: Freelancer;
  removeAcceptedTask: (taskId: BigNumber) => void;
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
          {acceptedTasks &&
            acceptedTasks.map((acceptedTask) => (
              <tr>
                <td>{acceptedTask.taskDescription}</td>
                <td>{acceptedTask.taskPrice}</td>
                <td>
                  {' '}
                  <Link to={`/${acceptedTask.contractorWallet}`}>
                    {acceptedTask.contractorWallet}
                  </Link>
                </td>
                <td>
                  <Button
                    intent={Intent.PRIMARY}
                    onClick={() =>
                      props.smartContract
                        .fundWork(
                          acceptedTask.taskId,
                          acceptedTask.taskDescription,
                          acceptedTask.taskPrice,
                          //@ts-ignore
                          acceptedTask.contractorWallet as string,
                          { value: acceptedTask.taskPrice },
                        )
                        .catch((error) => console.log(error))
                    }
                  >
                    Fund task
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot></tfoot>
      </HTMLTable>
    </div>
  );
}
