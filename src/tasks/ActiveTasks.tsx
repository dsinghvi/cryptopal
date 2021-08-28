import React from 'react';
import { Button, HTMLTable, Intent } from '@blueprintjs/core';
import { Task, TaskVote } from '../Task';
import { Freelancer } from '../generated/abis';
import { BigNumber } from 'ethers';
import { Link } from 'react-router-dom';
import { Card, Typography, Row, Skeleton } from 'antd';
const { Text, Title } = Typography;

interface ActiveTaskProps {
  isCLientView: boolean;
  activeTasks: Array<Task>;
  smartContract: Freelancer;
}

interface VoteCellProps {
  isCLientView: boolean;
  smartContract: Freelancer;
  task: Task;
}

const styles = {
  buttonMargin: {
    marginRight: '10px',
  },
  loadingContainer: {
    margin: '40px',
  },
};

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export function ActiveTasks(props: ActiveTaskProps) {
  const { activeTasks, isCLientView, smartContract } = props;

  if (activeTasks.length <= 0) {
    return (
      <>
        <Title>Active Tasks</Title>
        <Skeleton paragraph={{ rows: 4 }} />
      </>
    );
  }
  return (
    <div>
      <Title style={{ marginTop: '20px' }}>Active Projects</Title>
      <HTMLTable bordered={true} interactive={true} striped={true}>
        <thead>
          <tr>
            <th>Task Description</th>
            <th>Task Price</th>
            <th>Contractor Wallet</th>
            <th>
              {props.isCLientView ? 'Contractor Vote' : 'Client Vote'}
            </th>
            <th>Your vote</th>
          </tr>
        </thead>
        <tbody>
          {activeTasks &&
            activeTasks.map((activeTask) => {
              return (
                <tr>
                  <td>{activeTask.taskDescription}</td>
                  <td>{activeTask.taskPrice}</td>
                  <td>
                    {props.isCLientView ? (
                      <Link to={`/${activeTask.contractorWallet}`}>
                        {activeTask.contractorWallet}
                      </Link>
                    ) : (
                      <Link to={`/${activeTask.clientWallet}`}>
                        {activeTask.clientWallet}
                      </Link>
                    )}
                  </td>
                  <td>
                    {props.isCLientView
                      ? TaskVote[activeTask.contractorVote]
                      : TaskVote[activeTask.clientVote]}
                  </td>
                  <VoteCell
                    isCLientView={isCLientView}
                    smartContract={smartContract}
                    task={activeTask}
                  />
                </tr>
              );
            })}
        </tbody>
        <tfoot></tfoot>
      </HTMLTable>
    </div>
  );
}

const VoteCell = React.memo((props: VoteCellProps) => {
  const { isCLientView, smartContract, task } = props;
  const [castVoteApproveLoading, setCastVoteApproveLoading] =
    React.useState(false);
  const [castVoteDeclineLoading, setCastVoteDeclineLoading] =
    React.useState(false);
  const [castVoteProgress, setCastVoteProgress] = React.useState<
    BigNumber | undefined
  >(undefined);

  const voted = hasVoted(isCLientView, task);

  const castApproval = React.useCallback(
    async (isCLientView, smartContract, task) => {
      setCastVoteApproveLoading(true);
      setCastVoteProgress(task.taskId);
      if (isCLientView) {
        const approvedClientVoteResponse = await smartContract
          // @ts-ignore
          .clientVote(task.taskId, TaskVote.Approved);
        await approvedClientVoteResponse.wait(1);
        // HACK - Figure out how to await till we get confirmation from Blockchain
        await delay(5000);
        // setCastVoteApproveLoading(false);
        // setCastVoteProgress(undefined);
      } else {
        const approvedFreelancerVoteResponse =
          await smartContract.freelancerVote(
            task.taskId as any,
            TaskVote.Approved,
          );
        await approvedFreelancerVoteResponse.wait(1);
        // HACK - Figure out how to await till we get confirmation from Blockchain
        await delay(5000);
        setCastVoteApproveLoading(false);
        setCastVoteProgress(undefined);
      }
    },
    [],
  );

  const castDeclined = React.useCallback(
    async (isCLientView, smartContract, task) => {
      setCastVoteDeclineLoading(true);
      setCastVoteProgress(task.taskId);
      if (isCLientView) {
        const declinedClientVoteResponse =
          await smartContract.clientVote(
            task.taskId as any,
            TaskVote.Declined,
          );
        await declinedClientVoteResponse.wait(1);
        // HACK - Figure out how to await till we get confirmation from Blockchain
        await delay(5000);
        setCastVoteDeclineLoading(false);
        setCastVoteProgress(undefined);
      } else {
        const declinedFreelancerVoteResponse =
          await smartContract.freelancerVote(
            task.taskId as any,
            TaskVote.Declined,
          );
        await declinedFreelancerVoteResponse.wait(1);
        // HACK - Figure out how to await till we get confirmation from Blockchain
        await delay(5000);
        setCastVoteDeclineLoading(false);
        setCastVoteProgress(undefined);
      }
    },
    [],
  );
  if (voted) {
    return (
      <td>
        {isCLientView
          ? TaskVote[task.clientVote]
          : TaskVote[task.contractorVote]}
      </td>
    );
  } else {
    return (
      <td>
        <Button
          loading={
            castVoteProgress === task.taskId && castVoteApproveLoading
          }
          style={styles.buttonMargin}
          intent={Intent.SUCCESS}
          onClick={async () =>
            await castApproval(isCLientView, smartContract, task)
          }
        >
          Approve
        </Button>
        <Button
          loading={
            castVoteProgress === task.taskId && castVoteDeclineLoading
          }
          intent={Intent.DANGER}
          onClick={async () =>
            await castDeclined(isCLientView, smartContract, task)
          }
        >
          Deny
        </Button>
      </td>
    );
  }
});

function hasVoted(isClientView: boolean, task: Task) {
  if (isClientView) {
    return task.clientVote !== TaskVote.Undecided;
  } else {
    return task.contractorVote !== TaskVote.Undecided;
  }
}
