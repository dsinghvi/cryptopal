const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const subtract = (a, b) => [a, b].map(n => [...n].reverse()).reduce((a, b) => a.reduce((r, d, i) => {
  let s = d - (b[i] || 0)
  if (s < 0) {
      s += 10
      a[i + 1]--
  }
  return '' + s + r
}, '').replace(/^0+/, ''));

  describe("Freelancer", () => {
    let Freelancer, freelancerApp;

    beforeEach(async () => {
      Freelancer = await ethers.getContractFactory("Freelancer");
      freelancerApp = await Freelancer.deploy();
    });



    // 1. Client passsing incorrect funds
    it('Client Funded and Approved', async () => {
      const [client, freelancer] = await ethers.getSigners();
      expect(freelancerApp.connect(client).fundWork(1, "test task", 1, freelancer.address, { value: 12}))
      .to.be.revertedWith("Funds are not equal to approved amount.");
  });

    // 2. Client funded and Approved
    it('Client Funded and Approved', async () => {
      const [client, freelancer] = await ethers.getSigners();
      prov = ethers.provider;
      const balanceBefore = await prov.getBalance(freelancer.address);
      

      const taskvalue = 23;

      expect(await freelancerApp.connect(client).fundWork(1, "test task", taskvalue, freelancer.address, { value: taskvalue}))
      .to.emit(freelancerApp, 'workFunded')

      expect(await freelancerApp.connect(client).clientVote(1, 0))
      .to.emit(freelancerApp, 'transferFunds')
      const balanceAfter = await prov.getBalance(freelancer.address);

      expect(subtract(balanceAfter.toString(), balanceBefore.toString())).to.equal(taskvalue.toString())

  });

    // 3. Client funded and Freelancer declined the completion of work
    it('Client Funded and Freelancer Declined Payment', async () =>  {
        const [client, freelancer] = await ethers.getSigners();
        expect(await freelancerApp.connect(client).fundWork(1, "test task", 1, freelancer.address, { value: 1}))
        .to.emit(freelancerApp, 'workFunded')

        expect(await freelancerApp.connect(freelancer).freelancerVote(1, 1))
        .to.emit(freelancerApp, 'transferFunds')
    });

    // 4. Client calling freelancerVote
    it('Client calling freelancerVote', async () =>  {
      const [client, freelancer] = await ethers.getSigners();
      freelancerApp.connect(client).fundWork(1, "test task", 1, freelancer.address, { value: 1})
      expect(freelancerApp.connect(freelancer).clientVote(0, 1))
      .to.be.revertedWith("Only client can call this flow");
    });

    // 5. Freelance calling clientVote
    it('Client calling freelancerVote', async () =>  {
      const [client, freelancer] = await ethers.getSigners();
      freelancerApp.connect(client).fundWork(1, "test task", 1, freelancer.address, { value: 1})
      expect(freelancerApp.connect(client).freelancerVote(0, 1)).to.be.revertedWith("Only freelancer can call this flow");
    });


    // 6. Client with multiple tasks
    it('Client calling freelancerVote', async () =>  {
      const [client, freelancer1, freelancer2] = await ethers.getSigners();
      freelancerApp.connect(client).fundWork(1, "test task 01", 1, freelancer1.address, { value: 1})
      freelancerApp.connect(client).fundWork(23, "test task 02", 1, freelancer2.address, { value: 1})

      const clientFundedTasks = await freelancerApp.connect(client).getTaskForClient(client.address)

      expect(clientFundedTasks[0].toString()).to.equal('1')
      expect(clientFundedTasks[1].toString()).to.equal('23')

      // client calling to check tasks for freelancer2
      const freelancer2Task = await freelancerApp.connect(client).getTaskForFreelancer(freelancer2.address)
      expect(freelancer2Task[0].toString()).to.equal('23')

      
    });

    // 7. Freelancer with multiple tasks
    it('Client calling freelancerVote', async () =>  {
      const [client1, client2, freelancer] = await ethers.getSigners();
      freelancerApp.connect(client1).fundWork(1, "test task 01", 1, freelancer.address, { value: 1})
      freelancerApp.connect(client2).fundWork(12, "test task 02", 1, freelancer.address, { value: 1})

      const freelancerTasks = await freelancerApp.connect(freelancer).getTaskForFreelancer(freelancer.address)

      expect(freelancerTasks[0].toString()).to.equal('1')
      expect(freelancerTasks[1].toString()).to.equal('12')
    });

});
