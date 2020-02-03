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
