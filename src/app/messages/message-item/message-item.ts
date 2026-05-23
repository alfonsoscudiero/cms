import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})

export class MessageItem {
  @Input() message!: Message;

  messageSender!: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact: Contact | null = this.contactService.getContact(this.message.sender);

    if (contact) {
      this.messageSender = contact.name;
    }
  }
}