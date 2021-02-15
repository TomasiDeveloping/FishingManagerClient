import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-rules',
  templateUrl: './edit-rules.component.html',
  styleUrls: ['./edit-rules.component.css']
})
export class EditRulesComponent implements OnInit {
  @Input() clubForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  get rules(): FormArray {
    return this.clubForm.get('rules') as FormArray;
  }

  onAddRule(): void {
    this.rules.push(this.newRule());
  }

  newRule(): FormGroup {
    return new FormGroup({
      rule: new FormControl(''),
    });
  }

  onSubmit(): void {
    console.log(this.clubForm.value);
  }
}
