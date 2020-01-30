import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "./Product";
import {FormControl, FormGroup} from "@angular/forms";
import {combineLatest} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {NewProductDialogComponent} from "./new-product-dialog/new-product-dialog.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private readonly token: string;
  private products_list: Product[];
  private productForms: FormGroup[] = [];
  home: string;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.token = activatedRoute.snapshot.url[1].path;

    this.home = '../../' + this.token;
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
      environment.backend_url + '/getAllProducts',
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
    const name = this.http.post<{product: Product}>(
      environment.backend_url + '/editProductName',
      {
        product_id: this.products_list[index].id,
        name: this.productForms[index].value.name
      },
      {headers: {token: this.token}}
    );
    const quantity = this.http.post<{product: Product}>(
      environment.backend_url + '/editProductQuantity',
      {
        product_id: this.products_list[index].id,
        quantity: this.productForms[index].value.quantity
      },
      {headers: {token: this.token}}
    );
    const price = this.http.post<{product: Product}>(
      environment.backend_url + '/editProductPrice',
      {
        product_id: this.products_list[index].id,
        price: this.productForms[index].value.price
      },
      {headers: {token: this.token}}
    );

    combineLatest(
      name,
      quantity,
      price
    ).subscribe(([nameRes, quantityRes, priceRes]) => {
      this.products_list[index].name = nameRes.product.name;
      this.products_list[index].quantity = quantityRes.product.quantity;
      this.products_list[index].price = priceRes.product.price;
      this.openSnackBar('Saved!', 'Gotcha')
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProductDialogComponent, {
      width: '250px',
      data: {http: this.http, token: this.token}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result.subscribe(response => {
        this.products_list.push(response.product);
        this.productForms.push(
          new FormGroup({
            name: new FormControl(response.product.name),
            quantity: new FormControl(response.product.quantity),
            price: new FormControl(response.product.price)
          })
        )
        this.openSnackBar('New product created!', 'Gotcha');
      });
    });
  }

}
