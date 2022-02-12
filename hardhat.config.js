import "@nomiclabs/hardhat-waffle";
import { readFileSync } from "fs";
const privateKey = readFileSync(".secret").toString();
const projectId = "4e07640ef30f49a1811ffbae729f6ec3"

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/** 
 * @type import('hardhat/config').HardhatUserConfig
 */
export const networks = {
  hardhat: {
    chainId: 1337
  },
  mumbai: {
    url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
    accounts: [privateKey]
  },
  mainnet: {
    url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
    accounts: [privateKey]
  },
};
export const solidity = "0.8.4";
