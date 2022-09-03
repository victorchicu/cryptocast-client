import {ExchangeType} from "../enums/exchangeType";

export class WalletBalance {
  private _name: string;
  private _fullName: string;
  private _exchange: ExchangeType;
  private _totalFunds: number;
  private _fundsAvailable: number;
  private _usedInAnyOutstandingOrders: number;

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

  get exchange(): ExchangeType {
    return this._exchange;
  }

  set exchange(value: ExchangeType) {
    this._exchange = value;
  }

  get totalFunds(): number {
    return this._totalFunds;
  }

  set totalFunds(value: number) {
    this._totalFunds = value;
  }

  get fundsAvailable(): number {
    return this._fundsAvailable;
  }

  set fundsAvailable(value: number) {
    this._fundsAvailable = value;
  }

  get usedInAnyOutstandingOrders(): number {
    return this._usedInAnyOutstandingOrders;
  }

  set usedInAnyOutstandingOrders(value: number) {
    this._usedInAnyOutstandingOrders = value;
  }
}
