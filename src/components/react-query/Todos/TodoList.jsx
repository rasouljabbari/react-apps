import { memo } from 'react';
import { useQuery } from "react-query";
import DeleteTodo from "./DeleteTodo";
import AddTodo from "./AddTodo";

function TodoList() {

    const { data: todos, error } = useQuery('todos', async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        return await response.json()
    }, {
        staleTime: 10000, // 10 seconds
        cacheTime: 60000, // 1 minute
        staleWhileRevalidate: true,
        suspense: true
    })

    console.log(error, todos);

    return (
        <>
            <ul>
                {
                    todos.map(({ id, title }) => (
                        <li key={id}>{title} <DeleteTodo id={id} /></li>
                    ))
                }
                <div>{vsdvdsvdsv}</div>
            </ul>
            <AddTodo />
        </>
    );
}

export default memo(TodoList);