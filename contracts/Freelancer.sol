
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Freelancer {
    /* 
    *   1. Clients propose work.
    *   2. Freelancers accept work, and propose a plan of work.
    *   3. Clients accept the plan of work, and fund the contract.
    *   4. Freelancers start the work.
    *   5. Clients approve the approved work.
    *   6. Freelancers withdraw funds.
    */

    // potentially include proposal, accepted, started statuses later
    enum Status { funded, finished }

    enum Vote { approved, declined, undecided }

    enum ConsensusType { unanimous_vote, third_party }

    struct Entity {
        // "payable" vs. "non-payable" addresses are defined at in Solidity at compile time.
        // You can use .transfer(...) and .send(...) on address payable, but not address.
        address payable addr;
        Vote vote;
    }

    struct Work {
        Entity freelancer;
        Entity client;
        // client's description of work
        string description;
        // total payout for the work
        uint256 value;
        // status of the work
        Status status;
        ConsensusType consensusType;
        Entity thirdParty;
        // id of the work 
        uint256 id;
        bool isPopulated;
    }

    mapping(uint256 => Work) public contracts;
    mapping(address => uint256[]) public freelancerToContractId;
    mapping(address => uint256[]) public clientToContractId;

    event workFunded(Work work);
    event transferFunds();

    constructor() {
    }

    modifier onlyFreelancer(uint256 _id) {
        require(msg.sender == contracts[_id].freelancer.addr, "Only freelancer can call this flow.");
        _;
    }

    modifier onlyClient(uint256 _id) {
        require(msg.sender == contracts[_id].client.addr, "Only client can call this flow");
        _;
    }

    modifier onlyThirdParty(uint256 _id) {
        require(msg.sender == contracts[_id].thirdParty.addr, "Only appointed third party can call this flow");
        _;
    }

    modifier checkWorkStatus(uint256 _id, Status _status) {
        require(contracts[_id].status == _status);
        _;
    }

    modifier checkConsensusType(uint256 _id, ConsensusType _consensusType) {
        require(contracts[_id].consensusType == _consensusType);
        _;
    }

    // "_" differentiates between function arguments and global variables
    modifier sufficientFunds(uint256 _value, uint256 _payment) {
        require(_payment == _value, "Funds are not equal to approved amount.");
        _;
    }

    modifier isAnUnusedId(uint256 _id) {
        require(!contracts[_id].isPopulated, "Task id has already been used");
        _;
    }

    function fundWork(uint256 _id, string memory _description, uint256 _value, address payable _freelancer) 
        public
        payable
        sufficientFunds(_value, msg.value)
        isAnUnusedId(_id)
    {
        Entity memory entityFreelancer = Entity(_freelancer, Vote.undecided);
        Entity memory entityClient = Entity(payable(msg.sender), Vote.undecided); 
        contracts[_id] = Work(
            entityFreelancer, 
            entityClient, 
            _description, 
            _value, 
            Status.funded, 
            ConsensusType.unanimous_vote, 
            Entity(payable(0), Vote.undecided), 
            _id, 
            true);
        freelancerToContractId[_freelancer].push(_id);
        clientToContractId[msg.sender].push(_id);

        emit workFunded(contracts[_id]);
    }

    function fundWorkWithThirdParty(uint256 _id, string memory _description, uint256 _value, address payable _freelancer, address payable _thirdParty) 
        public
        payable
        sufficientFunds(_value, msg.value)
        isAnUnusedId(_id)
    {
        require(_thirdParty != _freelancer && _thirdParty != msg.sender, "The client or freelancer cannot be the third party");
        Entity memory entityFreelancer = Entity(_freelancer, Vote.undecided);
        Entity memory entityClient = Entity(payable(msg.sender), Vote.undecided); 
        contracts[_id] = Work(
            entityFreelancer, 
            entityClient, 
            _description, 
            _value, 
            Status.funded, 
            ConsensusType.third_party, 
            Entity(payable(_thirdParty), 
            Vote.undecided), 
            _id, 
            true);
        freelancerToContractId[_freelancer].push(_id);
        clientToContractId[msg.sender].push(_id);

        emit workFunded(contracts[_id]);
    }

    function clientVote(uint256 _id, Vote vote) 
        public
        onlyClient(_id)
        checkWorkStatus(_id, Status.funded)
        checkConsensusType(_id, ConsensusType.unanimous_vote)
    {
        contracts[_id].client.vote = vote;
        Work memory agreement = contracts[_id];
        if (agreement.client.vote == Vote.approved) {
            agreement.freelancer.addr.transfer(agreement.value);
            emit transferFunds();
        } else if (agreement.client.vote == Vote.declined && agreement.freelancer.vote == Vote.declined) {
            agreement.client.addr.transfer(agreement.value);
            emit transferFunds();
        }
    }

    function freelancerVote(uint256 _id, Vote vote) 
        public
        onlyFreelancer(_id)
        checkWorkStatus(_id, Status.funded)
        checkConsensusType(_id, ConsensusType.unanimous_vote)
    {
        contracts[_id].freelancer.vote = vote;
        Work memory agreement = contracts[_id];
        if (agreement.client.vote == Vote.approved && agreement.freelancer.vote == Vote.approved) {
            agreement.freelancer.addr.transfer(agreement.value);
            emit transferFunds();

        } else if (agreement.freelancer.vote == Vote.declined) {
            agreement.client.addr.transfer(agreement.value);
            emit transferFunds();
        }
    }

    function thirdPartyVote(uint256 _id, Vote vote) 
        public
        onlyThirdParty(_id)
        checkWorkStatus(_id, Status.funded)
        checkConsensusType(_id, ConsensusType.third_party)
    {
        contracts[_id].thirdParty.vote = vote;
        Work memory agreement = contracts[_id];
        if (vote == Vote.approved) {
            agreement.freelancer.addr.transfer(agreement.value);
            emit transferFunds();

        } else if (vote == Vote.declined) {
            agreement.client.addr.transfer(agreement.value);
            emit transferFunds();
        }
    }

    function getTaskForFreelancer(address _address) 
        public
        view 
        returns(uint256[] memory) {
        return freelancerToContractId[_address];
    }

    function getTaskForClient(address _address) 
        public
        view 
        returns(uint256[] memory) {
        return clientToContractId[_address];
    }

    function getTask(uint256 _id) 
        public
        view 
        returns(Work memory) {
        return contracts[_id];
    }
}