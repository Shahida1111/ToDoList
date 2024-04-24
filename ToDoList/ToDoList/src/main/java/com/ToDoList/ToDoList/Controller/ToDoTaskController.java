package com.ToDoList.ToDoList.Controller;

import com.ToDoList.ToDoList.Model.ToDoTask;
import com.ToDoList.ToDoList.Repository.TODoTaskRepository;
import com.ToDoList.ToDoList.Service.ToDoTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tasks")
public class ToDoTaskController {
    @Autowired
    private ToDoTaskService toDoTaskService;

    @GetMapping
    public List<ToDoTask> getTasks() {
        return toDoTaskService.getAllTasks();
    }

    @PostMapping
    public ToDoTask addTask(@RequestBody ToDoTask toDoTask) {
        return toDoTaskService.addTask(toDoTask);
    }

    @PutMapping("/{id}")
    public ToDoTask editTask(@PathVariable Long id, @RequestBody ToDoTask updatedTask) {
        updatedTask.setId(id);
        return toDoTaskService.editTask(id, updatedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        toDoTaskService.deleteTask(id);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<ToDoTask> markTaskAsCompleted(@PathVariable Long id) {
        ToDoTask updatedTask = toDoTaskService.markTaskAsCompleted(id);
        return ResponseEntity.ok().body(updatedTask);
    }
}
