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
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authChange = new Subject<boolean>();
  private isLoggedIn = false;
  constructor(private router: Router,
              private auth: Auth,
              private snackbar: MatSnackBar,
              private UIService: UIService
              ) {
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

    this.UIService.setUiSubject(true);
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.UIService.setUiSubject(false);
      })
      .catch((error) => {
        this.UIService.setUiSubject(false);
        this.showNotification(error);
      })

  }

  public login(data: AuthData): void {
    const { email, password } = data;
    this.UIService.setUiSubject(true);
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.UIService.setUiSubject(false);
      })
      .catch((error) => {
        this.showNotification(error);
        this.UIService.setUiSubject(false);
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

  private showNotification(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000
    });
  }


}
