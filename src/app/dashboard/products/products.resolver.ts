import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductsService} from './products.service';
import {Product} from './Product';

@Injectable()
export class ProductsResolver implements Resolve<{products: Product[]}> {
  constructor(
    private productsService: ProductsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{products: Product[]}> | Promise<{products: Product[]}> | {products: Product[]} {
    const token = route.url[1].path;
    return this.productsService.getProducts(token);
  }
}

