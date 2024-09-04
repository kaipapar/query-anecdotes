import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)