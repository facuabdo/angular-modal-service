import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from "@angular/core";

import { DialogService } from "./dialog/dialog.service";
import { ExampleComponent } from "./example/example/example.component";

@Component({
  selector: "app-root",
  template: `<button (click)="openModalFromTemplate()">
      Open Modal From Template
    </button>
    <button (click)="openModalFromComponent()">
      Open Modal From Component
    </button>
    <ng-template #template
      ><h1>This is the projected content</h1></ng-template
    >`,
})
export class AppComponent {
  modalService = inject(DialogService);
  viewContainerRef = inject(ViewContainerRef);

  @ViewChild("template", { static: true }) templateRef!: TemplateRef<any>;

  constructor() {
    this.modalService.init(this.viewContainerRef);
  }

  openModalFromTemplate() {
    const modalRef = this.modalService.open(this.templateRef);
  }

  openModalFromComponent() {
    const modalRef = this.modalService.open(ExampleComponent);

    setTimeout(() => modalRef.close(), 3000);
  }
}
