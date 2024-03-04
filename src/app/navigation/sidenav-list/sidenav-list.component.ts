import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [
    MatIcon,
    MatListModule,
    RouterLink,
    MatIconButton
  ],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavListComponent {
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) {
  }

  onClose() {
    this.closeSidenav.emit();
  }

  logout() {
    this.onClose();
    this.authService.logout();
  }

}
