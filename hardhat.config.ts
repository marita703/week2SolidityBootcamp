import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// this takes the hardhat enviroment and it is able to use ethers libraries and follow the documenation.
// normally this task appears in red, to fix the issue, you can just import task from hardhat/config.
// we can test this out by running "yarn hardhat accounts" in the terminal. this will show me an array of accounts.
// Those are prefounded accounts that we could use in remix from last week.
// when we use get balance, then we see the balance of each account.
// HRE hardhat runtime enviroment.
//Ethers is a library

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//     console.log(account.getAddress());
//     console.log(await account.getBalance());
//   }
// });
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: { tests: "tests" },
};

export default config;
