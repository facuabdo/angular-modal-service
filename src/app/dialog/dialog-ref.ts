import { Observable, Subject } from "rxjs";

import { ComponentRef } from "@angular/core";

export class DialogRef<R = unknown, C = unknown> {
  readonly componentInstance: C | undefined;

  readonly componentRef: ComponentRef<C> | undefined;

  readonly closed: Observable<R | undefined> = new Subject<R | undefined>();

  private _backdropRef: HTMLElement;

  close(result?: R): void {
    const closedSubject = this.closed as Subject<R | undefined>;

    closedSubject.next(result);
    closedSubject.complete();
    (this as { componentInstance: C | undefined }).componentInstance =
      undefined;

      this._backdropRef.remove();
  }

  constructor(dialogRefOptions: DialogRefOptions) {
    this._backdropRef = dialogRefOptions.backdropRef;
  }
}

export interface DialogRefOptions {
  backdropRef: HTMLElement;
}
