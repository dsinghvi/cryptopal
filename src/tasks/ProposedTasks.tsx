import React from 'react';
import { HTMLTable, Button, Intent } from '@blueprintjs/core';
import { Task } from '../Task';
import { Card, Typography, Row } from 'antd';
const { Text, Title } = Typography;
interface ProposedTaskProps {
  proposedTasks: Array<Task>;
  isClientView: boolean;
}

interface ProposedTaskItemProps {
  proposedTask: Task;
  isClientView: boolean;
}

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

const ProposedTaskItem = (props: ProposedTaskItemProps) => {
  const { proposedTask, isClientView } = props;
  return (
    <div style={{ marginRight: '10px' }}>
      <Card
        hoverable
        style={{ width: 240, height: 180 }}
        cover={
          <div
            style={{
              marginTop: '50px',
              marginLeft: '10px',
              marginRight: '10px',
              whiteSpace: 'normal',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Row>
              <Title level={4}>{proposedTask.taskDescription}</Title>
            </Row>
            <Row>
              <Text
                strong
              >{`Budget: ${proposedTask.getPricingText()}`}</Text>
            </Row>
            {isClientView ? null : (
              <Row>
                <Button>Accept Project</Button>
              </Row>
            )}
          </div>
        }
      ></Card>
    </div>
  );
};

const CreateTask = () => {
  return (
    <div style={{ marginRight: '10px' }}>
      <Card
        hoverable
        style={{ width: 240, height: 180 }}
        cover={
          <div
            style={{
              marginTop: '50px',
              marginLeft: '10px',
              marginRight: '10px',
              whiteSpace: 'normal',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Row>
              <Title level={4}>Create a new project</Title>
            </Row>
            <Row>
              <Button>Start</Button>
            </Row>
          </div>
        }
      ></Card>
    </div>
  );
};
export function ProposedTasks(props: ProposedTaskProps) {
  const { proposedTasks, isClientView } = props;
  const [proposedTaskLoading, setProposedTaskLoading] =
    React.useState(false);
  const acceptTask = React.useCallback(async () => {
    setProposedTaskLoading(true);
    await delay(5000);
    setProposedTaskLoading(false);
  }, []);
  return (
    <div>
      {isClientView ? (
        <Title>My Projects</Title>
      ) : (
        <Title>Available Projects</Title>
      )}
      <Row>
        {proposedTasks.map((proposedTask) => {
          return (
            <ProposedTaskItem
              proposedTask={proposedTask}
              isClientView={isClientView}
            />
          );
        })}
        {isClientView ? <CreateTask /> : null}
      </Row>
    </div>
  );
}
