import {
  REQUEST_TASKS,
  RECEIVED_TASKS,
  REQUEST_TASK_DETAIL,
  RECEIVED_TASK_DETAIL,
  REQUEST_UPDATE_TASK_DETAIL,
  TASK_DETAIL_UPDATED,
  REQUEST_PRIORITIES,
  RECEIVED_PRIORITIES,
  TASK_REMOVED
} from '../constants'

const requestFetchTasks = () => {
  return {
    type: REQUEST_TASKS
  }
}

export const fetchTasks = () => {
  return (dispatch, getStore) => {
    dispatch(requestFetchTasks())
    fetch("http://localhost:8000/api/v1/tasks", {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success)
        dispatch(receivedTasks(data.tasks))
    })
  }
}

const receivedTasks = (data) => {
  return {
    type: RECEIVED_TASKS,
    payload: data
  }
}


// Fetch Priorities
const requestFetchPriotities = () => {
  return {
    type: REQUEST_PRIORITIES
  }
}

export const fetchPriotities = () => {

  return (dispatch, getStore) => {
    dispatch(requestFetchPriotities())
    fetch("http://localhost:8000/api/v1/tasks/priorities", {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {

      if (data.success)
        dispatch(receivedPriorities(data.priorities))
    })
  }
}

const receivedPriorities = (data) => {
  return {
    type: RECEIVED_PRIORITIES,
    payload: data
  }
}

const requestFetchTaskDetail = () => {
  return {
    type: REQUEST_TASK_DETAIL
  }
}

export const fetchTaskDetail = (id) => {
  return (dispatch, getStore) => {
    dispatch(requestFetchTaskDetail())
    fetch(`http://localhost:8000/api/v1/tasks/${id}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {

      if (data.success)
        dispatch(receivedTaskDetail(data.taskDetail))
    })
  }
}

const receivedTaskDetail = (data) => {
  return {
    type: RECEIVED_TASK_DETAIL,
    payload: data
  }
}

const requestUpdateTaskDetail = () => {
  return {
    type: REQUEST_UPDATE_TASK_DETAIL
  }
}

export const updateTaskDetail = (taskDetail, id) => {
  return (dispatch, getStore) => {
    dispatch(requestUpdateTaskDetail())
    fetch(`http://localhost:8000/api/v1/tasks/${id}`, {
      method: 'put',
      body: JSON.stringify({task: taskDetail}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {

      if (data.success)
        dispatch(updatedTaskDetail(data.message))
    })
  }
}

const updatedTaskDetail = (data) => {
  return {
    type: TASK_DETAIL_UPDATED,
    payload: data
  }
}

export const removeTask = (id) => {
  return (dispatch, getStore) => {
    dispatch(requestUpdateTaskDetail())
    fetch(`http://localhost:8000/api/v1/tasks/${id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      dispatch(taskRemoved())
    })
  }
}

const taskRemoved = () => {
  return {
    type: TASK_REMOVED
  }
}
