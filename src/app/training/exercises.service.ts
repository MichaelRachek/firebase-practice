import { Injectable } from '@angular/core';
import { Exercise } from './traning.model';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 30, calories: 8},
    {id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 8}
  ];

  private exercises: Exercise[] = [];

  private runningExercise!: Exercise;
  private exerciseChanged$ = new Subject<Exercise>();

  constructor() { }

  public getExercises(): Observable<Exercise[]> {
    return of(this.availableExercises.slice());
  }

  public selectExercise(selectedId: string): void {
    const runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    // @ts-ignore
    this.runningExercise = runningExercise;
    // @ts-ignore
    this.exerciseChanged$.next({...runningExercise});
  }

  public getExerciseChanged() {
    return this.exerciseChanged$.asObservable();
  }

  public getRunningExercise() {
    return { ...this.runningExercise };
  }

  public completeExercise() {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    // @ts-ignore
    this.runningExercise = undefined;

    // @ts-ignore
    this.exerciseChanged$.next(undefined);
  }

  public cancelExercise(process: number) {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      calories: this.runningExercise.duration * (process / 100),
      duration: this.runningExercise.duration * (process / 100),
    });
    // @ts-ignore
    this.runningExercise = undefined;

    // @ts-ignore
    this.exerciseChanged$.next(undefined);
  }

  public getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
