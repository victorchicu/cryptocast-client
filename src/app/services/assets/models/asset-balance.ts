export class AssetBalance {
  private _icon: number;
  private _coin: string;
  private _name: string;
  private _flagged: boolean;
  private _balance: number;
  private _usdtValue: number;

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


  get usdtValue(): number {
    return this._usdtValue;
  }

  set usdtValue(value: number) {
    this._usdtValue = value;
  }
}
