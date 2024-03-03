import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MatTabsModule, NewTrainingComponent, PastTrainingsComponent, CurrentTrainingComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent {
  ongoingTraining = false;
}
