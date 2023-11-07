import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { SignUpComponent } from './sign-up.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// signUp routing
import { SignUpRoutingModule } from './signUp-routing.module';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Material Layout
import { MatCardModule } from '@angular/material/card';

// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';

// Material Icons
import { MatIconModule } from '@angular/material/icon';

const material = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    material,
  ],
  exports: [SignUpComponent, ReactiveFormsModule, FormsModule, material],
})
export class SignUpModule {}
