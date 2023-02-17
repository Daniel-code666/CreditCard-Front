import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { CreditcardService } from 'src/app/Services/CreditCardService/creditcard.service';
import { CardUserService } from 'src/app/Services/CardUserService/carduser.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var window: any;

@Component({
  selector: 'app-adm-card',
  templateUrl: './adm-card.component.html',
  styles: [
  ]
})
export class AdmCardComponent implements OnDestroy, OnInit {

  formModal: any;

  dtOptions: any = {};
  cards: any;
  isSuccessful: boolean = false;
  isLogged: string = "true";

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings>();

  constructor(private cardServ: CreditcardService, private router: Router, private cardUserServ: CardUserService) { }

  newCardForm = new FormGroup({
    cardNumber: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    )

    this.getCreditCardsFromUser()
  }

  getCreditCardsFromUser() {
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'csv',
        'excel',
        'pdf'
      ],
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }

    this.cardServ.GetCrediCardFromUser().subscribe({
      next: (data: any) => {
        console.log(data)
        this.cardUserServ.updateApprovalMessage(this.isLogged = "true")

        if (data.result != null) {
          this.cards = data.result.crediCards
          this.dtTrigger.next(data)
        }

        Swal.fire(
          '',
          'Bienvenido ' + sessionStorage.getItem('fullname') + ' sus datos han sido cargados',
          'success'
        )
      },
      error: (e) => {
        console.log(e)
        sessionStorage.clear()
        this.router.navigate(['home'])
      }
    })
  }

  createCreditCard(): void {
    let card = {
      cardId: 0,
      cardNumber: this.newCardForm.get('cardNumber').value,
      cvv: this.newCardForm.get('cvv').value
    }

    this.newCardForm.reset()

    this.formModal.hide();

    this.cardServ.CreateCreditCard(card).subscribe({
      next: (data: any) => {
        Swal.fire(
          '',
          'La tarjeta con número ' + data.result.cardNumber + ' ha sido creada',
          'success',
        ).then(() => { window.location.reload() })
      },
      error: (e) => {
        Swal.fire(
          '',
          'Hubo un error: ' + e.message,
          'error'
        )
      }
    })
  }

  deleteCreditCard(CardId: number): void {
    if (confirm("¿Seguro de eliminar la tarjeta?")) {
      this.cardServ.DeleteCreditCard(CardId).subscribe({
        next: (data: any) => {
          Swal.fire(
            '',
            'La tarjeta con número ' + data.result.cardNumber + ' ha sido eliminada',
            'success',
          ).then(() => { window.location.reload() })
        },
        error: (e) => {
          Swal.fire(
            '',
            'Hubo un error: ' + e.message,
            'error'
          )
        }
      })
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  openFormModal() {
    this.formModal.show();
  }
}
