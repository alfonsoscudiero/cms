import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})

export class ContactList implements OnInit {
  contacts: Contact[] = [];
  subscription!: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }
  ngOnInit() {
    this.subscription =
      this.contactService.contactListChangedEvent.subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
      );
  }

  search(value: string) {
    this.term = value;
  }
}
