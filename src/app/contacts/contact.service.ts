import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];

  private url = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Contact[] {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.url)
      .subscribe({
        next: (responseData) => {
          this.contacts = responseData.contacts || [];
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });

    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // Let Express generate the id
    contact.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{ message: string; contact: Contact }>(
        this.url,
        contact,
        { headers: headers }
      )
      .subscribe({
        next: (responseData) => {
          this.contacts.push(responseData.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(
      contact => contact.id === originalContact.id
    );

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(
        this.url + '/' + originalContact.id,
        newContact,
        { headers: headers }
      )
      .subscribe({
        next: () => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(
      c => c.id === contact.id
    );

    if (pos < 0) {
      return;
    }

    this.http
      .delete(this.url + '/' + contact.id)
      .subscribe({
        next: () => {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}