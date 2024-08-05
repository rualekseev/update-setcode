import * as dotenv from "dotenv";
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

import { EverscaleStandaloneClient, SimpleKeystore } from 'everscale-standalone-client/nodejs';


const setcodeCodehash = 'e2b60b6b602c10ced7ea8ede4bdf96342c97570a3798066f3fb50a4b2b27a208'
const updateSetcodeCodehash = 'ea5f076ec0a49db435eb74fbef888a2fe7d470787c14210d923f487394f53245'

const SetCodeAbi = {
	"ABI version": 2,
	"header": ["pubkey", "time", "expire"],
    "functions": [
		{
			"name": "submitUpdate",
			"inputs": [
				{"name":"codeHash","type":"uint256"},
				{"name":"owners","type":"uint256[]"},
				{"name":"reqConfirms","type":"uint8"}
			],
			"outputs": [
				{"name":"updateId","type":"uint64"}
			]
		},
        {
			"name": "getCustodians",
			"inputs": [
			],
			"outputs": [
				{"components":[{"name":"index","type":"uint8"},{"name":"pubkey","type":"uint256"}],"name":"custodians","type":"tuple[]"}
			]
		},
    ],
    "events": [],
  } as const;


async function myApp() {
    dotenv.config();

    const publicKey = process.env.PUB_KEY;
    const secretKey = process.env.PRV_KEY;
    const gqlUrl = process.env.GQL_URL;
    const address = process.env.SET_CODE_ADDRESS
    const newOwners = process.env.NEW_OWNERS?.split(' ');
    const newRegConfirm = Number(process.env.REG_CONFIRM) ?? 0;

    if (newRegConfirm < 1 || newRegConfirm > 32){
        throw new Error("Env var `newRegConfirm` must be more 0 and less 33")
    }
    if (typeof newOwners === 'undefined') {
        throw new Error("Env var `NEW_OWNERS` is not defined")
    }    
    if (newOwners.length < newRegConfirm) {
        throw new Error("Env var `NEW_OWNERS` must be leass that newRegConfirm")
    }
    if (typeof publicKey === 'undefined') {
        throw new Error("Env var `PUB_KEY` is not defined")
    }
    if (typeof secretKey === 'undefined') {
        throw new Error("Env var `PRV_KEY` is not defined")
    }
    if (typeof gqlUrl === 'undefined') {
        throw new Error("Env var `GQL_URL` is not defined")
    }    
    if (typeof address === 'undefined') {
        throw new Error("Env var `SET_CODE_ADDRESS` is not defined")
    }

    const keystore = new SimpleKeystore({
        0: {
          publicKey: publicKey,
          secretKey: secretKey,
        },
      });

    const everClient = new ProviderRpcClient({
    fallback: () =>
        EverscaleStandaloneClient.create({
        connection: {
            id: 42,
            type: 'graphql',
            data: {
            // create your own project at https://dashboard.evercloud.dev
            endpoints: [gqlUrl],
            },
        },
        keystore: keystore,
        }),
        forceUseFallback: true,
    });

    const setcodeAddress = new Address(address);

    const walletState = await everClient.getFullContractState({ address: setcodeAddress });

    if (walletState.state?.codeHash !== setcodeCodehash){
        throw new Error("Unknown type of smart contract");
    }

    const setcodeContract = new everClient.Contract(SetCodeAbi, setcodeAddress);

    const owners = await setcodeContract.methods.getCustodians().call();
    let youAreOwner = false;
    const yorKeyAsDec = Number(`0x${publicKey}`);
    owners.custodians.forEach(function (value) {
        const key = value.pubkey;
        if (youAreOwner === false && +key === yorKeyAsDec) {
            console.log('your index:', value.index);
            youAreOwner = true;
        }
    });
    if (youAreOwner === false) {
        throw new Error("You aren't owner");
    };

    console.log('Send update request');

    const tx = await  setcodeContract.methods.submitUpdate({
        codeHash: `0x${setcodeCodehash}`,
        reqConfirms: newRegConfirm,
        owners: newOwners.map(item => `0x${item}`)
    }).sendExternal({
        publicKey : publicKey
    });

    console.log('tx: ', tx.transaction.id.hash); 
}



myApp().catch(console.error);