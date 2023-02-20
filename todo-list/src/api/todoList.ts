import {TodoItem} from "../interface/TodoItem";

function readAllTodo() {
    const todoData: TodoItem[] = JSON.parse(sessionStorage.getItem('mockTodoData') as string);
    return todoData;
}

export function readTodo(): TodoItem[] {
    const todoData = readAllTodo();
    return todoData.filter(item => !item.deleted);
}

export const updateTodo = (id: number, payload: { data?: string, status?: string }) => {
    const data = readAllTodo()
    const newData = data.map(item => {
        if (item.id === id) {
            return {...item, ...payload}
        }
        return item
    })
    sessionStorage.setItem('mockTodoData', JSON.stringify(newData))
};
export const createTodo = (payload: string) => {
    const data = readAllTodo()
    const newTodo = {
        data: payload,
        status: 'active',
        id: data.length,
        deleted: false
    }
    sessionStorage.setItem('mockTodoData', JSON.stringify([...data, newTodo]))
};
export const deleteTodo = (id: number) => {
    const data = readAllTodo()
    const newData = data.map(item => {
        if (item.id === id) {
            return {...item, deleted: true}
        }
        return item
    })
    sessionStorage.setItem('mockTodoData', JSON.stringify(newData))
};

export const deleteCompleted = () => {
    const data = readAllTodo()
    const newData = data.map(item => {
        if (item.status === 'completed') {
            return {...item, deleted: true}
        }
        return item
    })
    sessionStorage.setItem('mockTodoData', JSON.stringify(newData))
};