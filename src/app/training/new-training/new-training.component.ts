import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExercisesService } from '../exercises.service';
import { Exercise } from '../traning.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MatCardModule, MatFormField, MatSelectModule, MatButtonModule, FlexLayoutModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit {
  public exercises$!: Observable<Exercise[]>;
  public form!: FormGroup;

  constructor(private exercisesService: ExercisesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      exercise: ['', [Validators.required]]
    });
    this.exercises$ = this.exercisesService.getExercises();
  }

  onStartTraining() {
    const { exercise } = this.form.value;
    this.exercisesService.selectExercise(exercise);
  }

}
