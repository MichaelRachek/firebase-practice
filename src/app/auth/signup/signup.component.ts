import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatInput,
    MatButton,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  // @ts-ignore
  public maxDate: Date;
  public form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
      agree: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form);
  }
}
