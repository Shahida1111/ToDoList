package com.ToDoList.ToDoList.Repository;

import com.ToDoList.ToDoList.Model.ToDoTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TODoTaskRepository  extends JpaRepository<ToDoTask, Long> {
}
