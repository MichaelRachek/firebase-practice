import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';

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

  onClose() {
    this.closeSidenav.emit();
  }

}
