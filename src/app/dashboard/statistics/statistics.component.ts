import { Component, OnInit } from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import { ChartType } from 'chart.js';
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors = [
    {
      backgroundColor: ['rgb(2,63,165)', 'rgb(125,135,185)', 'rgb(190,193,212)', 'rgb(214,188,192)',
        'rgb(187,119,132)', 'rgb(142,6,59)', 'rgb(74,111,227)', 'rgb(133,149,225)', 'rgb(181,187,227)',
        'rgb(230,175,185)', 'rgb(224,123,145)', 'rgb(211,63,106)', 'rgb(17,198,56)', 'rgb(141,213,147)',
        'rgb(198,222,199)', 'rgb(234,211,198)', 'rgb(240,185,141)', 'rgb(239,151,8)', 'rgb(15,207,192)',
        'rgb(156,222,214)', 'rgb(213,234,231)', 'rgb(243,225,235)', 'rgb(246,196,225)',
        'rgb(247,156,212)'],
    },
  ];
  private readonly token: string;
  home: string;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
    this.token = activatedRoute.snapshot.url[1].path;

    this.home = '../../' + this.token;
  }

  ngOnInit() {
    this.http.post<{frequencies: any}>(
      environment.backend_url + '/api/getAllTransactionsFrequency',
      {},
      {headers: {token: this.token}}
    ).subscribe(resp => {
      this.doughnutChartLabels = Object.keys(resp.frequencies);
      this.doughnutChartData = [[]];
      Object.keys(resp.frequencies).forEach(key => {
        this.doughnutChartData[0].push(resp.frequencies[key]);
      });
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
