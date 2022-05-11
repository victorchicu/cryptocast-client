import {ExchangeProvider} from "../enums/exchange-provider";

export class Asset {
  private _name: string;
  private _fullName: string;
  private _provider: ExchangeProvider;
  private _totalFunds: string;
  private _fundsAvailable: string;
  private _usedInAnyOutstandingOrders: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get provider(): ExchangeProvider {
    return this._provider;
  }

  set provider(value: ExchangeProvider) {
    this._provider = value;
  }

  get totalFunds(): string {
    return this._totalFunds;
  }

  set totalFunds(value: string) {
    this._totalFunds = value;
  }

  get fundsAvailable(): string {
    return this._fundsAvailable;
  }

  set fundsAvailable(value: string) {
    this._fundsAvailable = value;
  }

  get usedInAnyOutstandingOrders(): string {
    return this._usedInAnyOutstandingOrders;
  }

  set usedInAnyOutstandingOrders(value: string) {
    this._usedInAnyOutstandingOrders = value;
  }
}
