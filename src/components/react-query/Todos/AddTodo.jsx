import {memo} from 'react';
import {useMutation, useQueryClient} from "react-query";

function AddTodo() {
    const queryClient = useQueryClient()

    const {mutate, isLoading} = useMutation(async (newTodo) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok) {
            throw new Error('Failed to add todo')
        }
        return await response.json()
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onSettled: (data,error, variables, context) => {
            if(error) {
                queryClient.setQueriesData('todos', (oldTodos) => {
                    return oldTodos.filter(todo => todo.id !== context.optimisticId)
                })
            }
        },
        optimisticUpdate: (newTodo) => {
            const optimisticId = Date.now().toString()
            queryClient.setQueriesData('todos', (oldTodos) => [
                ...oldTodos,
                {
                    ...newTodo,
                    id: optimisticId,
                    userId: 1,
                    completed: false
                }
            ])
            return {optimisticId}
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        mutate({
            title: event.target.elements.title.value,
            completed: false,
        })
        event.target.elements.title.value = ''
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='title' placeholder='New todo'/>

            <button type='submit' disabled={isLoading}>Add</button>
        </form>
    );
}

export default memo(AddTodo);