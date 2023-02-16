import React, {useEffect, useState} from 'react';
import TodoList from "./components/TodoList";
import mockTodoData from "./constants/mockTodoData";
import {TodoItem} from "./interface/TodoItem";

if (!sessionStorage.getItem('mockTodoData')) {
    sessionStorage.setItem('mockTodoData', JSON.stringify(mockTodoData))
}

function App() {
    const [dataSource, setDataSource] = useState<TodoItem[]>(mockTodoData);
    useEffect(() => {
        setDataSource(JSON.parse(sessionStorage.getItem('mockTodoData') as string))
    }, []);

    const handleUpdate = (newData: TodoItem[]) => {
        setDataSource(newData)
        sessionStorage.setItem('mockTodoData', JSON.stringify(newData))
    };
    return (
        <div>
            <TodoList title={'hello'} dataSource={dataSource} onUpdate={handleUpdate}/>
        </div>
    );
}

export default App;
