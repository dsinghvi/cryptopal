import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { FreeLancerView } from './FreeLancerView';
import { Freelancer, Freelancer__factory } from './generated/abis';
import { CONTRACT_ADDR } from './ContractAddress';
import { ethers } from 'ethers';
import { ClientView } from './ClientView';
import useProposedTasks from './hooks/useProposedTasks';
import useAcceptedTasks from './hooks/useAcceptedTasks';
import './App.css';
import { ConnectWallet } from './ConnectWallet';
import { BigNumber } from 'ethers';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

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

  freelancerSmartContract &&
    freelancerSmartContract.on(
      'workFunded',
      (
        task: // Copy paste this type from the generated typescript bindings
        [
          [string, number] & { addr: string; vote: number },
          [string, number] & { addr: string; vote: number },
          string,
          BigNumber,
          number,
          number,
          [string, number] & { addr: string; vote: number },
        ] & {
          freelancer: [string, number] & {
            addr: string;
            vote: number;
          };
          client: [string, number] & { addr: string; vote: number };
          description: string;
          value: BigNumber;
          status: number;
          consensusType: number;
          thirdParty: [string, number] & {
            addr: string;
            vote: number;
          };
        },
      ) => {
        console.log('task was funded' + task.description);
      },
    );

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
