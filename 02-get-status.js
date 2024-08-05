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
    ],
    "events": [],
};
function myApp() {
    return __awaiter(this, void 0, void 0, function () {
        var gqlUrl, address, everClient, setcodeAddress, walletState, setcodeContract, requiredUpdConfirms, requests;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dotenv.config();
                    gqlUrl = process.env.GQL_URL;
                    address = process.env.SET_CODE_ADDRESS;
                    if (typeof gqlUrl === 'undefined') {
                        throw new Error("Env var `GQL_URL` is not defined");
                    }
                    if (typeof address === 'undefined') {
                        throw new Error("Env var `SET_CODE_ADDRESS` is not defined");
                    }
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
                                }
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
                    requests.updates.forEach(function (value) {
                        console.log('request: ', value.id);
                        console.log('   creator: ', BigInt(value.creator).toString(16));
                        console.log('   reqConfirms: ', value.reqConfirms);
                        console.log('   new custodians: ', value.custodians.map(function (item) { return BigInt(item).toString(16); }));
                        console.log('   signs: ', "".concat(value.signs, "/").concat(requiredUpdConfirms));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
myApp().catch(console.error);
