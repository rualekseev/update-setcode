import * as dotenv from "dotenv";
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

import { EverscaleStandaloneClient } from 'everscale-standalone-client/nodejs';

const setcodeCodehash = 'e2b60b6b602c10ced7ea8ede4bdf96342c97570a3798066f3fb50a4b2b27a208'

const SetCodeAbi = {
	"ABI version": 2,
	"header": ["pubkey", "time", "expire"],
    "functions": [
        {
			"name": "getUpdateRequests",
			"inputs": [
			],
			"outputs": [
				{"components":[{"name":"id","type":"uint64"},{"name":"index","type":"uint8"},{"name":"signs","type":"uint8"},{"name":"confirmationsMask","type":"uint32"},{"name":"creator","type":"uint256"},{"name":"codeHash","type":"uint256"},{"name":"custodians","type":"uint256[]"},{"name":"reqConfirms","type":"uint8"}],"name":"updates","type":"tuple[]"}
			]
		},
        {
			"name": "getParameters",
			"inputs": [
			],
			"outputs": [
				{"name":"maxQueuedTransactions","type":"uint8"},
				{"name":"maxCustodianCount","type":"uint8"},
				{"name":"expirationTime","type":"uint64"},
				{"name":"minValue","type":"uint128"},
				{"name":"requiredTxnConfirms","type":"uint8"},
				{"name":"requiredUpdConfirms","type":"uint8"}
			]
		},
    ],
    "events": [],
  } as const;


async function myApp() {
    dotenv.config();

    const gqlUrl = process.env.GQL_URL;
    const address = process.env.SET_CODE_ADDRESS

    if (typeof gqlUrl === 'undefined') {
        throw new Error("Env var `GQL_URL` is not defined")
    }    
    if (typeof address === 'undefined') {
        throw new Error("Env var `SET_CODE_ADDRESS` is not defined")
    }

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
        }}),
        forceUseFallback: true,
    });

    const setcodeAddress = new Address(address);

    const walletState = await everClient.getFullContractState({ address: setcodeAddress });

    if (walletState.state?.codeHash !== setcodeCodehash){
        throw new Error("Unknown type of smart contract");
    }

    const setcodeContract = new everClient.Contract(SetCodeAbi, setcodeAddress);


    const { requiredUpdConfirms } = await setcodeContract.methods.getParameters().call();

    const requests = await setcodeContract.methods.getUpdateRequests().call();

    requests.updates.forEach(function (value) {
        console.log('request: ', value.id);
        console.log('   creator: ', BigInt(value.creator).toString(16));
        console.log('   reqConfirms: ', value.reqConfirms);
        console.log('   new custodians: ', value.custodians.map(item=>BigInt(item).toString(16)));
        console.log('   signs: ', `${value.signs}/${requiredUpdConfirms}`);
    }); 
}



myApp().catch(console.error);