import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Exercise } from '../traning.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ExercisesService } from '../exercises.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  standalone: true,
  imports: [
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    MatSortModule,
    MatPaginatorModule,
    DecimalPipe,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './past-trainings.component.html',
  styleUrl: './past-trainings.component.scss'
})
export class PastTrainingsComponent implements AfterViewInit, OnInit, OnDestroy {
  public displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource = new MatTableDataSource<Exercise>();
  public ctrl = new FormControl('');
  private destroy$ = new Subject<void>;

  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  constructor(private trainingService: ExercisesService) {}

  ngOnInit() {
    this.trainingService.fetchCompletedOrCancelledExercises()
      .pipe(takeUntil(this.destroy$))
      .subscribe(resp =>  {
        this.dataSource.data = resp;
      });
    this.doFilter();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private doFilter() {
    this.ctrl.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(''))
      .subscribe(val => {
        this.dataSource.filter = val || '';
      });
  }
}
