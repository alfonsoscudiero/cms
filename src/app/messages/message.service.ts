import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from './message.model';
@Injectable({
  providedIn: 'root',
})

export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];

  constructor(private http: HttpClient) {}


  getMessages() {
    this.http
      .get<Message[]>(
        'https://byui-wdd430-cms-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe((messages: Message[]) => {
        console.log('Messages from Firebase:', messages);
        this.messages = messages || [];
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);

    this.messageChangedEvent.emit(this.messages.slice());
  }
}
