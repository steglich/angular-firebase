import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from 'angularfire2/firestore';
import { Task } from './models/task.model';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {

  tasks: AngularFirestoreCollection<Task>;

  constructor(
    private db: AngularFirestore
  ) {
    this.setTasks();
   }

  private setTasks(): void {
    this.tasks = this.db.collection<Task>('/tasks',
      (ref: CollectionReference) => ref.orderBy('done', 'asc').orderBy('title', 'asc'));
  }

  create(task: Task): Promise<void> {
    const uid = this.db.createId();
    return this.tasks.doc<Task>(uid).set({
      uid: uid,
      title: task.title,
      done: false
    });
  }

  update(task: Task): Promise<void> {
    return this.tasks.doc<Task>(task.uid).update(task);
  }

  delete(task: Task): Promise<void> {
    return this.tasks.doc<Task>(task.uid).delete();
  }

  getTask(uid: string): Observable<Task> {
    return this.tasks.doc<Task>(uid).valueChanges();
  }
}
