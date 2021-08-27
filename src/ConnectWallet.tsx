import React from 'react';

interface ConnectWalletProps {
  setWalletAddress: (walletAddress: string) => void;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

export class ConnectWallet extends React.Component<
  ConnectWalletProps,
  {}
> {
  render() {
    return (
      <div className="col-6 p-4 text-center">
        <p>Please connect to your wallet.</p>
        <button
          className="btn btn-warning"
          type="button"
          onClick={async () => {
            const [selectedAddress] = await window.ethereum.enable();
            this.props.setWalletAddress(selectedAddress);
          }}
        >
          Connect Wallet
        </button>
      </div>
    );
  }
}
