import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import Swal from 'sweetalert2';

interface Countries {
  idCountry: number;
  countryCode: string;
  countryName: string;
}

interface Property {
  id: number;
  name: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  countries!: any[];
  data: any;
  firstName?: string;
  lastName?: string;

  // //////////////////////////////////////////////////
  filteredOptions?: any[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    // this.profileForm.controls.countryOfBirth.valueChanges
    //   .pipe(debounceTime(800))
    //   .subscribe((searchTerm) => {
    //     if (searchTerm != '') {
    //       this.auth.Get('/' + searchTerm).subscribe({
    //         next: (res: any) => {
    //           this.filteredOptions = res.data;
    //           console.log(res);
    //         },
    //         error: (err: any) => {
    //           console.log(err);
    //         },
    //       });
    //     } else {
    //       this.filteredOptions = this.countries;
    //     }
    //   });

    // this.profileForm.controls.countryOfBirth.valueChanges
    //   .pipe(
    //     debounceTime(800),
    //     switchMap((searchTerm) => {
    //       if (searchTerm !== '') {
    //         return this.getCountry(searchTerm);
    //       } else {
    //         return this.countries;
    //       }
    //     })
    //   )
    //   .subscribe({
    //     next: (res: any) => {
    //       this.filteredOptions = res.data;
    //       console.log(res);
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //     },
    //   });


    this.profileForm.controls.countryOfBirth.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(searchTerm => {
          if (searchTerm !== '') {
            return this.auth.Get('/' + searchTerm);
          } else {
            return of(this.countries);
          }
        })
      )
      .subscribe({
        next: (res: any) => {
          this.filteredOptions = res.data;
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      });



  }

  profileForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(8)],
    ],
    countryOfBirth: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.auth.getObjectData().subscribe((objectData) => {
      this.data = objectData;
      this.firstName = this.data.fullName?.split(' ').slice(0, 1);
      this.lastName = this.data.fullName?.split(' ').slice(1);
      if (!Object.keys(this.data).length && !sessionStorage.getItem('data')) {
        Swal.fire({
          title: 'Data not added, please add it first!',
          icon: 'error',
          confirmButtonText: 'Back',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/signUp']);
          }
        });
      } else {
        this.data = JSON.parse(sessionStorage.getItem('data') ?? '');
        this.firstName = this.data.fullName?.split(' ').slice(0, 1);
        this.lastName = this.data.fullName?.split(' ').slice(1);
      }
    });
    this.getCountries();
  }

  profile() {
    if (this.profileForm.controls.firstName.errors?.['required']) {
      Swal.fire({
        icon: 'warning',
        title: 'First Name is required',
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (this.profileForm.controls.lastName.errors?.['required']) {
      Swal.fire({
        icon: 'warning',
        title: 'Last Name is required',
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (
      this.profileForm.controls.age.errors?.['required'] ||
      this.profileForm.controls.age.errors?.['pattern'] ||
      this.profileForm.controls.age.errors?.['min']
    ) {
      Swal.fire({
        icon: 'warning',
        title:
          'Please enter a valid age and the minimum age allowed is 8 years',
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (this.profileForm.controls.countryOfBirth.errors?.['required']) {
      Swal.fire({
        icon: 'warning',
        title: 'Country Of Birth is required',
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (this.profileForm.controls.address.errors?.['required']) {
      Swal.fire({
        icon: 'warning',
        title: 'Address is required',
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const fullName: any =
        this.profileForm.controls.firstName.value +
        ' ' +
        this.profileForm.controls.lastName.value;
      const model = {
        userName: this.data.userName,
        password: this.data.password,
        fullName: fullName,
        age: this.profileForm.controls.age.value,
        countryOfBirth: this.profileForm.controls.countryOfBirth.value,
        address: this.profileForm.controls.address.value,
      };
      this.auth.saveNewData(model);
      Swal.fire({
        icon: 'success',
        title: 'Data added successfully',
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        this.router.navigate(['/confirmation']);
      }, 1550);
    }
  }

  getCountry(searchTerm: any): any {
    this.auth.Get('/' + searchTerm).subscribe({
      next: (res: any) => {
        this.filteredOptions = res.data;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCountries() {
    this.auth.getCountries().subscribe({
      next: (res: any) => {
        this.countries = res.data;
        this.filteredOptions = this.countries;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
