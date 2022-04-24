import {makeAutoObservable} from "mobx";

class TasksStore {
    constructor() {
        makeAutoObservable(this)
    }

    tasks = []
    newTaskText = ''
    lastItemId = 0

    addNewTask = () => {
        this.tasks.push(this.createTask())
        this.newTaskText = ''
        this.lastItemId++
    }

    createTask = () => {
        return {text: this.newTaskText, isDone: false, id: this.lastItemId+1, isEditing: false}
    }

    toggleIsDone = (id) => {
        this.tasks = this.tasks.map((task) => {
            if (task.id !== id) {
                return task
            }
            return {...task, isDone: !task.isDone}
        }  )
    }

    deleteTask = (id) => {
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }

    toggleIsEditing = (id) => {
        this.tasks = this.tasks.map((task) => {
            if (task.id !== id) {
                return task
            }

            return {...task, isEditing: !task.isEditing}
        })
    }

    editTask = (id, value) => {
        this.tasks = this.tasks.map((task) => {
            if (task.id !== id) {
                return task
            }

            return {...task, text: value}
        })
    }

    setNewTaskText = (text) => {
        this.newTaskText = text
    }

}

export default TasksStore