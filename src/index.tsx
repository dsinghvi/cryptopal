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
import deleteAcceptedTask from './hooks/deleteAcceptedTask';
import { Task } from './Task';

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
  const initAcceptedTasks = useAcceptedTasks(walletAddr);
  let [acceptedTasks, setAcceptedTasks] = useState(initAcceptedTasks)

  if (freelancerSmartContract !== undefined) {
    freelancerSmartContract.on("workFunded", (contractTask: any) => {
      setAcceptedTasks(prevAcceptedTasks => {
        let filteredTasks = [
          ...prevAcceptedTasks.filter(task => !task.taskId.eq(contractTask.id))
        ];
        return filteredTasks;
      })
    })
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
