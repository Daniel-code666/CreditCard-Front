import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/UserService/user.service';
import { CardUserService } from '../Services/CardUserService/carduser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  isLogged: string = ""
  isAdmin: boolean = false

  constructor(private userServ: UserService, private router: Router, private userCardServ: CardUserService) { }

  ngOnInit(): void {
    this.userCardServ.currentApprovalStageMessage.subscribe({
      next: (data: any) => {
        this.isLogged = data
        console.log(data)
      }
    })
  }

  log_out(){
    this.userCardServ.updateApprovalMessage(this.isLogged = "false")
    sessionStorage.clear()
    this.router.navigate(['/home']).then(() => { window.location.reload() });
  }

}
