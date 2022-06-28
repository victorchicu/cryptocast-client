import {ApiKey} from "./api-key";

export class ApiKeyCreateEvent {
  public apiKey: ApiKey
  public isOpened: boolean;

  public static create(apiKey: ApiKey, isOpened: boolean): ApiKeyCreateEvent {
    return new ApiKeyCreateEvent(apiKey, isOpened);
  }

  constructor(apiKey: ApiKey, isOpened: boolean) {
    this.apiKey = apiKey;
    this.isOpened = isOpened;
  }
}
