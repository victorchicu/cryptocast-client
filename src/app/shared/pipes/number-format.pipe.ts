import {Pipe, PipeTransform} from '@angular/core';
import {BigInteger} from "@angular/compiler/src/i18n/big_integer";

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(input: number, args?: any): any {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1000, symbol: "k" },
      { value: 1000000, symbol: "M" },
      { value: 1000000000, symbol: "B" },
      { value: 1000000000000, symbol: "T" },
      // { value: 1E15, symbol: "P" },
      // { value: 1E18, symbol: "E" }
    ];
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find(function (item) {
      return input >= item.value;
    });
    return item ? (input / item.value).toPrecision(8).replace(regex, "$1") + item.symbol : "0";
  }
}
