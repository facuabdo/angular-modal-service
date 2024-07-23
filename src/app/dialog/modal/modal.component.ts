import {
  BasePortalOutlet,
  CdkPortalOutlet,
  PortalModule,
  TemplatePortal,
} from "@angular/cdk/portal";
import {
  Component,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
  ViewChild,
  ViewEncapsulation,
  inject,
} from "@angular/core";

import { ComponentPortal } from "@angular/cdk/portal";
import { DialogRef } from "../dialog-ref";
import { OnInit } from "@angular/core";

@Component({
  selector: "hmf-modal",
  template: `
    <div class="hmf-modal">
      <div class="hmf-modal-header">
        <button (click)="closeModal()">Close</button>
      </div>
      <div class="hmf-modal-body" *cdkPortalOutlet></div>
    </div>
  `,
  styles: [
    `
      .hmf-modal-container {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .hmf-modal-backdrop {
        position: absolute;
        z-index: 1001;
        opacity: 1;
        background: #00000052;
        inset: 0;
        pointer-events: auto;
        -webkit-tap-highlight-color: transparent;
        transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .hmf-modal {
        position: relative;
        display: flex;
        z-index: 1001;
        justify-content: center;
        align-items: center;
        background: #FFF;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PortalModule],
})
export class ModalComponent extends BasePortalOutlet implements OnInit {
  injector = inject(Injector);

  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet: CdkPortalOutlet;

  constructor(public dialogRef: DialogRef) {
    super();
  }

  ngOnInit(): void {}

  override attachComponentPortal<T>(
    portal: ComponentPortal<T>
  ): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throw Error(
        "Attempting to attach dialog content after content is already attached"
      );
    }

    const result = this._portalOutlet.attachComponentPortal(portal);

    // this._contentAttached();

    return result;
  }
  override attachTemplatePortal<C>(
    portal: TemplatePortal<C>
  ): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
      throw Error(
        "Attempting to attach dialog content after content is already attached"
      );
    }

    const result = this._portalOutlet.attachTemplatePortal(portal);

    // this._contentAttached();

    return result;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
