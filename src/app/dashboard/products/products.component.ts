import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private token: string;
  private items_list: any[];

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private snackBar: MatSnackBar) {
    this.token = activatedRoute.snapshot.queryParams.token;
  }

  ngOnInit() {
    this.http.post<any>(
      'http://localhost:5000/getAllProducts',
      {},
      {headers: {token: this.token}}
    ).subscribe(items => {
      this.items_list = items.products;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
