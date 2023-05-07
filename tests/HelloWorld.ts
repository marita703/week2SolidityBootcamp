// this is just a file that is going to run some tests, made in typescript.

import { expect } from "chai";
// import chai library to run tests.
import { ethers } from "hardhat";

// we need to import from hardhat, because if we import from ethers then some functionality will be missing.

import { HelloWorld } from "../typechain-types";

//this is a library that create static variables typechain

console.log("Hello World!");

// to run the test we run the following: yarn hardhat test ./tests/HelloWorld.ts
// a test file is a script file. Do not be afraid of it.

function main() {
  console.log("Hello World!");
  let a = 1;
  console.log(++a);
  console.log(++a);
  console.log(++a);
}

main();

// to write a test, we need to use the function describe:

describe("test", main); // when I run this test, it will do the same as I just did before.

// since I do not need the main function anymore, then I can just create an anonymous function and put the content of main in it.

describe("test2", () => {
  console.log("Hello World!");
  let a = 1;
  console.log(++a);
  console.log(++a);
  console.log(++a);
});

// Now I want to start testing my contract HelloWorld.sol inside of the annonymous function I will put the different test, but every tests should be inside of the describe function. this is just for organizational purposes.

describe("test3", () => {
  // it will organize the code.

  //   This line is added from class 7"
  let helloWorldContract: HelloWorld;

  beforeEach(async () => {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    await helloWorldContract.deployed();

    //so we do not have to repeat this code in each test.
  });

  it("Should give a Hello World", async () => {
    // throw new Error("This is an error message"); if I do this, then it will throw an error.
    expect(true).to.equal(true); // this is a tests that is true... and passes when i run the tests.
    const accounts = await ethers.getSigners();
    // getSignners is a promisse function. so we need to use an async function.
    expect(accounts.length).to.be.gt(0);
    //expect that the length of accounts is greater than 0.
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    //this creates a HelloWorld contract. inside of a factory. after this we need to deploy the contract.
    const helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    // Helloworld is a static variable imported from typechain
    // this will deploy the contract.
    await helloWorldContract.deployed();
    //it is always good to wait for the contract to be deployed. this is to make sure that the contract was included in the block befor continueing. it works without this in the hardhat enviroment, but is not going to work if we connect it to the main net.
    const text = await helloWorldContract.helloWorld();
    expect(text).to.equal("Hello World!");
    //this will check if the result of the contract hello world is actually "Hello World!"... but in the contract originally was only 'hello world' without the "!".. so I can go to the contract and change it. MAKE SURE TO COMPILE BEFORE RUNNING THIS TEST.
  });

  it("Should set owner to deployer account", async function () {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    await helloWorldContract.deployed();
    const owner = await helloWorldContract.owner();
    const accounts = await ethers.getSigners();
    expect(owner).to.equal(accounts[0].address);
    //when we get the owner of the contract, it will be always the owner of the first account.
    //however we can connect it to another account if we want in the future.
  });

  it("Should not allow anyone other than owner to call transferOwnership", async function () {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    await helloWorldContract.deployed();
    const accounts = await ethers.getSigners();
    await expect(
      helloWorldContract.transferOwnership(accounts[1].address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should execute transferOwnership correctly", async function () {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    await helloWorldContract.deployed();
    const accounts = await ethers.getSigners();
    const owner = await helloWorldContract.owner();
    console.log(owner);
    console.log(accounts[0].address);
    // the owner of the contract will be the owner of the first account. and this is to be expected in this test.
    await helloWorldContract.transferOwnership(owner);
    //in this step, we transfer the ownership of the contract to another account.
    expect(await helloWorldContract.owner()).to.equal(accounts[0].address);
    //this will check if the result of the contract owner is actually the owner of the second account.
  });

  it("Should not allow anyone other than owner to change text", async function () {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    await helloWorldContract.deployed();
    const accounts = await ethers.getSigners();

    const text = await helloWorldContract.helloWorld();
    const initialText = "Hello World!";
    const newText = "Maria";

    expect(text).to.equal(initialText);

    await expect(
      helloWorldContract.changeText(newText, {
        from: accounts[1].address,
      })
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should change text correctly", async function () {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    await helloWorldContract.deployed();
    const accounts = await ethers.getSigners();

    const text = await helloWorldContract.helloWorld();
    const initialText = "Hello World!";
    const newText = "Maria";

    await helloWorldContract.changeText(newText, {
      from: accounts[0].address,
    });

    expect(await helloWorldContract.helloWorld()).to.equal(newText);
  });
});
