import { exit } from "process";
import { SetcodeMultisigWalletAbi } from "../build/factorySource";

async function main() {


    await locklift.deployments.load();
    const signer1 = await locklift.keystore.getSigner('1');
    const signer2 = await locklift.keystore.getSigner('2');

    const setcode = locklift.deployments.getContract<SetcodeMultisigWalletAbi>("setcode");

    const requests = await setcode.methods.getUpdateRequests().call();
    if (requests.updates.length !== 1 ) {
        console.log('requst count is: ',requests.updates.length,' expected 1' );
        return;
    }

    const updateId = requests.updates[0].id;
    console.log('update id: ', updateId);

    const updReq1 = await setcode.methods.confirmUpdate({
        updateId : updateId
    }).sendExternal({ publicKey : signer1!.publicKey});

    console.log('confirm tx1:', updReq1.transaction.id.hash);
    
    const updReq2 = await setcode.methods.confirmUpdate({
        updateId : updateId
    }).sendExternal({ publicKey : signer2!.publicKey});

    console.log('confirm tx2:', updReq2.transaction.id.hash);
}
      

  
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
  

