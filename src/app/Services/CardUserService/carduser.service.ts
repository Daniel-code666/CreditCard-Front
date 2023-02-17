import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardUserService {

  private approvalStageMessage = new BehaviorSubject('false');
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor() { }

  updateApprovalMessage(message: string) {
    this.approvalStageMessage.next(message)
  }
}
