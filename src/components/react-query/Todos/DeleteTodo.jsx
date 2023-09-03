import {memo} from 'react';
import {useMutation, useQueryClient} from "react-query";

function DeleteTodo({id}) {

    const queryClient = useQueryClient()

    const {mutate} = useMutation(async () => {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        }
    })

    const handleClick = () => {
        mutate()
    }

    return (
        <button onClick={handleClick}>Delete Todo</button>
    );
}

export default memo(DeleteTodo);