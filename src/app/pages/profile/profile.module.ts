import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { ProfileComponent } from './profile.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// profile routing
import { ProfileRoutingModule } from './profile-routing.module';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Material Layout
import { MatCardModule } from '@angular/material/card';

// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule,
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    material,
  ],
  exports: [ProfileComponent, ReactiveFormsModule, FormsModule, material],
})
export class ProfileModule {}
