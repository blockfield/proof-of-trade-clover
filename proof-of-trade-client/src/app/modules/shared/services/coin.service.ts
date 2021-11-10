import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getBtcPrice(): Observable<Object> {
    const now = new Date()
    let price = 66500 + (now.getMilliseconds() * now.getSeconds() * now.getMinutes() % 100)

    return of({data:[{quote:{USD:{price: price}}}]})

    // return this.httpClient.get(
    //   'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=b10c0844-5b9b-4f22-8def-ea505b4ea03e',
    //   {
    //     headers: {
    //       'X-CMC_PRO_API_KEY': 'b10c0844-5b9b-4f22-8def-ea505b4ea03e',
    //     }
    //   }
    // )
  }
}
