import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { DialogService } from "./dialog/dialog.service";
import { NgModule } from "@angular/core";
import { ExampleComponent } from './example/example/example.component';

@NgModule({
  declarations: [AppComponent, ExampleComponent],
  imports: [BrowserModule],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
