import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { takeLast } from 'rxjs/operators';
import { Tasks } from 'src/app/Todo-List-App/models/todo-interface';
import { TodoService } from '../../services/todo.service';


@Component({
    selector: '<todo-list></todo-list>',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
    animations: [
        trigger('fade', [
            // transition(':enter', [
            //     style({opacity: 0, transform: 'translateX(-30px)'}),
            //     animate(500, style({opacity:0, transform: 'translateY(0px)'}))
            // ]),
            // transition(':leave', [
            //     style({opacity: 0, transform: 'translateX(0px)'}),
            //     animate(500, style({opacity:0, transform: 'translateX(-30px)'}))
            // ])
        ])
    ]
})

export class TodoList{
    taskId: number;
    taskTitle: string;
    editing: boolean = false;
    tasks:Tasks[] = [];
    beforeEditing: string;
    today: number = Date.now();

    
    constructor(private todoService: TodoService){
    }
    ngOnInit(){
        this.beforeEditing = '';
        this.taskId;
        this.taskTitle = '';
        
    
        this.todoService
            .getTodo()
            .subscribe(data => this.tasks = data);
    }
    
    addTask() {
        // Trim the task title to remove leading and trailing whitespace
        const trimmedTaskTitle = this.taskTitle.trim();
    
        // Check if the task title is empty after trimming
        if (trimmedTaskTitle.length === 0) {
            alert('Task title cannot be empty!');
            return;
        }
    
        // Check if the task title exceeds a maximum length
        const maxLength = 50; // Example maximum length
        if (trimmedTaskTitle.length > maxLength) {
            alert(`Task title cannot exceed ${maxLength} characters!`);
            return;
        }
    
        // Check if the task title already exists in the tasks array
        if (this.tasks.some(task => task.title === trimmedTaskTitle)) {
            alert('Task already exists!');
            return;
        }
    
        // Create the task object
        const newTask: Tasks = {
            id: this.taskId,
            title: trimmedTaskTitle,
            completed: false,
            editing: false
        };
    
        // Add the task to the tasks array
        this.todoService.addTask(newTask)
            .subscribe((data: Tasks) => {
                // Add the newly created task to the tasks array
                this.tasks.push(data);
                // Clear the input field
                this.taskTitle = '';
            });
    }
    
       

    toggleEdit(event: Tasks){
        event.editing = !event.editing;
    }

    editTask(event: Tasks) {
        this.beforeEditing = event.title;
        event.editing = !event.editing;
        
        this.todoService.editTask(event.id, event)
          .subscribe(updatedTask => {
            // Find the index of the updated task in the tasks array
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            
            // If the task is found, replace it with the updated task
            if (index !== -1) {
              this.tasks[index] = updatedTask;
            }
          });
      }

    doneEditing(task: Tasks):void{
        if(task.title.trim().length === 0){
            task.title = this.beforeEditing;
        }
        task.editing = false;
    }

    cancelEditing(task: Tasks){
        task.title = this.beforeEditing;
        task.editing = false;
    }

    remaining(): number{
        return this.tasks.filter(task => !task.completed).length;
    }

    atleastOneCompleted(): boolean{
        return this.tasks.filter(task => task.completed).length > 0;
    }
    
    //delete function
    deleteTask(taskId){
        this.tasks = this.tasks.filter(task => task.id !== taskId);

        this.todoService.deleteTask(taskId)
            .subscribe(data => this.tasks.filter(task => {
                return task !== data;
            }))
    }

    deleteCompletedTask(){
        const selectedItems = this.tasks.filter(item => item.completed).map(i => i.id);
            console.log (selectedItems);
            
            selectedItems.forEach(value => {
                this.todoService.deleteTask(value)
                    .subscribe(res => {
                        this.tasks = this.tasks.filter(task => !task.completed);
                        });
            });

            // if(selectedProducts && selectedProducts.length === 1) {
            // }
            // else{
                // this.todoService.deleteAllTask(selectedProducts)
                // .subscribe(data => console.log("more than 1 elements"));
            // }
    }


    selectAll(event):void{
            this.tasks.forEach(x => x.completed = event.target.checked)
    }

    markTaskAsCompleted(taskId: number): void {
        this.todoService.markTaskAsCompleted(taskId)
          .subscribe(updatedTask => {
            // Update the task in the tasks array
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
              this.tasks[index] = updatedTask;
            }
          });
      }
}