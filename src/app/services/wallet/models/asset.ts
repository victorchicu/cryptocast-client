export class Asset {
  private _icon: number;
  private _coin: string;
  private _name: string;
  private _balance: bigint;
  private _flagged: boolean;

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

  get balance(): bigint {
    return this._balance;
  }

  set balance(value: bigint) {
    this._balance = value;
  }

  get flagged(): boolean {
    return this._flagged;
  }

  set flagged(value: boolean) {
    this._flagged = value;
  }
}
