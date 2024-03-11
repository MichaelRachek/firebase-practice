import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  private isLoading$ = new BehaviorSubject<boolean>(false);

  getUiSubject() {
    return this.isLoading$.asObservable();
  }

  setUiSubject(value: boolean) {
    this.isLoading$.next(value);
  }
}
