import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import Swal from 'sweetalert2';
interface Data {
  firstName: string;
  lastName: string;
  age: number;
  country: string;
  address: string;
}
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  data: any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.auth.getObjectData().subscribe({
      next:(res) => {
        this.data = res;
        if (Object.keys(this.data).length === 0 && !sessionStorage.getItem('data')) {
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
          // this.firstName = this.data.fullName?.split(" ").slice(0,1);
          // this.lastName = this.data.fullName?.split(" ").slice(1);
        }
      }, error:(err) => {
        console.log(err);
      }
    })
  }
}
