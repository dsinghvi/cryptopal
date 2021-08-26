const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    const Freelancer = await hre.ethers.getContractFactory("Freelancer");
    const freelancerContract = await Freelancer.deploy();

    await freelancerContract.deployed();
    console.log(`Ethereum faucet deployed to address: ${freelancerContract.address}`);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });