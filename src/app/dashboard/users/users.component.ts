import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "./User";
import {combineLatest} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private token: string;
  public users_list: any[];
  public userForms: FormGroup[] = [];
  home: string;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private snackBar: MatSnackBar) {
    this.token = activatedRoute.snapshot.url[1].path

    this.home = '../../' + this.token;
  }


  build_forms(users_list: User[], forms: FormGroup[]) {
    for (const user of users_list) {
      forms.push(
        new FormGroup({
          username: new FormControl(user.username),
          chat_id: new FormControl(user.chat_id),
          is_admin: new FormControl(user.is_admin),
        })
      );
    }
  }


  ngOnInit() {
    this.http.post<{users: User[]}>(
      environment.backend_url + '/api/getAllUsers',
      {},
      {headers: {token: this.token}}
    ).subscribe(users => {
      this.users_list = users.users;
      this.build_forms(this.users_list, this.userForms);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit(index: number) {
    const username = this.http.post<{user: User}>(
      environment.backend_url + '/api/editUserName',
      {
        chat_id: this.users_list[index].chat_id,
        username: this.userForms[index].value.username
      },
      {headers: {token: this.token}}
    );

    const isAdmin = this.http.post<{user: User}>(
      environment.backend_url + '/api/editUserAdmin',
      {
        chat_id: this.users_list[index].chat_id
      },
      {headers: {token: this.token}}
    );

    combineLatest(
      username,
      isAdmin
    ).subscribe(([nameRes, adminRes]) => {
      this.users_list[index].username = nameRes.user.username;
      this.users_list[index].is_admin = adminRes.user.is_admin;
      this.openSnackBar('Saved!', 'Gotcha');
    });
  }
}
