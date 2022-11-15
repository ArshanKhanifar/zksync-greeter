import { Wallet, Provider, utils } from "zksync-web3";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  dotenv.config();

  console.log(`Running deploy script for the Greeter contract`);

  // Initialize the wallet.
  const provider = new Provider(hre.userConfig.zkSyncDeploy?.zkSyncNetwork);

  const wallet = new Wallet(process.env.PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Greeter");

  // Estimate contract deployment fee
  const greeting = "Hi there!";
  console.log("estimating deployment fee");
  const deploymentFee = await deployer.estimateDeployFee(artifact, [greeting]);
  console.log("deploymentFee", deploymentFee.toString());

  // skip depositing funds from L1 -> L2
  const SKIP_DEPOSIT_TO_L2 = true;

  if (!SKIP_DEPOSIT_TO_L2) {
    // Deposit funds to L2
    console.log("depositing funds to L2");
    const depositHandle = await deployer.zkWallet.deposit({
      to: deployer.zkWallet.address,
      token: utils.ETH_ADDRESS,
      amount: deploymentFee.mul(2),
    });
    // Wait until the deposit is processed on zkSync
    console.log("waiting for deposit to complete");
    await depositHandle.wait();
    console.log("waiting for deposit handle");
  }

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const greeterContract = await deployer.deploy(artifact, [greeting]);

  //obtain the Constructor Arguments
  console.log(
    "constructor args:" + greeterContract.interface.encodeDeploy([greeting])
  );

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
