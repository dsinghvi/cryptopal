import React from 'react';
import { Button, HTMLTable, Intent } from '@blueprintjs/core';
import { Task, TaskStatus, TaskVote } from '../Task';
import { Freelancer } from '../generated/abis';
import { BigNumber } from 'ethers';
import { Link } from 'react-router-dom';
import { Card, Typography, Row, Skeleton } from 'antd';
const { Text, Title } = Typography;

interface FinishedTasksProps {
  isCLientView: boolean;
  finishedTasks: Array<Task>;
  smartContract: Freelancer;
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

export function FinishedTasks(props: FinishedTasksProps) {
  const { finishedTasks, isCLientView, smartContract } = props;

  if (finishedTasks.length <= 0) {
    return (
      <>
        <Title>Finished Tasks</Title>
        <Skeleton paragraph={{ rows: 4 }} />
      </>
    );
  }
  return (
    <div>
      <Title style={{ marginTop: '20px' }}>Finished Projects</Title>
      <HTMLTable bordered={true} interactive={true} striped={true}>
        <thead>
          <tr>
            <th>Task Description</th>
            <th>Task Price</th>
            <th>Task Status</th>
          </tr>
        </thead>
        <tbody>
          {finishedTasks &&
            finishedTasks.map((finishedTask: Task) => {
              return (
                <tr>
                  <td>{finishedTask.taskDescription}</td>
                  <td>{finishedTask.getPricingText()}</td>
                  <td>
                    {renderTaskStatus(finishedTask, isCLientView)}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot></tfoot>
      </HTMLTable>
    </div>
  );
}

function renderTaskStatus(task: Task, isClientView: boolean) {
    if (task.taskStatus === TaskStatus.transferred) {
        return "Money was transferred to the contractor."
    } else if (task.taskStatus === TaskStatus.refunded) {
        return "Money was refunded to the employer."
    } else if (task.taskStatus === TaskStatus.disagreed) {
        return "In a disagreement. The contractor has voted " 
            + TaskVote[task.contractorVote] 
            + " and the client has voted " 
            + TaskVote[task.clientVote];
    }
}
