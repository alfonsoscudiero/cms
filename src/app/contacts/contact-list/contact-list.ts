import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
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

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription =
      this.contactService.contactListChangedEvent.subscribe(
        (contactsList: Contact[]) => {
          console.log('Contacts received:', contactsList);

          this.contacts = contactsList.slice();
          this.cdr.detectChanges();
        }
      );

    this.contactService.getContacts();
  }

  search(value: string) {
    this.term = value;
  }
}
