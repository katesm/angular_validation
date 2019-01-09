import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-validation",
  templateUrl: "./validation.component.html",
  styleUrls: ["./validation.component.css"]
})
export class ValidationComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() valdationName: string;
  @Input() valdationMessage: string;
  control: FormControl;

  constructor() {}

  ngOnInit() {
    this.control = this.form.controls[this.controlName] as FormControl;
  }


  inError(): boolean {
    return this.control.invalid && this.control.dirty;
  }
  // Checks for specific error on control and validator
  vError(validator?: string): boolean {
    return this.inError() && this.control.errors[validator || this.valdationName];
  }
}
