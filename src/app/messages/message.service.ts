import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
@Injectable({
  providedIn: 'root',
})

export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId!: number;

  constructor(private http: HttpClient) {}

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = Number(message.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getMessages() {
    this.http
      .get<Message[]>(
        'https://byui-wdd430-cms-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe((messages: Message[]) => {
        console.log('Messages from Firebase:', messages);
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();
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

  storeMessages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http
      .put(
        'https://byui-wdd430-cms-default-rtdb.firebaseio.com/messages.json',
        this.messages,
        { headers: headers }
      )
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();

    this.messages.push(message);
    this.storeMessages();

    this.messageChangedEvent.emit(this.messages.slice());
  }
}
