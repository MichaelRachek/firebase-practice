import { Injectable } from '@angular/core';
import { AuthData, User } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authChange = new Subject<boolean>();
  private isLoggedIn = false;
  constructor(private router: Router, private auth: Auth) {
  }

  public onAuthStateChanged(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.authSuccessfully();
      } else {
        this.authChange.next(false);
        this.isLoggedIn = false;
        this.router.navigateByUrl('/login');
      }
    })
  }

  public registerUser(data: User): void {
    const {email, password } = data;

    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log('Sign in')
      })
      .catch((error) => {
        console.log('Error');
      })

  }

  public login(data: AuthData): void {
    const { email, password } = data;
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Logged in');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

  public logout(): void {
    signOut(this.auth).then(() => {
      this.authChange.next(false);
      this.isLoggedIn = false;
      this.router.navigateByUrl('/login');
    }).catch(err => console.log(err.message));
  }

  public isAuth(): boolean {
    return this.isLoggedIn;
  }

  public onAuthChange = () => this.authChange.asObservable();
  private authSuccessfully(): void {
    this.isLoggedIn = true
    this.authChange.next(true);
    this.router.navigateByUrl('/training');
  }


}
