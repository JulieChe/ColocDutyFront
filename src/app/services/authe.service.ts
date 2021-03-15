import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutheService {
  x = 2;
  user;
  constructor() { }

  saveUserCo(user): any {
    // console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserCo(): any {
    if (localStorage.getItem('user') != null) {
      return JSON.parse(localStorage.getItem('user'));
    }
    else {
      return null;
    }
  }


  deconnectUser(): any {
    localStorage.clear();
  }
}

