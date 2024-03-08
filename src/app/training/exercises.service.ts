import { Injectable } from '@angular/core';
import { Exercise } from './traning.model';
import { map, Observable, Subject, tap } from 'rxjs';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

// this is an query example
// const queryRef = query(dbCollection, where('calories', '==', 10));

// updateDoc Example
// const docRef = doc(this.firestore, `availableExercises/${selectedId}`);
// setDoc(docRef, { fieldName: 'Updated Value' }, {merge: true});

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private availableExercises: Exercise[] = [];

  private runningExercise!: Exercise;
  private exerciseChanged$ = new Subject<Exercise>();
  private readonly finishedExercisesDbRef = collection(this.firestore, 'finishedExercises');
  private readonly availableExercisesDbRef = collection(this.firestore, 'availableExercises');

  constructor(private firestore: Firestore) { }

  public fetchExercises(): Observable<Exercise[]> {
    // @ts-ignore
    return collectionData<Exercise>(this.availableExercisesDbRef, {idField: 'uuid'}).pipe(
      map(arr => arr.map(this.transformToExerciseWithId)),
      tap((items: Exercise[]) => this.availableExercises = [...items])
    ) as Observable<Exercise[]>;
  }

  public selectExercise(selectedId: string): void {
    const runningExercise = this.availableExercises.find(ex => ex.uuid === selectedId);
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
    this.addToDataBase({...this.runningExercise, date: new Date(), state: 'completed'});
    // @ts-ignore
    this.runningExercise = undefined;

    // @ts-ignore
    this.exerciseChanged$.next(undefined);
  }

  public cancelExercise(process: number) {
    this.addToDataBase({
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

  public fetchCompletedOrCancelledExercises() {
    // @ts-ignore
    return collectionData<Exercise>(this.finishedExercisesDbRef, {idField: 'uuid'}).pipe(
      map(arr => arr.map(this.transformToExerciseWithId)),
    ) as Observable<Exercise[]>;

  }

  private transformToExerciseWithId(doc: Exercise, index: number): Exercise {
    return {...doc, id: index.toString()};
  }

  private addToDataBase(exercise: Exercise) {
    addDoc(this.finishedExercisesDbRef, exercise);
  }
}
