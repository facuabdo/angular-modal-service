import { Observable, Subject } from "rxjs";

import { ComponentRef } from "@angular/core";

export class DialogRef<R = unknown, C = unknown> {
  /**
   * Instance of component opened into the dialog. Will be
   * null when the dialog is opened using a `TemplateRef`.
   */
  readonly componentInstance: C | undefined;

  /**
   * `ComponentRef` of the component opened into the dialog. Will be
   * null when the dialog is opened using a `TemplateRef`.
   */
  readonly componentRef: ComponentRef<C> | undefined;

  /** Emits when the dialog has been closed. */
  readonly closed: Observable<R | undefined> = new Subject<R | undefined>();

  close(result?: R): void {
    const closedSubject = this.closed as Subject<R | undefined>;

    closedSubject.next(result);
    closedSubject.complete();
    (this as { componentInstance: C | undefined }).componentInstance =
      undefined;
  }

  constructor() {}
}
