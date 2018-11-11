import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() selectTask = new EventEmitter<Task>();
  @Output() performTask = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
  }

  executeAction(action: string): void {
    this[action].emit(this.task);
  }

}
