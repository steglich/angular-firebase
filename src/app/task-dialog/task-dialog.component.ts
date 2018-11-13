import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  dialogTitle: string;
  task: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Task,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data ? `Atualizar Tarefa` : `Criar Tarefa`;
    this.task = this.data || {title: ''};
  }

  onSave(): void {
    const call = !!this.data ? `update` : `create`;
    this.taskService[call](this.task).then(() => {
      this.dialogRef.close();
    });
  }

}
