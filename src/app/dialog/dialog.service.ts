// modal.service.ts

import {
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  StaticProvider,
  TemplateRef,
  Type,
  ViewContainerRef,
  createComponent,
  inject,
} from "@angular/core";

import { DialogRef } from "./dialog-ref";
import { ModalComponent } from "./modal/modal.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  private dialogRefs: { [key: string]: ComponentRef<any> } = {};
  private injector = inject(Injector);
  private environmentInjector = inject(EnvironmentInjector);
  private viewContainerRef: ViewContainerRef | undefined = undefined;

  constructor() {}

  init(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  open<T>(content: TemplateRef<T> | Type<T>): DialogRef {
    if (!this.viewContainerRef) {
      throw "ViewContainerRef is not initialized";
    }

    const dialogRef = new DialogRef();

    const providers: StaticProvider[] = [
      { provide: DialogRef, useValue: dialogRef },
    ];

    const injector = Injector.create({
      providers,
      parent: this.injector,
    });

    let modalRef: ComponentRef<ModalComponent>;

    if (content instanceof TemplateRef) {
      const contentRef = this.viewContainerRef?.createEmbeddedView(
        content,
        undefined,
        {
          injector,
        }
      );

      modalRef = this.viewContainerRef?.createComponent(ModalComponent, {
        environmentInjector: this.environmentInjector,
        injector,
        projectableNodes: [contentRef.rootNodes],
      });
    } else {
      modalRef = this.viewContainerRef?.createComponent(ModalComponent, {
        environmentInjector: this.environmentInjector,
        injector,
      });

      modalRef.injector.get(ViewContainerRef).createComponent(content as Type<T>,{
        environmentInjector: this.environmentInjector,
        injector,
      });
    }

    (dialogRef as { componentRef: ComponentRef<ModalComponent> }).componentRef =
      modalRef;
    (dialogRef as { componentInstance: ModalComponent }).componentInstance =
      modalRef.instance;

    const refIdentifier = crypto.randomUUID();
    this.dialogRefs[refIdentifier] = modalRef;

    dialogRef.closed.subscribe(() => {
      this.removeDialog(refIdentifier);
    });

    return dialogRef;
  }

  removeDialog(refIdentifier: string) {
    this.dialogRefs[refIdentifier].destroy();
  }
}
