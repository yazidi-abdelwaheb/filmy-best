import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private confirmSubject = new Subject<boolean>();
  private messageSubject = new Subject<{ titel: string; msg: string }>();

  onConfirm(): Observable<boolean> {
    return this.confirmSubject.asObservable();
  }

  onMessage(): Observable<{ titel: string; msg: string }> {
    return this.messageSubject.asObservable();
  }

  open(titel: string, msg: string): Observable<boolean> {
    this.messageSubject.next({ titel, msg });
    return this.onConfirm();
  }

  accept() {
    this.confirmSubject.next(true);
  }

  reject() {
    this.confirmSubject.next(false);
  }
}
