import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './Product';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsList: Product[];
  public productForms: FormGroup[] = [];

  constructor(private http: HttpClient) { }

  getProducts(token: string): Observable<{products: Product[]}> {
    return this.http.post<{products: Product[]}>(
      environment.backend_url + '/api/getAllProducts',
      {},
      {headers: {token}}
    );
  }

  getForms(productsList: Product[]): FormGroup[] {
    return this.build_forms(productsList);
  }

  build_forms(productsList: Product[]): FormGroup[] {
    const forms: FormGroup[] = [];
    for (const product of productsList) {
      forms.push(
        new FormGroup({
          name: new FormControl(product.name),
          quantity: new FormControl(product.quantity),
          price: new FormControl(product.price)
        })
      );
    }

    return forms;
  }

}
