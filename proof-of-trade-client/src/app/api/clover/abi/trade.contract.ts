import { ContractInterface } from "./contract.interface";

export let tradeContract: ContractInterface = {
    address: '0x067D5652A6AD7065A87BAA435385CA50895DAC2D',
    abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "yield",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256[2]",
                  "name": "pi_a",
                  "type": "uint256[2]"
                },
                {
                  "internalType": "uint256[2][2]",
                  "name": "pi_b",
                  "type": "uint256[2][2]"
                },
                {
                  "internalType": "uint256[2]",
                  "name": "pi_c",
                  "type": "uint256[2]"
                }
              ],
              "internalType": "struct TradeStorage.Proof",
              "name": "proof",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "balanceHash",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            }
          ],
          "name": "addPeriodProof",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newSinal",
              "type": "string"
            }
          ],
          "name": "addSignal",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "trader",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tradeId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tradeBlock",
              "type": "uint256"
            }
          ],
          "name": "changeTradeTime",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "trader",
              "type": "address"
            }
          ],
          "name": "getProofLen",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "trader",
              "type": "address"
            }
          ],
          "name": "getTradeLen",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTradersCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "names",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            }
          ],
          "name": "newTrader",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "periodProofs",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "yield",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256[2]",
                  "name": "pi_a",
                  "type": "uint256[2]"
                },
                {
                  "internalType": "uint256[2][2]",
                  "name": "pi_b",
                  "type": "uint256[2][2]"
                },
                {
                  "internalType": "uint256[2]",
                  "name": "pi_c",
                  "type": "uint256[2]"
                }
              ],
              "internalType": "struct TradeStorage.Proof",
              "name": "proof",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "newBalanceHash",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "signals",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "hash",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "traders",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
}