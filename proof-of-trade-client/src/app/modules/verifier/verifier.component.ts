import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu.service';
import { WalletService } from '../shared/services/wallet.service';
import { StrategyModel } from './models/strategy.model';
import { TradersService } from './services/traders.service';

@Component({
  selector: 'app-verifier',
  templateUrl: './verifier.component.html',
  styleUrls: ['./verifier.component.less']
})
export class VerifierComponent implements OnInit {

  constructor(
    private location: Location,
    private menuService: MenuService,
    private walletService: WalletService,
  ) { }

  ngOnInit(): void {
    this.initMenu()
    this.initWalletAddress()
  }

  private initMenu(): void {
    let states = this.location.normalize(this.location.path()).split('/')
    
    this.menuService.changeState(states[1], states[2])
  }

  private initWalletAddress(): void {
    this.walletService.address$.next('594e9533c8aa7e114757213c1ad1d4c35de414a048262a76b705b962708430f4')
  }

}
