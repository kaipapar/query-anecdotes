import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from './requests'

import axios from 'axios'

const App = () => {
  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote })

  const handleVote = (anecdote) => {
    console.log('vote')
  }
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if (result.isError){
    return <div>some error!</div>
  }

  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
        <form onSubmit={addAnecdote}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
