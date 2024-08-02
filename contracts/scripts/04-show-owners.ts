import { SetcodeMultisigWalletAbi } from "../build/factorySource";

async function main() {

    await locklift.deployments.load();
    const signer = await locklift.keystore.getSigner('0');
    const setcode = locklift.deployments.getContract<SetcodeMultisigWalletAbi>("setcode");

    const owners = await setcode.methods.getCustodians().call();
    console.log('owners: ',owners );

    const params = await setcode.methods.getParameters().call;
    console.log('params: ',params );
}
        
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
  

