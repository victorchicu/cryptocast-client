export class AxisChartSeries {
  private _x: Date;
  private _y: number[];

  get x(): Date {
    return this._x;
  }

  set x(value: Date) {
    this._x = value;
  }

  get y(): number[] {
    return this._y;
  }

  set y(value: number[]) {
    this._y = value;
  }
}
