import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];

  private url = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ message: string; messages: Message[] }>(this.url)
      .subscribe({
        next: (responseData) => {
          this.messages = responseData.messages || [];
          this.messageChangedEvent.emit(this.messages.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // Let Express generate the id
    message.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{ message: string; messageObj: Message }>(
        this.url,
        message,
        { headers: headers }
      )
      .subscribe({
        next: (responseData) => {
          this.messages.push(responseData.messageObj);
          this.messageChangedEvent.emit(this.messages.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(
      message => message.id === originalMessage.id
    );

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(
        this.url + '/' + originalMessage.id,
        newMessage,
        { headers: headers }
      )
      .subscribe({
        next: () => {
          this.messages[pos] = newMessage;
          this.messageChangedEvent.emit(this.messages.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(
      m => m.id === message.id
    );

    if (pos < 0) {
      return;
    }

    this.http
      .delete(this.url + '/' + message.id)
      .subscribe({
        next: () => {
          this.messages.splice(pos, 1);
          this.messageChangedEvent.emit(this.messages.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}