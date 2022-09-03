import {ApiKey} from "./api-key";

export class WalletCreateEvent {
  public apiKey: ApiKey
  public isOpened: boolean;

  public static create(apiKey: ApiKey, isOpened: boolean): WalletCreateEvent {
    return new WalletCreateEvent(apiKey, isOpened);
  }

  constructor(apiKey: ApiKey, isOpened: boolean) {
    this.apiKey = apiKey;
    this.isOpened = isOpened;
  }
}
