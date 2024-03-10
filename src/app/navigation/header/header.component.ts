import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from '../../auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatIconButton,
    RouterLink,
    FlexLayoutModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  public isAuth$ = this.authService.onAuthChange();

  constructor(private authService: AuthService) {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
