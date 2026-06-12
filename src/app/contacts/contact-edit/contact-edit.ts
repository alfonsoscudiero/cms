import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEdit {
  originalContact: Contact | null = null;
  contact: Contact | null = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if (this.id == null) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.id);

        if (this.originalContact == null) {
          return;
        }

        this.editMode = true;

        this.contact = JSON.parse(
          JSON.stringify(this.originalContact)
        );

        if (this.originalContact.group) {
          this.groupContacts = JSON.parse(
            JSON.stringify(this.originalContact.group)
          );
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }  

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
