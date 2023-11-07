import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// component
import { ConfirmationComponent } from './confirmation.component';

// confirmation routing
import { ConfirmationRoutingModule } from './confirmation-routing.module';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ConfirmationRoutingModule,
    ConfirmationComponent
  ],
})
export class ConfirmationModule {}
