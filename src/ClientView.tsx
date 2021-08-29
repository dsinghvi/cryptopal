import React, { ReactElement } from 'react';
import { Freelancer, ERC20Mock } from './generated/abis';
import { useState } from 'react';
import { ActiveTasks } from './tasks/ActiveTasks';
import { ProposedTasks } from './tasks/ProposedTasks';
import { AcceptedTasks } from './tasks/AcceptedTasks';
import { Task, TaskStatus } from './Task';
import { HeaderBanner } from './HeaderBanner';
import { FinishedTasks } from './tasks/FinishedTasks';

interface ClientProps {
  walletAddress: string;
  smartContract: Freelancer;
  proposedTasks: Array<Task>;
  acceptedTasks: Task[];
  tokenContract: ERC20Mock;
}

const styles = {
  container: {
    margin: '40px',
    padding: '30px',
    border: '1px solid grey',
    borderRadius: '6px',
    marginTop: '30px',
  },
};

interface Props {
  children: React.ReactChildren | ReactElement;
}

const Container = (props: Props) => {
  const { children } = props;
  return <div style={styles.container}>{children}</div>;
};

export function ClientView(props: ClientProps) {
  const {
    smartContract,
    walletAddress,
    proposedTasks,
    acceptedTasks,
    tokenContract
  } = props;
  const [tasks, setTasks] = useState(new Array<Task>());
  const [pollData, setPollData] = React.useState(false);
  const [pollDataInterval, setPollDataInterval] =
    React.useState<NodeJS.Timeout>();

  const fetchTasks = React.useCallback(async () => {
    const taskIds =
      smartContract &&
      (await smartContract.getTaskForClient(walletAddress));
    const tasks =
      taskIds &&
      (await Promise.all(
        taskIds.map(async (taskId) => {
          const task =
            smartContract && (await smartContract.getTask(taskId));
          return new Task(
            task.description,
            task.value,
            task.client.addr,
            task.status,
            task.freelancer.addr,
            task.client.vote,
            task.freelancer.vote,
            taskId,
          );
        }),
      ));
    setTasks(tasks);
  }, [walletAddress, smartContract]);

  React.useEffect(() => {
    if (!pollData) {
      const pollDataInterval = setInterval(() => {
        fetchTasks();
      }, 5000);
      setPollData(true);
      setPollDataInterval(pollDataInterval);
    }
    return () => {
      //@ts-ignore
      clearInterval(pollDataInterval);
    };
  }, [pollData, pollDataInterval]);

  return (
    <div style={{ overflow: 'scroll' }}>
      <div style={{ margin: '40px' }}>
        <HeaderBanner
          walletAddress={walletAddress}
          isClientView={true}
        />
      </div>
      <Container>
        <ProposedTasks
          proposedTasks={proposedTasks}
          isClientView={true}
        />
      </Container>
      <Container>
        <AcceptedTasks
          acceptedTasks={acceptedTasks}
          smartContract={smartContract}
          tokenContract={tokenContract}
        />
      </Container>
      <Container>
        <ActiveTasks
          smartContract={smartContract}
          isCLientView={true}
          activeTasks={tasks.filter(task => task.taskStatus === TaskStatus.funded)}
        />
      </Container>
      <Container>
        <FinishedTasks
          smartContract={smartContract}
          isCLientView={true}
          finishedTasks={tasks.filter(task => task.taskStatus !== TaskStatus.funded)}
        />
      </Container>
    </div>
  );
}
