import { Component, EventEmitter, Output } from "@angular/core";

import { DialogRef } from "../dialog-ref";

// modal.component.ts

@Component({
  selector: "hmf-modal",
  template: `
    <div class="modal-backdrop"></div>
    <div class="modal">
      <ng-content></ng-content>
      <button (click)="closeModal()">Close</button>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        /* Add styles for backdrop */
      }
      .modal {
        /* Add styles for modal window */
      }
    `,
  ],
})
export class ModalComponent {
  constructor(public dialogRef: DialogRef) {}

  closeModal() {
    this.dialogRef.close();
  }
}
