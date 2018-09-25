import React, { Component } from 'react'
import TableHeader from './Table/Header'
import EditTaskModal from './EditTask'
import {
  Table,
  ButtonGroup,
  Button,
  Alert,
} from 'reactstrap'

import {
  FaEdit,
  FaTrash,
} from 'react-icons/fa'

import { connect } from 'react-redux'
import {
  fetchTasks,
  fetchTaskDetail,
  fetchPriotities,
  removeTask
} from '../actions'

import Pusher from 'pusher-js';

Pusher.logToConsole = true;

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
      selectedTaskId: 0
    }
    this.editTask = this.editTask.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.removeTask = this.removeTask.bind(this)
  }


  componentDidMount() {
    const {
      props: {
        fetchTasks,
        fetchPriotities
      }
    } = this
    const pusher = new Pusher('21c9384720b7ed56a91b', {
      cluster: 'ap2',
      forceTLS: true
    });
    fetchTasks()
    fetchPriotities()
    const channel = pusher.subscribe('Task-development');
    channel.bind('task-added', (data) =>{
      fetchTasks()
    });

    channel.bind('task-deleted', (data) =>{
      fetchTasks()
    });

    channel.bind('task-updated', (data) =>{
      fetchTasks()
    });
  }

  editTask(e) {
    const {
      props: {
        fetchTaskDetail
      }
    } = this
    fetchTaskDetail(e.target.id)
    this.setState({
      showEditModal: true,
      selectedTaskId: e.target.id
    })
  }

  hideModal(e) {
    this.setState({
      showEditModal: false,
      selectedTaskId: 0
    })
  }

  removeTask(e) {
    const {
      props: {
        removeTask
      }
    } = this

    removeTask(e.target.id)
  }

  //Render HTML
  render() {
    const {
      props: {
        tasks
      },
      editTask,
      hideModal,
      removeTask,
      state: {
        showEditModal
      },
    } = this

    const showLoading =  (tasks.isLoaded == undefined || tasks.allTasks == undefined)
    let tableHeadings = []
    if (tasks.allTasks != undefined)
      tableHeadings = Object.keys(tasks.allTasks[0])

    delete tableHeadings["PriorityId"]

    return (
      <div>
        <div className='main-header'>
          <h2>Tasks</h2>
            {
              (tasks.taskRemoved != undefined && tasks.taskRemoved) &&
                <Alert color="success">
                  Task removed successfully.
                </Alert>
            }

        </div>

        <div className="container">
          <div className="row">
            { showLoading &&
              <h1>Loading new tasks.</h1>
            }
            { !showLoading &&
              <Table>
                <TableHeader
                  columns={tableHeadings}
                />
                <tbody>
                  {
                    tasks.allTasks.map(item => {
                      return (
                        <tr key={item.id}>
                          {
                            tableHeadings.map(column => {
                              let columnValue
                              if (column == 'Priority')
                                columnValue = item[column].name
                              else columnValue = item[column]
                              return (
                                <td key={column}>{columnValue}</td>
                              )
                            })
                          }
                          <td>
                            <ButtonGroup>
                              <Button color="primary" id={item.id} onClick={editTask}><FaEdit /> Edit</Button>
                              <Button color="danger" id={item.id} onClick={removeTask}><FaTrash /> Delete</Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>

              </Table>
            }

          </div>
        </div>
        {
          showEditModal &&
          <EditTaskModal
            showEditModal={showEditModal}
            hideModal={hideModal}
          />
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: state.app
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: () =>  dispatch(fetchTasks()),
    fetchTaskDetail: id =>  dispatch(fetchTaskDetail(id)),
    fetchPriotities: () =>  dispatch(fetchPriotities()),
    removeTask: id =>  dispatch(removeTask(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
