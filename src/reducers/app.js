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


export function app(state = {}, action) {
  switch (action.type) {
  case REQUEST_TASKS:
    return {
      ...state,
      isLoaded: false
    }
  case RECEIVED_TASKS:
    return {
      ...state,
      isLoaded: true,
      allTasks: action.payload,
      taskRemoved: null
    }
  case REQUEST_TASK_DETAIL:
    return {
      ...state,
      isDetailLoaded: false
    }
  case RECEIVED_TASK_DETAIL:
    return {
      ...state,
      isDetailLoaded: true,
      taskDetail: action.payload
    }
  case REQUEST_PRIORITIES:
    return {
      ...state,
      isLoadedPriorities: false
    }
  case RECEIVED_PRIORITIES:
    return {
      ...state,
      isLoadedPriorities: true,
      priorities: action.payload
    }
  case REQUEST_UPDATE_TASK_DETAIL:
    return {
      ...state,
      isTaskUpdated: false
    }
  case TASK_DETAIL_UPDATED:
    return {
      ...state,
      isTaskUpdated: true,
      message: action.payload
    }
  case TASK_REMOVED:
    return {
      ...state,
      taskRemoved: true
    }
  default:
    return state;
  }
}
