import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  #message = inject(MessageService);

  showMsg(severity: string, msg: string, summary?: string, icon?: string) {
    if (msg?.trim()) {
      this.#message.clear();
      this.#message.add({
        severity, // "success", "info", "warn", "error"
        detail: msg,
        summary,
        icon,
        life: 4000,
        // sticky: true,
      })
    }
  };
}
