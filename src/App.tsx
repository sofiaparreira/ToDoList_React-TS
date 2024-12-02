import React, { useState } from "react";

// CSS
import styles from "./App.module.css";

// components
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// Interface
import { ITask } from "./interfaces/Task";
import Modal from "./components/Modal";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) =>  {
    const modal = document.getElementById("modal");

    if(display === true){
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask) : void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)
  };

  const updateTask = (id: number, title: string, difficulty: number)  => {
    const updatedTask: ITask = {id, title, difficulty}
    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)
    hideOrShowModal(false)
  }

  return (
    <div>
      <Modal>
        <TaskForm
          taskList={taskList}
          btnText="Criar Tarefa"
          setTaskList={setTaskList}
          task={taskToUpdate}
          hanldeUpdate={updateTask}
          
        />
      </Modal>

      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer? </h2>
          <TaskForm
            taskList={taskList}
            btnText="Criar Tarefa"
            setTaskList={setTaskList}
          />
        </div>

        <div>
          <h2>Suas tarefas</h2>
          <TaskList handleEdit={editTask} handleDelete={deleteTask} taskList={taskList} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
