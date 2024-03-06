import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExercisesService } from '../exercises.service';
import { take } from 'rxjs';

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
  public progress = 0;
  // @ts-ignore
  private timer;

  constructor(private dialog: MatDialog,
              private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  public onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
      if (result) {
        this.exercisesService.cancelExercise(this.progress)
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  private startOrResumeTimer() {
    const sep = this.exercisesService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.exercisesService.completeExercise();
        clearInterval(this.timer);
      }
    }, sep);
  }
}
