export default async () => {
  const signer1 = await locklift.keystore.getSigner('0');
  const signer2 = await locklift.keystore.getSigner('1');
  const signer3 = await locklift.keystore.getSigner('2');
  const signer4 = await locklift.keystore.getSigner('3');
  const signer5 = await locklift.keystore.getSigner('4');


  const setcode = await locklift.deployments.deploy({
    deployConfig: {
        contract: "SetcodeMultisigWallet",
        publicKey: signer1!.publicKey,
        constructorParams: { owners: [`0x${signer1!.publicKey}`, `0x${signer2!.publicKey}`, `0x${signer3!.publicKey}`,`0x${signer4!.publicKey}`, `0x${signer5!.publicKey}`], reqConfirms: 3 },
        value: locklift.utils.toNano(2)
    },
    deploymentName: "setcode",// user-defined custom name
    },
    true // enable logs
  );

  console.log(`setcode address: ${setcode.contract.address.toString()}`)

};

export const tag = "setcode";