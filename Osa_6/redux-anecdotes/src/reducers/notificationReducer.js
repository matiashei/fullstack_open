import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', visible: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return { message: action.payload, visible: true }
    },
    clearNotification() {
      return { message: '', visible: false }
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

let timeoutID

export const showNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer