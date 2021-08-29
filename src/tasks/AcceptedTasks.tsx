import React, { useCallback } from 'react';
import { Button, HTMLTable, Intent } from '@blueprintjs/core';
import { Task } from '../Task';
import { Freelancer, ERC20Mock } from '../generated/abis';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;
import { CONTRACT_ADDR } from '../ContractAddress';
interface AcceptedTaskProps {
  acceptedTasks: Array<Task>;
  smartContract: Freelancer;
  tokenContract: ERC20Mock;
}
const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export function AcceptedTasks(props: AcceptedTaskProps) {
  const { acceptedTasks, tokenContract, smartContract } = props;
  const [fundWorkLoading, setFundWorkLoading] = React.useState(false);
  const [fundWorkProgress, setFundWorkProgress] =
    React.useState(null);

  const fundWork = React.useCallback(async (acceptedTask: Task) => {
    const {
      taskId,
      taskDescription,
      taskPriceInWei,
      contractorWallet,
    } = acceptedTask;
    await tokenContract.approve(CONTRACT_ADDR, taskPriceInWei);

    setFundWorkLoading(true);
    setFundWorkProgress(acceptedTask.taskId as any);

    const fundWorkResponse = await smartContract.fundWork(
      taskId,
      taskDescription,
      taskPriceInWei,
      contractorWallet as string,
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
                <td>{acceptedTask.getPricingText()}</td>
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
                    onClick={async () =>
                      fundWork(acceptedTask).catch((error) =>
                        console.log(`fundWork error ${error}`),
                      )
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
