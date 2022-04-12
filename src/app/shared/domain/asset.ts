import {Quotation} from "../enums/quotation";
import {Subscription} from "rxjs";

export class Asset {
  private _asset: string;
  private _fullName: string;
  private _toggled: boolean;
  private _free: number;
  private _frozen: number;
  private _price: string;
  private _priceChange: string;
  private _balance: string;
  private _quotation: Quotation;
  private _openOrders: number;
  private _iconIndex: number;
  private _subscription: Subscription;

  get asset(): string {
    return this._asset;
  }

  set asset(value: string) {
    this._asset = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get toggled(): boolean {
    return this._toggled;
  }

  set toggled(value: boolean) {
    this._toggled = value;
  }

  get free(): number {
    return this._free;
  }

  set free(value: number) {
    this._free = value;
  }

  get price(): string {
    return this._price;
  }

  set price(value: string) {
    this._price = value;
  }

  get priceChange(): string {
    return this._priceChange;
  }

  set priceChange(value: string) {
    this._priceChange = value;
  }

  get frozen(): number {
    return this._frozen;
  }

  set frozen(value: number) {
    this._frozen = value;
  }


  get balance(): string {
    return this._balance;
  }

  set balance(value: string) {
    this._balance = value;
  }


  get quotation(): Quotation {
    return this._quotation;
  }

  set quotation(value: Quotation) {
    this._quotation = value;
  }


  get openOrders(): number {
    return this._openOrders;
  }

  set openOrders(value: number) {
    this._openOrders = value;
  }

  get iconIndex(): number {
    return this._iconIndex;
  }

  set iconIndex(value: number) {
    this._iconIndex = value;
  }

  get subscription(): Subscription {
    return this._subscription;
  }

  set subscription(value: Subscription) {
    this._subscription = value;
  }
}
