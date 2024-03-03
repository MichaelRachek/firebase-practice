import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MatCardModule, MatFormField, MatSelectModule, MatButtonModule, FlexLayoutModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onStartTraining() {
    this.trainingStart.emit();
  }

}
