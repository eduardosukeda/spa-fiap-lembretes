import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    this.router.navigate(['/lembrete']);
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
       localStorage.setItem("email", res.providerData[0].email);
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
