import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

// this is the array of proposals... make sure that they are short strings, less than 32 chars.
//we write in caps because is a const...
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

//This function will convert the array of proposals into a string of capitals.
//we can also use map for doing this. PROPOSALS.map(p => ethers.utils.formatBytes32String(p))
function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}
//Normally we start here, by creating a new factory for our new contract. However when we go to the line where we deploy, then it give us an error. Because the ballot cntract in its constructor function is using an array of bytes32. So in this case is not working... then we would need to add the code on top of this comment. But also pass the array of bytes32 as a parameter to the constructor function.
describe("Ballot", function () {
  let ballotContract: Ballot;

  beforeEach(async function () {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    //remember that if we only pass proposals as an argument,  the test will fail, because it is not an array of bytes32. so we need to convert it to a string. we will write this function on top of the constructor function test.
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", () => {
    it("has the provided proposals", async function () {
      //by default, you cannot return arrays, only position by position. this is beacuse we need to give parameters to proposals.

      //   const proposals0 = await ballotContract.proposals(0);

      //first of all, the ballot contract will return an struct and not just an array of bytes32. so we need to specify that fro that strct, we just want the name of 32 bytes, for this reason we say proposals(0).name. However this still will fail the test... because PROPOSALS [0] is not yet an string of 32 bytes so we need to transform it to a string of 32 bytes.

      //   expect(proposals0.name).to.equal(
      //     ethers.utils.formatBytes32String(PROPOSALS[0]));

      //   const proposals1 = await ballotContract.proposals(1);
      //   expect(proposals1.name).to.equal(
      //     ethers.utils.formatBytes32String(PROPOSALS[1])
      //   );
      //   const proposals2 = await ballotContract.proposals(2);
      //   expect(proposals2.name).to.equal(
      //     ethers.utils.formatBytes32String(PROPOSALS[2])
      //   );

      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i);
        expect(proposal.name).to.equal(
          ethers.utils.formatBytes32String(PROPOSALS[i])
        );
      }
    });

    it("has zero votes for all proposals", async () => {
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i);
        expect(proposal.voteCount).to.equal(0);
        //we had to check on the constructor function, and see that in the struct, there was another property called voteCount, and this should be 0.
      }
    });
    it("sets the deployer address as chairperson", async () => {
      const chairperson = await ballotContract.chairperson();
      const accounts = await ethers.getSigners();
      expect(chairperson).to.equal(accounts[0].address);
      //remember that by default, the owner of the contract will be always the first account listed on the acount list. so chairperson has to be equal to the address on the frist instance of the account list.
    });
    it("sets the voting weight for the chairperson as 1", async function () {
      // I still do not know what a mapping is, however we know that it will always give an answer to any request. Instead of a array, will give an error if it is out of scope.. for example:
      //voter = await ballotContract.voter(3); since there is no more than 3 voters in PROPOSALS, then is going to trhow an error. but if we isntead use a mapping, then whatever we ask, will have an answer to it.

      //   since voter is a mapping, it need to have an array as an argument. in this case could be accounts[1].address.because this account has never interacted with this smart contract, an then we will see that it will still work. anyways, this test is talking about the chairperson, so we need to make sure that the voter we are talking about is the first account listed on the acount list.
      const accounts = await ethers.getSigners();
      const voter = await ballotContract.voters(accounts[0].address);
      //has to be with curly brackets because is a mapping.
      console.log({ voter });
      expect(voter.weight).to.equal(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
    it("gives right to vote for another address", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has voted", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has already voting rights", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when the voter interact with the vote function in the contract", function () {
    // TODO
    it("should register the vote", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the voter interact with the delegate function in the contract", function () {
    // TODO
    it("should transfer voting power", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the vote function in the contract", function () {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the delegate function in the contract", function () {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function before any votes are cast", function () {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function before any votes are cast", function () {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    // TODO
    it("should return the name of the winner proposal", async () => {
      throw Error("Not implemented");
    });
  });
});
