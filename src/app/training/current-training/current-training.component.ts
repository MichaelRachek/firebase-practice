import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [
    MatProgressSpinner, MatButtonModule, FlexLayoutModule
  ],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.scss'
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  // @ts-ignore
  timer;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
