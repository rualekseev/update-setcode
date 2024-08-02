import { exit } from "process";
import { SetcodeMultisigWalletAbi } from "../build/factorySource";

const update_setcode_code = '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'


async function main() {


    await locklift.deployments.load();
    const signer = await locklift.keystore.getSigner('0');
    const setcode = locklift.deployments.getContract<SetcodeMultisigWalletAbi>("setcode");

    const requests = await setcode.methods.getUpdateRequests().call();
    if (requests.updates.length !== 1 ) {
        console.log('requst count is: ',requests.updates.length,' expected 1' );
        return;
    }

    const updateId = requests.updates[0].id;
    const mask = requests.updates[0].confirmationsMask;
    const index = requests.updates[0].index;

    console.log(requests);

    const isConfirmed =  await setcode.methods.isConfirmed({mask:mask, index: index}).call();
    console.log('updateId: ',updateId, ' confirmed: ', isConfirmed.confirmed);

    if (isConfirmed.confirmed === false ) {
        return;
    }

    const updReq = await setcode.methods.executeUpdate({
        updateId : updateId,
        code : update_setcode_code
    }).sendExternal({ publicKey : signer!.publicKey});

    console.log('execute tx1:', updReq.transaction.id.hash);
}
        
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
  

