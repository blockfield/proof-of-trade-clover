# Smart Contracts

## Install dependencies
```
    npm install
```

## Compile
```
    npx hardhat compile
```

## Deploy to Clover
1. run container with Clover node
2. docker exec -it clover-node bash
3. mkdir git
4. cd git
5. git clone https://github.com/blockfield/proof-of-trade-clover
6. cd ..
7.  ./client
8. connect 127.0.0.1:50051
9. add_wallet base git/proof-of-trade-clover/base_key
10. compile git/proof-of-trade-clover/contract/contracts/tradeStorage.sol
11. encode TradeStorage "constructor()"
608…033 (long hex -  copy/paste)
12. push_contract base 1000000 0.0 TradeStorage 608…033 
Received data: {"action_type":3,"fee_left":"998866","message”:”address will be here”,”status_code":0}