import './App.css';
import {observer} from "mobx-react-lite"
import TasksStore from "./store";

const store = new TasksStore()

function App() {
    return <div class="app">
        <h2 class="blocktext">To Do List</h2>
        <label>
            <input
                class="blocktext"
                id="titleInput"
                type="text"
                placeholder="New item"
                maxlength="100"
                value={store.newTaskText}
                onChange={(event) =>
                    store.setNewTaskText(event.target.value)}
                onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                        store.addNewTask()
                    }
                }}
            />
        </label>
        <button class="btn" type="submit" onClick={store.addNewTask}>+</button>
        <div>
            {
                store.tasks.map((task) =>
                     <Task
                        text={task.text}
                        isDone={task.isDone}
                        toggleIsDone={store.toggleIsDone}
                        id={task.id}
                        removeItem={store.deleteTask}
                        toggleIsEditing={store.toggleIsEditing}
                        isEditing={task.isEditing}
                        editTask={store.editTask}
                    />
                )
            }
        </div>
    </div>
}

function Task({
                  id,
                  text,
                  toggleIsDone,
                  isDone,
                  removeItem,
                  toggleIsEditing,
                  isEditing,
                  editTask
}) {
    return <div class='parent'>
        <input
            class='checkbox'
            id='done'
            type={"checkbox"}
            checked={isDone}
            onChange={() => toggleIsDone(id)}
        />
        <label for='done'></label>
        {
            isEditing
                ? <input
                    value={text}
                    onChange={(event) => editTask(id, event.target.value)}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            toggleIsEditing(id)
                        }
                    }}
                />
                : <p id='text'>
                    {
                        text
                    }
                </p>
        }
        <button class='edit' type='submit' onClick={() => toggleIsEditing(id)}></button>
        <button class="delete" type='submit' onClick={() => removeItem(id)}></button>
    </div>
}
export default observer(App);