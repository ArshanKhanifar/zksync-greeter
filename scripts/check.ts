import { artifacts } from "hardhat";
import { Contract } from "ethers";
import { Provider, Wallet } from "zksync-web3";
import * as dotenv from "dotenv";
import { TransactionResponse } from "zksync-web3/build/src/types";

// An example of a deploy script that will deploy and call a simple contract.
const main = async () => {
  dotenv.config();
  const address = "0xFe80Ac89a090Fc788A589412BAd755796732fD04";
  const artifact = await artifacts.readArtifact("Greeter");
  const { abi } = artifact;

  const syncProvider = new Provider("https://zksync2-testnet.zksync.dev");

  const contract = new Contract(address, abi, syncProvider);

  const wallet = new Wallet(process.env.PRIVATE_KEY, syncProvider);

  const writeContract = contract.connect(wallet);

  console.log("changing the greeting");
  const tx: TransactionResponse = await writeContract.setGreeting("Henlo");
  console.log("waiting for finalization", tx);
  await tx.waitFinalize();
  console.log("finalized");
  const result = await contract.greet();
  console.log(`result of calling: ${result}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
