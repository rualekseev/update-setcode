import { SetcodeMultisigWalletAbi } from "../build/factorySource";

const update_setcode_codehash = 'ea5f076ec0a49db435eb74fbef888a2fe7d470787c14210d923f487394f53245'

async function main() {

    await locklift.deployments.load();
    const signer = await locklift.keystore.getSigner('0');

    const setcode = locklift.deployments.getContract<SetcodeMultisigWalletAbi>("setcode");

    const setcodedMsg = await setcode.methods.submitUpdate({
      codeHash: `0x${update_setcode_codehash}`,
      owners: [`0x${signer?.publicKey}`],
      reqConfirms: 1 }).sendExternal({
        publicKey : signer!.publicKey });

    console.log("tx id:", setcodedMsg.transaction.id.hash);

    const requests = await setcode.methods.getUpdateRequests().call();
    console.log("all requests", requests);
}
      

  
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
  

