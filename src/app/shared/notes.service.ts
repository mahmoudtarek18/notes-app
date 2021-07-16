import { Note } from './note.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  noteSubject = new Subject<Note[]>();
  notes: Note[] = new Array<Note>();
  constructor() { }

  getAll() {
    this.notes = JSON.parse(localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : [];
    return this.notes;
  }

  get(id: number) {
    this.notes = JSON.parse(localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : [];
    return this.notes[id];
  }

  getId(note: Note) {
    // this.notes = JSON.parse(localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : [];
    return this.notes.indexOf(note);
  }

  add(note: Note) {
    this.notes = JSON.parse(localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : [];
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    console.log(this.notes)
    localStorage.setItem('notes', JSON.stringify(this.notes));
    return index;
  }

  update(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  delete(id: number) {
    this.notes.splice(id, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.noteSubject.next(this.notes);
    console.log(this.notes)
  }
}
