
# Setup
```
yarn 
```
### Compile
```
yarn hardhat compile
```

### Deploy
```
yarn hardhat deploy-zksync
```


# Logs
here's the result of the first run:
```
yarn hardhat deploy-zksync
yarn run v1.22.17
$ /Users/arshankhanifar/zksync/greeter-example/node_modules/.bin/hardhat deploy-zksync
`optimizer` setting is deprecated, optimizer is always enabled
Running deploy script for the Greeter contract
(node:29057) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
estimating deployment fee
deploymentFee 1081963700000000
The deployment is estimated to cost 0.0010819637 ETH
constructor args:0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869207468657265210000000000000000000000000000000000000000000000
Greeter was deployed to 0xFe80Ac89a090Fc788A589412BAd755796732fD04
✨  Done in 4.90s.
```
but I basically had to skip the L1 -> L2 bridging part. Idk why they had it in their tutorial?


### Interacting with the contract 
The `scripts/check.ts` script will interact with the contract. 

Run it with 

```
yarn hardhat run scripts/check.ts
```

after running it it gave me this hash:

```0x55b2f6e142e05669921075960226e26b082e7ab588a5c497dcbab5189f79930f```

Which is [here](https://goerli.explorer.zksync.io/tx/0x55b2f6e142e05669921075960226e26b082e7ab588a5c497dcbab5189f79930f#overview) 
on their explorer.

Not gonna lie this is taking a while 🥵.

Ok so here was the output: 
```
finalized
result of calling: Henlo
✨  Done in 293.20s.
```

Nice, so greeting changed from whatever it was to henlo. Henlo 👋

