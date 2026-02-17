const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const date = await response.json()
  return date
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  return await response.json()
}

const updateVotes = async (id) => {
  const anecdote = await getAll().then(anecdotes => anecdotes.find(a => a.id === id))

  if (!anecdote) {
    throw new Error('Failed to find anecdote')
  }

  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }

  return await response.json()
}

export default { getAll, createNew, updateVotes }