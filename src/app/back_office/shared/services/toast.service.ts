import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  success(msg: string) {
    this.toastr.success(`${msg}`, '', { enableHtml: true });
  }

  info(msg: string) {
    this.toastr.info(`${msg}`, '', { enableHtml: true });
  }

  warning(msg: string) {
    this.toastr.warning(`${msg}`, '', { enableHtml: true });
  }

  error(msg: string) {
    this.toastr.error(`${msg}`, '', { enableHtml: true });
  }
}
