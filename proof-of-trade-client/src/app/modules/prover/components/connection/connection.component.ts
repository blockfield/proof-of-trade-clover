import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { WalletModel } from '../../models/wallet.model';
import { WalletService } from 'src/app/modules/shared/services/wallet.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.less']
})
export class ConnectionComponent implements OnInit {

  private walletsKey = 'wallets'

  public newWallet: WalletModel = new WalletModel('', '')
  public wallets: WalletModel[] = []

  constructor(
    private storageService: StorageService,
    private walletService: WalletService,
  ) { }

  ngOnInit(): void {
    this.initWallets()
  }

  private initWallets(): void {
    this.storageService.get<WalletModel[]>(this.walletsKey).subscribe(
      (wallets: WalletModel[]) => {
        this.wallets = wallets || []
      }
    )
  }

  public selectWallet(wallet: WalletModel): void {
    this.walletService.connect(wallet.privateKey).subscribe(() => {})
  }

  public addWallet(): void {
    const wallets = [...this.wallets, this.newWallet]

    this.storageService.set(this.walletsKey, wallets).subscribe(
      () => {
        this.newWallet = new WalletModel('', '')
        this.wallets = wallets
      }
    )
  }

}
