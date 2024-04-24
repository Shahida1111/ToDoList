import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Tasks } from '../models/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:8080/tasks';

  constructor() { }

  getTodo(): Observable<Tasks[]> {
    return from(
      fetch(this.baseUrl)
        .then(response => response.json())
    );
  }

  getTasks(): Observable<Tasks[]> {
    return from(
      fetch(this.baseUrl)
        .then(response => response.json())
    );
  }

  addTask(task: Tasks): Observable<Tasks> {
    return from(
      fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      .then(response => response.json())
    );
  }

  editTask(id: number, task: Tasks): Observable<Tasks> {
    return from(
      fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      .then(response => response.json())
    );
  }

  editTodo(task: Tasks): Observable<Tasks> {
    return from(
      fetch(`${this.baseUrl}/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      .then(response => response.json())
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return from(
      fetch(`${this.baseUrl}/${taskId}`, {
        method: 'DELETE'
      })
      .then(() => {})
    );
  }

  deleteCompletedTasks(completedTaskIds: number[]): Observable<void> {
    // Implement deleteCompletedTasks logic using Fetch API if needed
    throw new Error('Method not implemented.');
  }

  markTaskAsCompleted(taskId: number): Observable<Tasks> {
    return new Observable<Tasks>((observer) => {
      fetch(`${this.baseUrl}/${taskId}/complete`, { method: 'PUT' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
