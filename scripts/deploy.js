const hre = require('hardhat');
const BigNumber = require('bignumber.js');

async function main() {
  const signers = await hre.ethers.getSigners();
  const deployerAddress = await signers[0].getAddress();

  /**
   * Deploy mock ERC20 token contract
   */
  const allowance = new BigNumber(100)
    .multipliedBy(1e18)
    .toString(10);

  const ERC20Mock = await hre.ethers.getContractFactory('ERC20Mock');
  const ERC20MockContract = await ERC20Mock.deploy();

  await ERC20MockContract.deployed();
  console.log(
    `ERC20MockContract deployed to ${ERC20MockContract.address}`,
  );

  signers.forEach(async (signer) => {
    const signerAddress = await signer.getAddress();
    await ERC20MockContract.faucet(signerAddress, allowance);
    console.log(
      `Address ${signerAddress} bestowed ${100} DWRK tokens`,
    );
  });

  /**
   * Deploy Freelancer Contract
   */
  console.log(
    'Deploying the contracts with the account:',
    deployerAddress,
  );

  const Freelancer = await hre.ethers.getContractFactory(
    'Freelancer',
  );

  const freelancerContract = await Freelancer.deploy(
    ERC20MockContract.address,
  );

  await freelancerContract.deployed();

  console.log(
    `Freelancer contract deployed to address: ${freelancerContract.address}`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
