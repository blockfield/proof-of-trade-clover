import { Injectable } from "@angular/core";
import { WalletProviderInterface } from "src/app/modules/shared/interfaces/wallet-provider.interface";

@Injectable()
export class StubProvider implements WalletProviderInterface {
    async connect(): Promise<string> {
        return 'privatekey'
    }
}