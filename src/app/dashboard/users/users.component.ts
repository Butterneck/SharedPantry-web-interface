import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "./User";
import {combineLatest} from "rxjs";
import {environment} from "../../../environments/environment";
import {UsersService} from "./users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private token: string;
  public usersList: any[];
  public userForms: FormGroup[] = [];
  home: string;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private usersService: UsersService) {
    this.token = activatedRoute.snapshot.url[1].path

    this.home = '../../' + this.token;
  }


  ngOnInit() {
    this.usersList = this.activatedRoute.snapshot.data.data.users;
    this.userForms = this.usersService.getForms(this.usersList);
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
        chat_id: this.usersList[index].chat_id,
        username: this.userForms[index].value.username
      },
      {headers: {token: this.token}}
    );

    const isAdmin = this.http.post<{user: User}>(
      environment.backend_url + '/api/editUserAdmin',
      {
        chat_id: this.usersList[index].chat_id
      },
      {headers: {token: this.token}}
    );

    combineLatest(
      username,
      isAdmin
    ).subscribe(([nameRes, adminRes]) => {
      this.usersList[index].username = nameRes.user.username;
      this.usersList[index].is_admin = adminRes.user.is_admin;
      this.openSnackBar('Saved!', 'Gotcha');
    });
  }
}
