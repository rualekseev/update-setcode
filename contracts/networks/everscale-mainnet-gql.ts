import { ConfigState, NetworkValue } from "locklift";


const EVERSCALE_MAINNET_GQL_ENDPOINT = process.env.EVERSCALE_MAINNET_GQL_ENDPOINT || '';
const EVERSCALE_MAINNET_GIVER_ADDRESS = process.env.EVERSCALE_MAINNET_GIVER_ADDRESS || '0:0000000000000000000000000000000000000000000000000000000000000000';
const EVERSCALE_MAINNET_GIVER_PHRASE = process.env.EVERSCALE_MAINNET_GIVER_PHRASE || '';
const MAINNET_DEPLOYER_PHRASE = process.env.MAINNET_DEPLOYER_PHRASE || '';

export const ever_mainnet_gql_network: NetworkValue<ConfigState,"ever-mainnet-gql"> = {
    connection: {
        id: 42,
        type: 'graphql',
        data: {
          endpoints: [ EVERSCALE_MAINNET_GQL_ENDPOINT ],
        },
      },
      giver: {
        address: EVERSCALE_MAINNET_GIVER_ADDRESS,
        phrase: EVERSCALE_MAINNET_GIVER_PHRASE,
        accountId: 0,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        phrase: MAINNET_DEPLOYER_PHRASE,
        amount: 1000,
      },
};