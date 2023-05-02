import React, {memo} from 'react';
import {useQuery} from "react-query";
import DeleteTodo from "./DeleteTodo";
import AddTodo from "./AddTodo";

function TodoList() {

    const {data, isLoading, isError} = useQuery('todos', async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        return await response.json()
    }, {
        staleTime: 10000, // 10 seconds
        cacheTime: 60000, // 1 minute
        staleWhileRevalidate: true
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading data</div>

    return (
        <>

            <ul>
                {
                    data.map(({id, title}) => (
                        <li key={id}>{title} <DeleteTodo id={id}/></li>
                    ))
                }
            </ul>
            <AddTodo/>
        </>
    );
}

export default memo(TodoList);