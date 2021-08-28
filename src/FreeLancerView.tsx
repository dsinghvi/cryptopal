import React from 'react';
import { Freelancer } from './generated/abis';
import { useState } from 'react';
import { ActiveTasks } from './tasks/ActiveTasks';
import { ProposedTasks } from './tasks/ProposedTasks';
import { Task } from './Task';
import { useParams, Link } from 'react-router-dom';

interface ClientProps {
  walletAddress: string;
  smartContract: Freelancer;
  proposedTasks: Array<Task>;
  acceptedTasks: Array<Task>;
}

const styles = {
  container: {
    margin: '40px',
  },
};

export function FreeLancerView(props: ClientProps) {
  //@ts-ignore
  const { address } = useParams();
  const {
    smartContract,
    walletAddress,
    proposedTasks,
    acceptedTasks,
  } = props;
  const [tasks, setTasks] = useState(new Array<Task>());
  const [pollData, setPollData] = React.useState(false);
  const [pollDataInterval, setPollDataInterval] =
    React.useState<NodeJS.Timeout>();

  const fetchTasks = React.useCallback(async () => {
    const taskIds =
      smartContract &&
      (await smartContract.getTaskForFreelancer(address));
    const tasks =
      taskIds &&
      (await Promise.all(
        taskIds.map(async (taskId) => {
          const task =
            smartContract && (await smartContract.getTask(taskId));
          return new Task(
            task.description,
            Number(task.value),
            task.client.addr,
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
      }, 10000);
      setPollData(true);
      setPollDataInterval(pollDataInterval);
    }
    return () => {
      //@ts-ignore
      clearInterval(pollDataInterval);
    };
  }, [pollData, pollDataInterval]);

  return (
    <div style={styles.container}>
      <Link to="/">Home</Link>
      <ProposedTasks
        proposedTasks={proposedTasks}
        isClientView={false}
      />
      <ActiveTasks
        smartContract={smartContract}
        isCLientView={false}
        activeTasks={tasks}
      />
    </div>
  );
}
