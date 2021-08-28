import React from 'react';
import { Button, HTMLTable, Intent } from '@blueprintjs/core';
import { Task } from '../Task';
import { Freelancer } from '../generated/abis';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;
interface AcceptedTaskProps {
  acceptedTasks: Array<Task>;
  smartContract: Freelancer;
}
const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export function AcceptedTasks(props: AcceptedTaskProps) {
  const { acceptedTasks, smartContract } = props;
  const [fundWorkLoading, setFundWorkLoading] = React.useState(false);
  const [fundWorkProgress, setFundWorkProgress] =
    React.useState(null);

  const fundWork = React.useCallback(async (acceptedTask) => {
    setFundWorkLoading(true);
    setFundWorkProgress(acceptedTask.taskId);
    const fundWorkResponse = await smartContract.fundWork(
      acceptedTask.taskId,
      acceptedTask.taskDescription,
      acceptedTask.taskPrice,
      //@ts-ignore
      acceptedTask.contractorWallet as string,
      { value: acceptedTask.taskPrice },
    );
    await fundWorkResponse.wait(1);
    // HACK - Figure out how to await till we get confirmation from Blockchain
    await delay(10000);
    setFundWorkLoading(false);
    setFundWorkProgress(null);
  }, []);
  return (
    <div>
      <Title style={{ marginTop: '20px' }}>Accepted Tasks</Title>
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
                    loading={
                      fundWorkProgress === acceptedTask.taskId &&
                      fundWorkLoading
                    }
                    intent={Intent.PRIMARY}
                    onClick={async () => await fundWork(acceptedTask)}
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
