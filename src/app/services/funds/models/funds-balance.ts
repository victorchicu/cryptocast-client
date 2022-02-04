import {Quotation} from "../../../shared/enums/quotation";

export class FundsBalance {
  private _asset: string;
  private _fullName: string;
  private _iconIndex: number;
  private _flagged: boolean;
  private _free: number;
  private _frozen: number;
  private _price: string;
  private _balance: string;
  private _quotation: Quotation

  get iconIndex(): number {
    return this._iconIndex;
  }

  set iconIndex(value: number) {
    this._iconIndex = value;
  }

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

  get flagged(): boolean {
    return this._flagged;
  }

  set flagged(value: boolean) {
    this._flagged = value;
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
}
