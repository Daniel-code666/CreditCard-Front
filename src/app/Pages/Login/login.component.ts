import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/Services/UserService/user.service';
import { CardUserService } from 'src/app/Services/CardUserService/carduser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  isLogged = "false"
  isAdmin = "false"

  constructor(private router: Router, private userServ: UserService, private cardServ: CardUserService) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.cardServ.currentApprovalStageMessage.subscribe(msg => this.isLogged = msg)
  }

  login(): void {

    let user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.userServ.login(user).subscribe({
      next: (data: any) => {
        this.loginForm.reset()
        sessionStorage.setItem(environment.TOKEN, data.result.token)
        sessionStorage.setItem("fullname", data.result.user.fullName)
        this.cardServ.updateApprovalMessage(this.isLogged = "true")
        this.router.navigate(['/admcard'])
      },
      error: (e) => {
        console.log(e)
        Swal.fire(
          '',
          'Usuario o contraseña incorrecta',
          'error'
        )
      }
    })
  }

}
