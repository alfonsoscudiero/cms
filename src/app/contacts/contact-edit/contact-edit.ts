import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEdit {
  contact: Contact | null = null;
  groupContacts: Contact[] = [];

  constructor(
      private router: Router,
    ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
