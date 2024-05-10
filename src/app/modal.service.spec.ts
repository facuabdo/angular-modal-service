import { DialogService } from "./dialog/dialog.service";
import { TestBed } from "@angular/core/testing";

describe("ModalServiceService", () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
