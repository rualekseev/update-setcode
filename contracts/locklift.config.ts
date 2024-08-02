import { lockliftChai, LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
import * as dotenv from "dotenv";
import chai from "chai";
import "@broxus/locklift-deploy";
import { Deployments } from "@broxus/locklift-deploy";

dotenv.config();

import { ever_mainnet_gql_network } from "./networks/everscale-mainnet-gql";


chai.use(lockliftChai);

declare module "locklift" {
  //@ts-ignore
  export interface Locklift {
      deployments: Deployments<FactorySource>;
  }
}

declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const config: LockliftConfig = {
  compiler: {
    // Specify path to your TON-Solidity-Compiler
    // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",
    // Or specify version of compiler
    version: "0.70.0",

    // Specify config for extarnal contracts as in exapmple
    // externalContractsArtifacts: {
    //   "node_modules/broxus-ton-tokens-contracts/build": ['TokenRoot', 'TokenWallet']
    // }
    // Specify config for extarnal contracts as in exapmple
    externalContractsArtifacts: {
      "externalContracts": ['SetcodeMultisigWallet', 'UpdateMultisig', 'SetcodeMultisig'],
    }
  },
  linker: {
    // specify version of linker
    version: "0.17.0",
  },
  networks: { 
    ever_mainnet_gql: ever_mainnet_gql_network,
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
