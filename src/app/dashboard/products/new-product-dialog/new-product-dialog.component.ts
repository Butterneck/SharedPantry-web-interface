import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Product} from "../Product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

class DialogComponent {
}

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.css']
})
export class NewProductDialogComponent implements OnInit {
  private newProductForm: FormGroup;
  private http: HttpClient;
  private token: string;

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newProductForm = new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl('')
    });

    this.http = data.http;
    this.token = data.token;
  }

  ngOnInit() {
  }

  onSubmit() {
    let product = this.http.post<{product: Product}>(
      environment.backend_url + 'addProduct',
      {
        name: this.newProductForm.value.name,
        price: this.newProductForm.value.price,
        quantity: this.newProductForm.value.quantity
      },
      {headers: {token: this.token}}
    );

    this.dialogRef.close(product);
  }
}
