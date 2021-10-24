export class Asset {
  private _icon: number;
  private _coin: string;
  private _name: string;
  private _flagged: boolean;
  private _balance: number;
  private _lowPrice: number;
  private _highPrice: number;
  private _openPrice: number;
  private _averagePrice: number;

  get icon(): number {
    return this._icon;
  }

  set icon(value: number) {
    this._icon = value;
  }

  get coin(): string {
    return this._coin;
  }

  set coin(value: string) {
    this._coin = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get flagged(): boolean {
    return this._flagged;
  }

  set flagged(value: boolean) {
    this._flagged = value;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }


  get lowPrice(): number {
    return this._lowPrice;
  }

  set lowPrice(value: number) {
    this._lowPrice = value;
  }

  get highPrice(): number {
    return this._highPrice;
  }

  set highPrice(value: number) {
    this._highPrice = value;
  }

  get openPrice(): number {
    return this._openPrice;
  }

  set openPrice(value: number) {
    this._openPrice = value;
  }

  get averagePrice(): number {
    return this._averagePrice;
  }

  set averagePrice(value: number) {
    this._averagePrice = value;
  }
}
