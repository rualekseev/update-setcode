"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const everscale_inpage_provider_1 = require("everscale-inpage-provider");
const nodejs_1 = require("everscale-standalone-client/nodejs");
const setcodeCodehash = 'e2b60b6b602c10ced7ea8ede4bdf96342c97570a3798066f3fb50a4b2b27a208';
const SetCodeAbi = {
    "ABI version": 2,
    "header": ["pubkey", "time", "expire"],
    "functions": [
        {
            "name": "getUpdateRequests",
            "inputs": [],
            "outputs": [
                { "components": [{ "name": "id", "type": "uint64" }, { "name": "index", "type": "uint8" }, { "name": "signs", "type": "uint8" }, { "name": "confirmationsMask", "type": "uint32" }, { "name": "creator", "type": "uint256" }, { "name": "codeHash", "type": "uint256" }, { "name": "custodians", "type": "uint256[]" }, { "name": "reqConfirms", "type": "uint8" }], "name": "updates", "type": "tuple[]" }
            ]
        },
        {
            "name": "getParameters",
            "inputs": [],
            "outputs": [
                { "name": "maxQueuedTransactions", "type": "uint8" },
                { "name": "maxCustodianCount", "type": "uint8" },
                { "name": "expirationTime", "type": "uint64" },
                { "name": "minValue", "type": "uint128" },
                { "name": "requiredTxnConfirms", "type": "uint8" },
                { "name": "requiredUpdConfirms", "type": "uint8" }
            ]
        },
    ],
    "events": [],
};
function myApp() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        dotenv.config();
        const gqlUrl = process.env.GQL_URL;
        const address = process.env.SET_CODE_ADDRESS;
        if (typeof gqlUrl === 'undefined') {
            throw new Error("Env var `GQL_URL` is not defined");
        }
        if (typeof address === 'undefined') {
            throw new Error("Env var `SET_CODE_ADDRESS` is not defined");
        }
        const everClient = new everscale_inpage_provider_1.ProviderRpcClient({
            fallback: () => nodejs_1.EverscaleStandaloneClient.create({
                connection: {
                    id: 42,
                    type: 'graphql',
                    data: {
                        // create your own project at https://dashboard.evercloud.dev
                        endpoints: [gqlUrl],
                    },
                }
            }),
            forceUseFallback: true,
        });
        const setcodeAddress = new everscale_inpage_provider_1.Address(address);
        const walletState = yield everClient.getFullContractState({ address: setcodeAddress });
        if (((_a = walletState.state) === null || _a === void 0 ? void 0 : _a.codeHash) !== setcodeCodehash) {
            throw new Error("Unknown type of smart contract");
        }
        const setcodeContract = new everClient.Contract(SetCodeAbi, setcodeAddress);
        const { requiredUpdConfirms } = yield setcodeContract.methods.getParameters().call();
        const requests = yield setcodeContract.methods.getUpdateRequests().call();
        requests.updates.forEach(function (value) {
            console.log('request: ', value.id);
            console.log('   creator: ', BigInt(value.creator).toString(16));
            console.log('   reqConfirms: ', value.reqConfirms);
            console.log('   new custodians: ', value.custodians.map(item => BigInt(item).toString(16)));
            console.log('   signs: ', `${value.signs}/${requiredUpdConfirms}`);
        });
    });
}
myApp().catch(console.error);
