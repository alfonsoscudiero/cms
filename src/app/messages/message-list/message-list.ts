import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [
    new Message(
      '1',
      'Grades Posted',
      'The grades for this assignment have been posted',
      'Bro. Jackson'
    ),
    new Message(
      '2',
      'Assignment Question',
      'When is assignment 3 due',
      'Steve Johnson'
    ),
    new Message(
      '3',
      'Assignment Due Date',
      'Assignment 3 is due on Saturday at 11:30 PM',
      'Bro. Jackson'
    ),
    new Message(
      '4',
      'Need Help',
      'Can I meet with you sometime. I need help with assignment 3',
      'Mark Smith'
    )
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
