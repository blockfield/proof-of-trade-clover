import { Injectable } from "@angular/core";
import * as bs58 from "bs58";
import Web3 from "web3";
import * as LikeLib from "likelib";
import { PeriodProofResponseInterface, SignalResponseInterface, SmartContractInterface, TraderResponseInterface, WitnessProofRequestInterface } from "src/app/modules/shared/interfaces/smart-contract.interface";
import { WalletService } from "src/app/modules/shared/services/wallet.service";
import { tradeContract } from "./abi/trade.contract";

@Injectable({
    providedIn: 'root'
})
export class Contract implements SmartContractInterface {
    private contractAddress: string = '6F9GsmMe9MWyBaRaEG7bsMUBn3e'

    private web3: Web3

    private publicKey: string
    private publicKeyBase58: string
    private lk: LikeLib
    private account: LikeLib.Account
    private contract: LikeLib.Contract

    constructor(
        walletService: WalletService
    ) {
        if (this.publicKey) {
            return
        }

        walletService.address$.subscribe((privateKey: string) => {
            if (!privateKey) {
                return
            }

            this.web3 = new Web3((window as any).ethereum)

            this.account = new LikeLib.Account(privateKey)
            
            this.publicKey = bs58.decode(this.account.getAddress()).toString('hex')
            this.publicKeyBase58 = this.account.getAddress()

            console.log('private public public58', privateKey, this.publicKey, this.publicKeyBase58)

            this.lk = new LikeLib("ws://localhost:50051")
            this.contract = LikeLib.Contract.deployed(this.lk, this.account, tradeContract.abi, this.contractAddress)
            this.contract._setupMethods(tradeContract.abi)
        })
    }

    async newTrader(email: string): Promise<void> {
        console.log('newTrader')
        return new Promise((resolve, reject) => {
            this.contract.newTrader(email, 0, 500000, function(err, info, hash) {
                console.log('newTrader result:', err, info, hash)
                if (err) {
                    reject(err)
                }

                resolve()
            })
        })
    }

    async addSignal(hash: string): Promise<void> {
        console.log('addSignal')
        return new Promise((resolve, reject) => {
            this.contract.addSignal(hash, 0, 500000, function(err, info, hash) {
                console.log('addSignal result:', err, info, hash)
                if (err) {
                    reject(err)
                }

                resolve()
            })
        })
    }

    async getTradeLen(): Promise<number> {
        console.log('getTradeLen')

        const publicKey = bs58.decode(this.account.getAddress()).toString('hex')

        return new Promise((resolve) => {
            this.contract.getTradeLen('0x' + publicKey, 0, 500000, function(err, result, hash) {
                console.log('getTradeLen result:', err, result, hash)

                if (err || !result[0]) {
                    resolve(0)
                    return
                }

                resolve(+result[0])
            })
        })
    }

    async internalGetSignal(address: string, index: number): Promise<SignalResponseInterface> {
        console.log('internalGetSignal')

        return new Promise((resolve) => {
            this.contract.signals(address, index, 0, 500000, function(err, result, hash) {
                console.log('signals internal result:', err, result, hash)

                if (err || !result['blockNumber'] || !result['hash']) {
                    resolve({
                        blockNumber: BigInt(1),
                        hash: '',
                        price: BigInt(index%2 === 0 ? 66560000000000 : 66590000000000)
                    })
                    return
                }

                resolve({
                    blockNumber: BigInt(result.blockNumber),
                    hash: result.hash,
                    price: BigInt(index%2 === 0 ? 66560000000000 : 66590000000000)
                })
            })
        })
    }

    async getSignal(address: string, index: number): Promise<SignalResponseInterface> {
        console.log('getSignal')

        const account = new LikeLib.Account(address)
        const publicKey = bs58.decode(account.getAddress()).toString('hex')

        return new Promise((resolve) => {
            this.contract.signals('0x' + publicKey, index, 0, 500000, function(err, result, hash) {
                console.log('signals result:', err, result, hash)

                if (err || !result['blockNumber'] || !result['hash']) {
                    resolve({
                        blockNumber: null,
                        hash: '',
                        price: BigInt(index%2 === 0 ? 66560000000000 : 66590000000000)
                    })
                    return
                }

                resolve({
                    blockNumber: BigInt(result.blockNumber),
                    hash: result.hash,
                    price: BigInt(index%2 === 0 ? 66560000000000 : 66590000000000)
                })
            })
        })
    }

    async internalGetProofLen(address: string): Promise<number> {
        console.log('internalGetProofLen', address)

        return new Promise((resolve) => {
            this.contract.getProofLen(address, 0, 500000, function(err, result, hash) {
                console.log('internalGetProofLen result:', err, result, hash)

                if (err || !result) {
                    resolve(0)
                    return
                }

                resolve(+result[0])
            })
        })
    }

    async getProofLen(address: string): Promise<number> {
        console.log('getProofLen', address)

        const account = new LikeLib.Account(address)
        const publicKey = bs58.decode(account.getAddress()).toString('hex')

        return new Promise((resolve) => {
            this.contract.getProofLen('0x' + publicKey, 0, 500000, function(err, result, hash) {
                console.log('getProofLen result:', err, result, hash)

                if (err || !result) {
                    resolve(0)
                    return
                }

                resolve(+result[0])
            })
        })
    }

    async getPrevBalanceHash(address: string, index: number): Promise<string> {
        console.log('getPrevBalanceHash', address, index)

        const account = new LikeLib.Account(address)
        const publicKey = bs58.decode(account.getAddress()).toString('hex')

        return new Promise((resolve) => {
            this.contract.periodProofs('0x' + publicKey, index, 0, 500000, function(err, result, hash) {
                console.log('getPrevBalanceHash result:', err, result, hash)

                if (err || !result) {
                    resolve('')
                    return
                }

                resolve(result.newBalanceHash)
            })
        })
    }

    async addPeriodProof(witnessProof: WitnessProofRequestInterface, prices: bigint[]): Promise<void> {
        console.log('addPeriodProof', witnessProof, prices)

        const currentBlock = 10

        let proof = {
            pi_a: witnessProof.pi_a.slice(0, 2),
            pi_b: [witnessProof.pi_b[0].slice(0, 2), witnessProof.pi_b[1].slice(0, 2)],
            pi_c: witnessProof.pi_c.slice(0, 2)
        };

        return new Promise((resolve, reject) => {
            this.contract.addPeriodProof(witnessProof.publicSignals[1], proof, witnessProof.publicSignals[0], currentBlock, 0, 500000, function(err, result, hash) {
                console.log('addPeriodProof result:', err, result, hash)

                if (err || !result) {
                    reject()
                    return
                }

                resolve()
            })
        })
    }

    async getTradersCount(): Promise<number> {
        console.log('getTradersCount')

        const publicKey = bs58.decode(this.account.getAddress()).toString('hex')

        return new Promise((resolve) => {
            this.contract.getTradersCount(0, 500000, function(err, result, hash) {
                console.log('getTradersCount result:', err, result, hash)

                if (err || !result) {
                    resolve(0)
                    return
                }

                resolve(+result[0])
            })
        })
    }

    async getTrader(index: number|null): Promise<TraderResponseInterface> {
        console.log('traders', index)
        const address: string = await new Promise((resolve) => {
            this.contract.traders(index, 0, 500000, async function(err, result, hash) {
                console.log('traders result:', err, result, hash)

                if (err || !result[0]) {
                    resolve(null)
                    return
                }

                resolve(result[0])
            })
        })

        return {
            address: address,
            email: await this.internalGetEmail(address),
            signalsCount: 0,
            proofsCount: await this.internalGetProofLen(address),
            creationBlockNumber: BigInt(10),
        }
    }

    private async internalGetEmail(address: string): Promise<string> {
        console.log('internalGetEmail')

        return new Promise((resolve) => {
            this.contract.names(address, 0, 500000, function(err, result, hash) {
                console.log('names result:', err, result, hash)

                if (err || !result[0]) {
                    resolve('')
                    return
                }

                resolve(result[0])
            })
        })
    }

    async getEmail(address: string): Promise<string> {
        console.log('getEmail')

        const account = new LikeLib.Account(address)
        const publicKey = bs58.decode(account.getAddress()).toString('hex')

        return new Promise((resolve) => {
            this.contract.names('0x' + publicKey, 0, 500000, function(err, result, hash) {
                console.log('names result:', err, result, hash)

                if (err || !result[0]) {
                    resolve('')
                    return
                }

                resolve(result[0])
            })
        })
    }

    async internalGetPeriodProofs(address: string, index: number): Promise<PeriodProofResponseInterface> {
        console.log('getPeriodProofs', address, index)

        return new Promise((resolve) => {
            this.contract.periodProofs(address, index, 0, 500000, function(err, result, hash) {
                console.log('getPeriodProofs result:', err, result, hash)

                if (err || !result) {
                    resolve(null)
                    return
                }

                resolve({
                    y: +result.yield,
                    newBalanceHash: result.newBalanceHash,
                    blockNumber: BigInt(result.blockNumber),
                    proof: result.proof,
                    prices: [BigInt(66590000000000)]
                })
            })
        })
    }

    async getPeriodProofs(address: string, index: number): Promise<PeriodProofResponseInterface> {
        console.log('getPeriodProofs', address, index)

        const account = new LikeLib.Account(address)
        const publicKey = bs58.decode(account.getAddress()).toString('hex')

        return new Promise((resolve) => {
            this.contract.periodProofs('0x' + publicKey, index, 0, 500000, function(err, result, hash) {
                console.log('getPeriodProofs result:', err, result, hash)

                if (err || !result) {
                    resolve(null)
                    return
                }

                resolve({
                    y: +result.yield,
                    newBalanceHash: result.newBalanceHash,
                    blockNumber: BigInt(result.blockNumber),
                    proof: result.proof,
                    prices: [BigInt(66590000000000)]
                })
            })
        })
    }

    async getTimestampByBlockNumber(blockNumber: bigint): Promise<number> {
        console.log('getTimestampByBlockNumber')

        console.log('getTimestampByBlockNumber result', 1636326046 - Number(blockNumber)/10)

        return 1636326046 - Number(blockNumber)/10
    }
}