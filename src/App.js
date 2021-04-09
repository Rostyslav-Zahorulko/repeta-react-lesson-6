// https://youtu.be/HbTuKWBf_Fk?t=89   - HTTP запросы (вебинар № 6)
// https://youtu.be/HbTuKWBf_Fk?t=460  - (GET запрос)
// https://youtu.be/HbTuKWBf_Fk?t=671  - (POST запрос)
// https://youtu.be/HbTuKWBf_Fk?t=900  - (DELETE запрос)
// https://youtu.be/HbTuKWBf_Fk?t=1047 - (PATCH запрос)
// https://youtu.be/HbTuKWBf_Fk?t=1426 - (подведение итогов)
// https://youtu.be/HbTuKWBf_Fk?t=1503 - (вынос запросов в отдельный файл)
// https://youtu.be/HbTuKWBf_Fk?t=2285 - (подведение итогов)

import { Component } from 'react';
import Container from './components/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import TodoFilter from './components/TodoFilter';
import Stats from './components/Stats';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
import todosApi from './services/todos-api';

const barStyles = {
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: 20,
};

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App componentDidMount');

    todosApi
      .fetchTodos()
      .then(todos => this.setState({ todos }))
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
    // console.log(prevState.todos);
    // console.log(this.state.todos);

    const prevTodos = prevState.todos;
    const nextTodos = this.state.todos;

    if (nextTodos !== prevTodos) {
      // console.log('Изменились todos');

      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
  }

  addTodo = text => {
    const todoData = {
      text,
      completed: false,
    };

    todosApi
      .addTodo(todoData)
      .then(todo => {
        this.setState(({ todos }) => ({
          todos: [...todos, todo],
        }));

        this.toggleModal();
      })
      .catch(error => console.log(error));
  };

  deleteTodo = todoId => {
    todosApi
      .deleteTodo(todoId)
      .then(() =>
        this.setState(({ todos }) => ({
          todos: todos.filter(({ id }) => id !== todoId),
        })),
      )
      .catch(error => console.log(error));
  };

  updateTodo = todoId => {
    const { todos } = this.state;
    const todo = todos.find(({ id }) => id === todoId);
    const { completed } = todo;
    const update = { completed: !completed };

    todosApi
      .updateTodo(todoId, update)
      .then(updatedTodo =>
        this.setState(({ todos }) => ({
          todos: todos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        })),
      )
      .catch(error => console.log(error));
  };

  filterTodos = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredTodos = () => {
    const { filter, todos } = this.state;
    const lowercasedFilter = filter.toLowerCase();

    return todos.filter(({ text }) =>
      text.toLowerCase().includes(lowercasedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodosCount = todos.length;
    const completedTodosCount = this.calculateCompletedTodos();
    const filteredTodos = this.getFilteredTodos();

    // console.log('render');

    return (
      <Container>
        <div style={barStyles}>
          <TodoFilter value={filter} onFilterTodos={this.filterTodos} />
          <Stats total={totalTodosCount} completed={completedTodosCount} />
          <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
            <AddIcon width="32" height="32" fill="#fff" />
          </IconButton>
        </div>

        <TodoList
          todos={filteredTodos}
          onDeleteTodo={this.deleteTodo}
          onUpdateTodo={this.updateTodo}
        />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onAddTodo={this.addTodo} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
