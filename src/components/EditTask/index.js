import React, {Component} from 'react';
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from 'reactstrap';
import DatePicker from 'react-date-picker';
import {
  updateTaskDetail
} from '../../actions'
class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      taskDetail: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.updateTask = this.updateTask.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {tasks, hideModal} = nextProps
    const self = this

    const {
      state: {
        dataLoaded
      }
    } = self

    if (tasks.isDetailLoaded != undefined && tasks.isDetailLoaded && !dataLoaded){

      self.setState(
        {
          taskDetail: tasks.taskDetail,
          dataLoaded: true
        }
      )
    }

    if (tasks.isTaskUpdated != undefined && tasks.isTaskUpdated){
      setTimeout(function () {
        hideModal()
      }, 1500);
    }
  }

  handleChange(e){
    const {
      state: {
        taskDetail
      }
    } = this

    taskDetail[e.target.name] = e.target.value

    this.setState({taskDetail})
  }

  handleDateChange(e){
    const {
      state: {
        taskDetail
      }
    } = this

    taskDetail['dueDate'] = e

    this.setState({taskDetail})
  }

  updateTask(){
    const {
      props: {
        updateTaskDetail
      },
      state: {
        taskDetail
      }
    } = this

    updateTaskDetail(taskDetail, taskDetail.id)
  }

  render() {
    const {
      props: {
        showEditModal,
        hideModal,
        tasks
      },
      state: {
        dataLoaded,
        taskDetail
      },
      handleChange,
      handleDateChange,
      updateTask
    } = this

    const task = (taskDetail == undefined) ? {} : taskDetail

    return (
      <div>
        <Modal isOpen={showEditModal} className={this.props.className}>
          <ModalHeader toggle={hideModal}>Modal title</ModalHeader>
          <ModalBody>
            {
              (tasks.isTaskUpdated != undefined && tasks.isTaskUpdated) &&
                <Alert color="success">
                  Task Updated successfully.
                </Alert>
            }

            {
              (!dataLoaded) ?
              <h1>Loading details</h1>
              :
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    value={task.title || ''}
                    name="title"
                    id="title"
                    placeholder="with a placeholder"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Description</Label>
                  <Input
                    type="textarea"
                    value={task.description || ''}
                    name="description"
                    id="exampleText"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Status</Label>
                  <Input type="select" name="status" onChange={handleChange} id="exampleSelect" defaultValue={task.status}>
                    <option value="Current Sprint">Current Sprint</option>
                    <option value="Completed">Completed</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Set Priority</Label>
                  <Input type="select" name="status" onChange={handleChange} id="exampleSelect" defaultValue={task.PriorityId} >
                    {
                      tasks.priorities.map(priority => {
                        return (
                          <option key={priority.id} value={priority.id}>{priority.name}</option>
                        )
                      })
                    }
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="title">Due Date</Label>
                  {
                    (task.dueDate != undefined) &&
                      <DatePicker
                        onChange={handleDateChange}
                        value={new Date(task.dueDate)}
                      />

                  }
                </FormGroup>

              </Form>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateTask}>Update Task</Button>{' '}
              <Button color="secondary" onClick={hideModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      tasks: state.app
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      updateTaskDetail: (taskDetail, id) =>  dispatch(updateTaskDetail(taskDetail, id))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);
