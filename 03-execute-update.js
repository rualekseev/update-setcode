"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var everscale_inpage_provider_1 = require("everscale-inpage-provider");
var nodejs_1 = require("everscale-standalone-client/nodejs");
var setcodeCodehash = 'e2b60b6b602c10ced7ea8ede4bdf96342c97570a3798066f3fb50a4b2b27a208';
var update_setcode_code = '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';
var setcode_code = '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';
var SetCodeAbi = {
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
        {
            "name": "executeUpdate",
            "inputs": [
                { "name": "updateId", "type": "uint64" },
                { "name": "code", "type": "cell" }
            ],
            "outputs": []
        },
    ],
    "events": [],
};
function myApp() {
    return __awaiter(this, void 0, void 0, function () {
        var publicKey, secretKey, gqlUrl, address, keystore, everClient, setcodeAddress, walletState, setcodeContract, requiredUpdConfirms, requests, updateRequset, tx;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dotenv.config();
                    publicKey = process.env.PUB_KEY;
                    secretKey = process.env.PRV_KEY;
                    gqlUrl = process.env.GQL_URL;
                    address = process.env.SET_CODE_ADDRESS;
                    if (typeof gqlUrl === 'undefined') {
                        throw new Error("Env var `GQL_URL` is not defined");
                    }
                    if (typeof address === 'undefined') {
                        throw new Error("Env var `SET_CODE_ADDRESS` is not defined");
                    }
                    if (typeof publicKey === 'undefined') {
                        throw new Error("Env var `PUB_KEY` is not defined");
                    }
                    if (typeof secretKey === 'undefined') {
                        throw new Error("Env var `PRV_KEY` is not defined");
                    }
                    keystore = new nodejs_1.SimpleKeystore({
                        0: {
                            publicKey: publicKey,
                            secretKey: secretKey,
                        },
                    });
                    everClient = new everscale_inpage_provider_1.ProviderRpcClient({
                        fallback: function () {
                            return nodejs_1.EverscaleStandaloneClient.create({
                                connection: {
                                    id: 42,
                                    type: 'graphql',
                                    data: {
                                        // create your own project at https://dashboard.evercloud.dev
                                        endpoints: [gqlUrl],
                                    },
                                },
                                keystore: keystore,
                            });
                        },
                        forceUseFallback: true,
                    });
                    setcodeAddress = new everscale_inpage_provider_1.Address(address);
                    return [4 /*yield*/, everClient.getFullContractState({ address: setcodeAddress })];
                case 1:
                    walletState = _b.sent();
                    if (((_a = walletState.state) === null || _a === void 0 ? void 0 : _a.codeHash) !== setcodeCodehash) {
                        throw new Error("Unknown type of smart contract");
                    }
                    setcodeContract = new everClient.Contract(SetCodeAbi, setcodeAddress);
                    return [4 /*yield*/, setcodeContract.methods.getParameters().call()];
                case 2:
                    requiredUpdConfirms = (_b.sent()).requiredUpdConfirms;
                    return [4 /*yield*/, setcodeContract.methods.getUpdateRequests().call()];
                case 3:
                    requests = _b.sent();
                    if (requests.updates.length !== 1) {
                        throw new Error("too many update requested");
                    }
                    updateRequset = requests.updates[0];
                    if (updateRequset.signs !== requiredUpdConfirms) {
                        throw new Error("not enough signatures");
                    }
                    return [4 /*yield*/, setcodeContract.methods.executeUpdate({
                            updateId: updateRequset.id,
                            code: setcode_code
                        }).sendExternal({
                            publicKey: publicKey
                        })];
                case 4:
                    tx = _b.sent();
                    console.log('tx: ', tx.transaction.id.hash);
                    return [2 /*return*/];
            }
        });
    });
}
myApp().catch(console.error);
