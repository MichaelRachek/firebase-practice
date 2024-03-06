import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { ExercisesService } from './exercises.service';
import { map, Observable, tap } from 'rxjs';
import { Exercise } from './traning.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MatTabsModule, NewTrainingComponent, PastTrainingsComponent, CurrentTrainingComponent, AsyncPipe],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit {
  public ongoingTraining$!: Observable<boolean>;

  constructor(private exercisesService: ExercisesService) {
  }

  ngOnInit() {
    this.ongoingTraining$ = this.exercisesService.getExerciseChanged()
      .pipe(map(val => !!val));
  }


}
