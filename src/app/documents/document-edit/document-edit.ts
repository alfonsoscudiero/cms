import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})

export class DocumentEdit implements OnInit {
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
