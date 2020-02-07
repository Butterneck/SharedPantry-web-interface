import {Injectable} from '@angular/core';
import {User} from './User';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersList: User[];
  private userForms: FormGroup[] = [];

  constructor(private http: HttpClient) { }

  getUsers(token: string): Observable<{ users: User[] }> {
    return this.http.post<{users: User[]}>(
      environment.backend_url + '/api/getAllUsers',
      {},
      {headers: {token}}
    );
  }

  getForms(usersList: User[]): FormGroup[] {
    return this.build_forms(usersList);
  }

  build_forms(usersList: User[]): FormGroup[] {
    const forms: FormGroup[] = [];
    for (const user of usersList) {
      forms.push(
        new FormGroup({
          username: new FormControl(user.username),
          chat_id: new FormControl(user.chat_id),
          is_admin: new FormControl(user.is_admin),
        })
      );
    }

    return forms;
  }
}
