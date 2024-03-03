import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatIconButton,
    RouterLink,
    FlexLayoutModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
