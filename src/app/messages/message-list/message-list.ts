import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit {
  messages: Message[] = [];
  subscription!: Subscription;

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription =
      this.messageService.messageChangedEvent.subscribe(
        (messages: Message[]) => {
          console.log('Messages received:', messages);

          this.messages = messages.slice();
          this.cdr.detectChanges();
        }
      );

    this.messageService.getMessages();
  }
}