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
    private contractAddress: string = ''

    private web3: Web3

    private publicKey: string
    private privateKey: string
    private publicKeyBase58: string
    private privateKeyBase58: string
    private lk: LikeLib
    private account: LikeLib.Account
    private contract: LikeLib.Contract

    constructor(
        walletService: WalletService
    ) {
        if (this.privateKeyBase58) {
            return
        }

        walletService.address$.subscribe((privateKey: string) => {
            if (this.privateKeyBase58 || !privateKey) {
                return
            }

            this.web3 = new Web3((window as any).ethereum)

            this.privateKey = privateKey
            this.publicKey = this.web3.eth.accounts.privateKeyToAccount('0x' + privateKey).address.substring(2)
            this.privateKeyBase58 = bs58.encode(Buffer.from(this.privateKey, 'hex'))
            this.publicKeyBase58 = bs58.encode(Buffer.from(this.publicKey, 'hex'))

            this.lk = new LikeLib("ws://localhost:50051")
            this.account = new LikeLib.Account(privateKey)
            this.contract = LikeLib.Contract.deployed(this.lk, this.account, tradeContract.abi, this.contractAddress)
            this.contract._setupMethods(tradeContract.abi)
        })
    }

    async newTrader(email: string): Promise<void> {
        // todo HOW DEFINE newTrader function below?
        let tx = new LikeLib.Tx({
            from: this.privateKeyBase58,
            to: this.contractAddress, // todo WHO IS HERE?
            amount: 0,
            fee: 0,
            timestamp: Math.floor(Date.now()/1000),
            data: email // todo BASE64?
        });

        this.account.sign(tx)

        this.lk.pushTransaction(tx, function(err, info) {
            console.log('newTrader push transaction', err, info)
        })
    }

    async addSignal(hash: string): Promise<void> {
        // todo HOW DEFINE addSignal function below?
        let tx = new LikeLib.Tx({
            from: this.privateKeyBase58,
            to: this.contractAddress, // todo WHO IS HERE?
            amount: 0,
            fee: 0,
            timestamp: Math.floor(Date.now()/1000),
            data: hash // todo BASE64?
        });

        this.account.sign(tx)

        this.lk.pushTransaction(tx, function(err, info) {
            console.log('newTrader push transaction', err, info)
        })
    }

    async getTradeLen(): Promise<number> {
        return new Promise((resolve) => {
            this.contract.getTradeLen(this.publicKey, 0, 50000, function(err, result, hash) {
                console.log('in getTradeLen abi method', err, result, hash)

                resolve(null)
            })
        })
    }

    async getSignal(address: string, index: number): Promise<SignalResponseInterface> {
        return new Promise((resolve) => {
            this.contract.signals(address, index, 0, 50000, function(err, result, hash) {
                console.log('in signals abi method', err, result, hash)

                resolve(null)
            })
        })
    }

    async getProofLen(address: string): Promise<number> {
        return new Promise((resolve) => {
            this.contract.getProofLen(address, 0, 50000, function(err, result, hash) {
                console.log('in getProofLen abi method', err, result, hash)

                resolve(0)
            })
        })
    }

    async getPrevBalanceHash(address: string, index: number): Promise<string> {
        return new Promise((resolve) => {
            this.contract.periodProofs(address, index, 0, 50000, function(err, result, hash) {
                console.log('in getPrevBalanceHash abi method', err, result, hash)

                resolve('prevbalancehash')
            })
        })
    }

    async addPeriodProof(witnessProof: WitnessProofRequestInterface, prices: bigint[]): Promise<void> {
        throw new Error("Method not implemented.");
    //     let proof = {
    //         pi_a: [this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_a[0]), this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_a[1])],
    //         pi_b: [[
    //             this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_b[0][0]), this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_b[0][1])
    //         ], [
    //             this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_b[1][0]), this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_b[1][1])
    //         ]],
    //         pi_c: [this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_c[0]), this.web3.eth.abi.encodeParameter('uint256', witnessProof.pi_c[1])]
    //     };

    //   await this.contract.methods
    //       .addPeriodProof(witnessProof.publicSignals[1], proof, witnessProof.publicSignals[0], currentBlock)
    //       .send({ from: this.account })
    }

    async getTradersCount(): Promise<number> {
        return new Promise((resolve) => {
            this.contract.getTradersCount(0, 50000, function(err, result, hash) {
                console.log('in getTradersCount abi method', err, result, hash)

                resolve(0)
            })
        })
    }

    async getTrader(index: number): Promise<TraderResponseInterface> {
        return new Promise((resolve) => {
            this.contract.traders(index, 0, 50000, function(err, result, hash) {
                console.log('in gettrader abi method', err, result, hash)

                resolve(null)
            })
        })
    }

    async getEmail(address: string): Promise<string> {
        return new Promise((resolve) => {
            this.contract.emails(address, 0, 50000, function(err, result, hash) {
                console.log('in emails abi method', err, result, hash)

                resolve('myemailfromabi')
            })
        })
    }

    async getPeriodProofs(address: string, index: number): Promise<PeriodProofResponseInterface> {
        return new Promise((resolve) => {
            this.contract.periodProofs(address, index, 0, 50000, function(err, result, hash) {
                console.log('in periodProofs abi method', err, result, hash)

                resolve(null)
            })
        })
    }

    async getPeriodProofsPage(address: string, index: number): Promise<PeriodProofResponseInterface[]> {
        return new Promise((resolve) => {
            // todo WRONG method!
            this.contract.periodProofs(address, index, 0, 50000, function(err, result, hash) {
                console.log('in periodProofsPage abi method', err, result, hash)

                resolve([])
            })
        })
    }

    async getTimestampByBlockNumber(blockNumber: bigint): Promise<number> {
        throw new Error("Method not implemented.");
    }
}