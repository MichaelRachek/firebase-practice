import { Injectable } from '@angular/core';
import { AuthData, User } from './auth.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User;
  private authChange = new BehaviorSubject<boolean>(!!this.user);
  constructor(private router: Router) { }

  public registerUser(data: User): void {
    this.user = {
      email: data.email,
      userId: String(1000)
    }

    this.authSuccessfully();

  }

  public login(data: AuthData): void {
    this.authSuccessfully();
  }

  public logout(): void {
    // @ts-ignore
    this.user = null;
    this.authChange.next(false);
    this.router.navigateByUrl('/login');
  }

  public getUser(): User {
    return {...this.user};
  }

  public isAuth(): boolean {
    return this.user !== null;
  }

  public onAuthChange = () => this.authChange.asObservable();
  private authSuccessfully(): void {
    this.authChange.next(true);
    this.router.navigateByUrl('/training');
  }


}
