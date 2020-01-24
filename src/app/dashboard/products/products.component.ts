import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "./Product";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private token: string;
  private products_list: Product[];
  private productForms: FormGroup[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private snackBar: MatSnackBar) {
    this.token = activatedRoute.snapshot.url[1].path;
  }


  build_forms(product_list: Product[], forms: FormGroup[]) {
    for (let product of product_list) {
      forms.push(
        new FormGroup({
          name: new FormControl(product.name),
          quantity: new FormControl(product.quantity),
          price: new FormControl(product.price)
        })
      )
    }
  }


  ngOnInit() {
    this.http.post<{products: Product[]}>(
      'http://localhost:5000/getAllProducts',
      {},
      {headers: {token: this.token}}
    ).subscribe(resp => {
      this.products_list = resp.products;
      this.build_forms(this.products_list, this.productForms);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit(index: number) {
    console.log(this.productForms[index].value.name);
    console.log(this.productForms[index].value.quantity);
    console.log(this.productForms[index].value.price);
  }

}
