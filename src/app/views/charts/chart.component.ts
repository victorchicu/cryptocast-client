import {Component, OnInit} from '@angular/core';
import {OhlcDto} from "../../shared/dto/ohlc-dto";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {OhlcService} from "../../services/ohlc.service";
import {ActivatedRoute, Params} from "@angular/router";

import * as Highcharts from "highcharts/highstock";
import {Options} from "highcharts/highstock";

import IndicatorsCore from "highcharts/indicators/indicators";
import IndicatorZigzag from "highcharts/indicators/zigzag";

IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);

@Component({
  selector: 'app-trade',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  assetName: string;

  highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Options = {
    xAxis: {
      type: "datetime"
    },
    series: [{
      id: "base",
      type: "ohlc",
      pointInterval: 24 * 3600 * 1000,
      data: []
    }, {
      type: "zigzag",
      showInLegend: true,
      linkedTo: "base"
    }]
  };
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
    console.log(chart);
  }
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;
  runOutsideAngular: boolean = false;

  constructor(
    private ohlcService: OhlcService,
    private activatedRoute: ActivatedRoute,
  ) {
    //
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
          this.fetchOhlc(params.assetName);
        }
      );
  }

  fetchOhlc(assetName: string) {
    console.time("AssetsComponent::fetchOhlc");
    const params = new HttpParams()
      .set('interval', "FIVE_MINUTES");
    this.ohlcService.list(assetName, params)
      .subscribe((ohlc: OhlcDto[]) => {
        const data: Array<Array<number>> = ohlc!.map(value => [value.time, value.open, value.high, value.low, value.close]);
        // @ts-ignore
        this.chartOptions.series[0] = {
          type: "ohlc",
          data: data
        }
        this.updateFlag = true;
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      }, () => {
        console.timeEnd("AssetsComponent::fetchOhlc");
      });
  }
}
