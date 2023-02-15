import React, {useState} from 'react';
import TodoList from "./components/TodoList";
import mockTodoData from "./constants/mockTodoData";
import {TodoItem} from "./interface/TodoItem";

function App() {
    const [dataSource, setDataSource] = useState<TodoItem[]>(mockTodoData);

    return (
        <div>
            <TodoList title={'hello'} dataSource={dataSource}/>
        </div>
    );
}

export default App;
