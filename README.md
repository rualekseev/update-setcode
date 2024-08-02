# Update existing contract

1. create .env file and fill it
```
cp .env.template .env
```

2. install 
```
npm -ci
```

3. send update request:
```
node 01-update-requst.js
```

4. check status:
```
node 02-get-status.js
```
Wait until  signs fill


5. update contract
```
node 03-execute-update.js
```

# Deploy old setcode and test it.

1. go to contracts folder:
```
cd contracts
```

2. install
```
npm ci
```

2. create .env file and fill it
```
cp .env.template .env
```

**!!Important** MAINNET_DEPLOYER_PHRASE will be use for 5 owners generation

3. deploy
```
npx locklift deploy -n ever_mainnet_gql
```

4. use setcode address for update scripts and run 01-submitUpdate-owners.js

5. sign by owner2 and owner 3
```
npx locklift run  -n ever_mainnet_gql -s scripts/02-confirm-update.ts
```


