import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/signUp', pathMatch: 'full' },
  {
    path: 'signUp', loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then((m) => m.SignUpModule)
  },
  {
    path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule)
  },
  {
    path: 'confirmation', loadChildren: () => import('./pages/confirmation/confirmation.module').then((m) => m.ConfirmationModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
