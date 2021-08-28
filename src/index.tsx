import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { FreeLancerView } from './FreeLancerView';
import { Freelancer, Freelancer__factory } from './generated/abis';
import { CONTRACT_ADDR } from './ContractAddress';
import { BigNumber, ethers } from 'ethers';
import { ClientView } from './ClientView';
import useProposedTasks from './hooks/useProposedTasks';
import useAcceptedTasks from './hooks/useAcceptedTasks';
import './App.css';
import { ConnectWallet } from './ConnectWallet';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Task } from './Task';
import getAcceptedTasks from './hooks/useAcceptedTasks';

const Controller = () => {
  //@ts-ignore
  const [provider, setProvider] = React.useState<Web3Provider>();
  const [freelancerSmartContract, setFreelancerSmartContract] =
    React.useState<Freelancer>();

  React.useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
    );
    const freelancerSmartContract = Freelancer__factory.connect(
      CONTRACT_ADDR,
      provider.getSigner(0),
    );
    setProvider(provider);
    setFreelancerSmartContract(freelancerSmartContract);
  }, [window.ethereum]);

  const [walletAddr, setWalletAddr] = useState('');
  const proposedTasks = useProposedTasks(walletAddr);
  const acceptedTasks = useAcceptedTasks(walletAddr);

  if (freelancerSmartContract !== undefined) {
    setupFundTaskListener(freelancerSmartContract);
  }

  if (walletAddr === '') {
    return (
      <ConnectWallet
        //@ts-ignore
        setWalletAddress={(walletAddress) =>
          setWalletAddr(walletAddress)
        }
      />
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ClientView
            walletAddress={walletAddr}
            //@ts-ignore
            smartContract={freelancerSmartContract}
            proposedTasks={proposedTasks}
            acceptedTasks={acceptedTasks}
            removeAcceptedTask={taskId => removeAcceptedTask(taskId, setAcceptedTasks)}
          />
        </Route>
        <Route path="/:address">
          <FreeLancerView
            walletAddress={walletAddr}
            //@ts-ignore
            smartContract={freelancerSmartContract}
            proposedTasks={proposedTasks}
            acceptedTasks={acceptedTasks}
          />
        </Route>
      </Switch>
    </Router>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Controller />
  </React.StrictMode>,
  document.getElementById('root'),
);

function setupFundTaskListener(smartContract: Freelancer) {
  smartContract.on("workFunded", (contractTask: any) => {
      // setAcceptedTasks(prevAcceptedTasks => {
      //   const filteredTasks = prevAcceptedTasks.filter(task => !task.taskId.eq(taskId));
      //   return [...filteredTasks]
      // })
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
