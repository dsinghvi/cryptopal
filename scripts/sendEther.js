const fs = require('fs');

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.

task('sendEther', 'Sends ETH and tokens to an address')
  .addPositionalParam(
    'receiver',
    'The address that will receive them',
  )
  .setAction(async ({ receiver }) => {
    console.log(receiver);

    const address = '0x14dc79964da2c08b23698b3d3cc7ca32193d9955';

    await ethers.provider.getCode(address);
    const [sender] = await ethers.getSigners();
    const tx2 = await sender.sendTransaction({
      to: receiver,
      value: ethers.constants.WeiPerEther,
    });
    await tx2.wait();

    console.log(`Transferred 1 ETH  to ${receiver}`);
  });
