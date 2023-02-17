import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/Services/UserService/user.service';
import { CardUserService } from 'src/app/Services/CardUserService/carduser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userServ: UserService, private cardServ: CardUserService) { }

  registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if (sessionStorage.getItem('Token') != null) {
      sessionStorage.clear()
      window.location.reload()
    }
  }

  register() {
    let user = {
      fullName: this.registerForm.get('fullName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    }

    this.userServ.register(user).subscribe({
      next: (data: any) => {
        console.log(data)
        this.registerForm.reset()
        Swal.fire(
          '',
          'El usuario ' + data.result.fullName + " ha sido creado",
          'success'
        )
      },
      error: (e) => {
        Swal.fire(
          '',
          'Hubo un error ' + e.message,
          'error'
        )
      }
    })
  }

}
