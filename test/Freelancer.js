const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

  describe("Freelancer", () => {
    let Freelancer, freelancerApp;

    beforeEach(async () => {
      Freelancer = await ethers.getContractFactory("Freelancer");
      freelancerApp = await Freelancer.deploy();
    });



    // 1. Client passsing incorrect funds
    it('Client Funded and Approved', async () => {
      const [client, freelancer] = await ethers.getSigners();
      expect(freelancerApp.connect(client).fundWork("test task", 1, freelancer.address, { value: 12}))
      .to.be.revertedWith("Funds are not equal to approved amount.");
  });

    // 2. Client funded and Approved
    it('Client Funded and Approved', async () => {
      const [client, freelancer] = await ethers.getSigners();
      expect(await freelancerApp.connect(client).fundWork("test task", 1, freelancer.address, { value: 1}))
      .to.emit(freelancerApp, 'workFunded')

      expect(await freelancerApp.connect(client).clientVote(0, 0))
      .to.emit(freelancerApp, 'transferFunds')
  });

    // 3. Client funded and Freelancer declined the completion of work
    it('Client Funded and Freelancer Declined Payment', async () =>  {
        const [client, freelancer] = await ethers.getSigners();
        expect(await freelancerApp.connect(client).fundWork("test task", 1, freelancer.address, { value: 1}))
        .to.emit(freelancerApp, 'workFunded')

        expect(await freelancerApp.connect(freelancer).freelancerVote(0, 1))
        .to.emit(freelancerApp, 'transferFunds')
    });

    // 4. Client calling freelancerVote
    it('Client calling freelancerVote', async () =>  {
      const [client, freelancer] = await ethers.getSigners();
      freelancerApp.connect(client).fundWork("test task", 1, freelancer.address, { value: 1})
      expect(freelancerApp.connect(freelancer).clientVote(0, 1))
      .to.be.revertedWith("Only client can call this flow");
    });

    // 5. Freelance calling clientVote
    it('Client calling freelancerVote', async () =>  {
      const [client, freelancer] = await ethers.getSigners();
      freelancerApp.connect(client).fundWork("test task", 1, freelancer.address, { value: 1})
      expect(freelancerApp.connect(client).freelancerVote(0, 1))
      .to.be.revertedWith("Only freelancer can call this flow");
    });

});
