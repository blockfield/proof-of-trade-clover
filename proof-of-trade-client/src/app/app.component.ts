import { Component, OnInit } from '@angular/core';
import MathHelper from './core/helpers/math.helper';
import { CoinService } from './modules/shared/services/coin.service';
import { PriceService } from './modules/shared/services/price.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public title = 'proof-of-trade-client';
  public isAvailable = false

  public witness: ArrayBuffer|null = null;
  public provingKey: ArrayBuffer|null = null;
  public income: object;

  constructor(
    private coinService: CoinService,
    private priceService: PriceService,
  ) {}

  ngOnInit(): void {
    this.initKeys()
    this.initPrices()
  }

  private initKeys(): void {
    // todo Maybe move to assets service if it works
    fetch("./assets/proving_key.bin").then( (response) => {
      return response.arrayBuffer();
    }).then( (b: ArrayBuffer) => {
        this.provingKey = b;
    });

    fetch("./assets/witness.bin").then( (response) => {
        return response.arrayBuffer();
    }).then( (b: ArrayBuffer) => {
        this.witness = b;
    });

    fetch("./assets/income.json").then( (response: Response) => {
        return response.json();
    }).then( (b: object) => {
        this.income = b;
    });
  }

  private initPrices(): void {
    this.priceService.subscribeToBtcPrice()

    setInterval(() => {
      this.coinService.getBtcPrice().subscribe(
        (response: any) => {
          let price = Math.floor(response.data[0].quote.USD.price)

          this.priceService.nextBtcPrice(MathHelper.decimalDigitsNumber(price))
        }
      )
    }, 2000)
  }
}
