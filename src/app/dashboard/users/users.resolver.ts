import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from './User';
import {UsersService} from './users.service';
import {Observable} from 'rxjs';

@Injectable()
export class UsersResolver implements Resolve<{users: User[]}> {
  constructor(
    private usersService: UsersService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ users: User[] }> | Promise<{ users: User[] }> | { users: User[] } {
    const token = route.url[1].path;
    return this.usersService.getUsers(token);
  }
}
