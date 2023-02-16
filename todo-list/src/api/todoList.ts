import {TodoItem} from "../interface/TodoItem";

export function readTodo(): TodoItem[] {
    return JSON.parse(sessionStorage.getItem('mockTodoData') as string);
}

export const updateTodo = (id: number, payload: { status: string }) => {
    const data = readTodo()
    const newData = data.map(item => {
        if (item.id === id) {
            return {...item, ...payload}
        }
        return item
    })
    sessionStorage.setItem('mockTodoData', JSON.stringify(newData))
};
export const createTodo = (payload: string) => {
    const data = readTodo()
    const newTodo = {
        data: payload,
        status: 'active',
        id: data.length,
        deleted: false
    }
    sessionStorage.setItem('mockTodoData', JSON.stringify([...data, newTodo]))
};