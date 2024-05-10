import { Component, OnInit, inject } from "@angular/core";

import { DialogRef } from "src/app/dialog/dialog-ref";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.scss"],
})
export class ExampleComponent implements OnInit {
  dialogRef = inject(DialogRef);

  ngOnInit(): void {
    console.log("injected dialogref in hosted component", this.dialogRef);
  }
}
