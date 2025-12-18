import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmService } from '../../services/confirm.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm',
  imports: [NgIf],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent implements OnInit {
  titel: string = '';
  msg: string = '';
  visible = false;

  constructor(private confirmService: ConfirmService) {}

  ngOnInit() {
    // Écoute des messages
    this.confirmService.onMessage().subscribe(({ titel, msg }) => {
      this.titel = titel;
      this.msg = msg;
      this.visible = true; // affiche le modal
    });
  }

  onAccept() {
    this.confirmService.accept();
    this.visible = false;
  }

  onReject() {
    this.confirmService.reject();
    this.visible = false;
  }
}
