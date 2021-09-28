export class Symbol {
  private readonly _idx;
  private readonly _name;
  private readonly _alias;
  private readonly _price;

  constructor(idx: number, name: string, alias: string, price: bigint) {
    this._idx = idx;
    this._name = name;
    this._alias = alias;
    this._price = price;
  }

  get idx() {
    return this._idx;
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
