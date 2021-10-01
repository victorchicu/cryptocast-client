export class Coin {
  private readonly _icon;
  private readonly _name;
  private readonly _alias;
  private readonly _price;

  constructor(icon: number, name: string, alias: string, price: bigint) {
    this._icon = icon;
    this._name = name;
    this._alias = alias;
    this._price = price;
  }

  get icon() {
    return this._icon;
  }

  get name() {
    return this._name;
  }

  get alias() {
    return this._alias;
  }

  get price() {
    return this._price;
  }
}
