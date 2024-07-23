// modal.service.ts

import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  StaticProvider,
  TemplateRef,
  inject,
} from "@angular/core";

import {
  ComponentPortal,
  ComponentType,
  DomPortalOutlet,
} from "@angular/cdk/portal";
import { DialogRef } from "./dialog-ref";
import { DOCUMENT } from "@angular/common";
import { ModalComponent } from "./modal/modal.component";

let nextUniqueId = 0;

@Injectable({
  providedIn: "root",
})
export class DialogService {
  private _appRef: ApplicationRef;

  private _containerElement: HTMLElement;
  get containerElement(): HTMLElement {
    if (this._dialogConfig?.containerElement) {
      this._containerElement = this._dialogConfig.containerElement;
    }

    if (!this._containerElement) {
      this._containerElement = this.createContainerElement();
    }

    return this._containerElement;
  }

  private _domPortalOutlet: DomPortalOutlet;
  get domPortalOutlet(): DomPortalOutlet {
    if (!this._domPortalOutlet) {
      return (this._domPortalOutlet = this._createPortalOutlet(
        this.containerElement
      ));
    }

    return this._domPortalOutlet;
  }

  private _dialogConfig: DialogConfig = new DialogConfig();
  private _dialogRefs: { [key: string]: ComponentRef<any> } = {};
  private _injector = inject(Injector);

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  open<T>(
    content: TemplateRef<T> | ComponentType<T>,
    config?: DialogConfig
  ): DialogRef {
    const backdropRef = this._document.createElement("div");
    backdropRef.classList.add("hmf-modal-backdrop");
    this.containerElement.appendChild(backdropRef);

    const dialogRef = new DialogRef({ backdropRef });

    const providers: StaticProvider[] = [
      { provide: DialogRef, useValue: dialogRef },
    ];

    const injector = Injector.create({
      providers,
      parent: this._injector,
    });

    if (content instanceof TemplateRef) {
      //template logic
    } else {
      const containerPortal = new ComponentPortal(
        ModalComponent,
        null,
        injector,
        this._componentFactoryResolver
      );

      const containerRef =
        this.domPortalOutlet.attachComponentPortal(containerPortal);

      const contentPortal = new ComponentPortal(
        content,
        null,
        injector,
        this._componentFactoryResolver
      );

      containerRef.instance.attachComponentPortal(contentPortal);

      const refIdentifier = crypto.randomUUID();

      this._dialogRefs[refIdentifier] = containerRef;

      dialogRef.closed.subscribe(() => {
        this.removeDialog(refIdentifier);
      });
    }

    return dialogRef;
  }

  removeDialog(refIdentifier: string) {
    this._dialogRefs[refIdentifier].destroy();
  }

  private createContainerElement(): HTMLElement {
    const containerClass = "hmf-modal-container";

    const container = this._document.createElement("div");
    container.classList.add(containerClass);

    this._document.body.appendChild(container);
    return container;
  }

  private _createPortalOutlet(pane: HTMLElement): DomPortalOutlet {
    if (!this._appRef) {
      this._appRef = this._injector.get<ApplicationRef>(ApplicationRef);
    }

    return new DomPortalOutlet(
      pane,
      this._componentFactoryResolver,
      this._appRef,
      this._injector,
      this._document
    );
  }
}

export class DialogConfig {
  containerElement: HTMLElement = undefined;

  constructor(_containerElement?: HTMLElement) {
    this.containerElement = _containerElement;
  }
}
