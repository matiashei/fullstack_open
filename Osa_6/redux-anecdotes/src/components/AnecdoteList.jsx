import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote =>
      anecdote?.content?.toLowerCase().includes((state.filter || '').toLowerCase())
    )
  })

  const voteAnecdote = async (id, content) => {
    dispatch(vote(id))
    dispatch(showNotification(`You voted '${content}'`, 5))
  }

  return (
    [...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    ))
  )
}

export default AnecdoteList