export class Asset {
  private readonly _icon;
  private readonly _coin;
  private readonly _name;
  private readonly _balance;

  constructor(icon: number, coin: string, name: string, balance: bigint) {
    this._icon = icon;
    this._coin = coin;
    this._name = name;
    this._balance = balance;
  }

  get icon() {
    return this._icon;
  }

  get coin() {
    return this._coin;
  }

  get name() {
    return this._name;
  }

  get balance() {
    return this._balance;
  }
}
