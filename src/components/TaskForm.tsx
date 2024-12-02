import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
// CSS
import styles from './TaskForm.module.css';


// Interface
import {ITask} from "../interfaces/Task"

interface Props { 
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>; // alterando o state de uma lista
  task?: ITask | null;
  hanldeUpdate?(id: number, title: string, difficulty: number) : void

}


const TaskForm = ({btnText, taskList, setTaskList, task, hanldeUpdate}: Props) => {


  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(0)


  useEffect(() => {

    if(task){
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }


  },[task])

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(hanldeUpdate){
      hanldeUpdate(id, title, difficulty)
      
    } else {
      const id = Math.floor(Math.random() * 1000) // criar um id aleatório
      const newTask: ITask = {id, title, difficulty}
  
      setTaskList!([...taskList, newTask])
      setTitle('')
      setDifficulty(0)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "title"){
      setTitle(e.target.value)
    } else{
      setDifficulty(parseInt(e.target.value))
    }
  }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input value={title} onChange={handleChange} type="text" name='title' placeholder='Título da tarefa'/>
      </div>

      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificludade:</label>
        <input value={difficulty} onChange={handleChange} type="text" name='difficulty' placeholder='Dificuldade da tarefa'/>
      </div>

      <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm
