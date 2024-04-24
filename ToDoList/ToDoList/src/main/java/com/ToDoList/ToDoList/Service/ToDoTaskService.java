package com.ToDoList.ToDoList.Service;

import com.ToDoList.ToDoList.Model.ToDoTask;
import com.ToDoList.ToDoList.Repository.TODoTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ToDoTaskService {

    @Autowired
    private TODoTaskRepository toDoTaskRepository;

    public List<ToDoTask> getAllTasks() {
        return toDoTaskRepository.findAll();
    }

    public ToDoTask addTask(ToDoTask task) {
        return toDoTaskRepository.save(task);
    }

    public ToDoTask editTask(Long id, ToDoTask updatedTask) {
        // Set the ID of the updated task
        updatedTask.setId(id);

        // Save the updated task directly
        return toDoTaskRepository.save(updatedTask);
    }

    public void deleteTask(Long id) {
        toDoTaskRepository.deleteById(id);
    }

    public ToDoTask markTaskAsCompleted(Long id) {
        Optional<ToDoTask> optionalTask = toDoTaskRepository.findById(id);
        if (optionalTask.isPresent()) {
            ToDoTask task = optionalTask.get();
            task.setCompleted(true); // Mark the task as completed
            return toDoTaskRepository.save(task);
        } else {
            // Task not found, return null
            return null;
        }
    }

}
