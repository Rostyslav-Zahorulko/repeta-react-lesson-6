import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

const fetchTodos = () => axios.get('/todos').then(({ data }) => data);

const addTodo = todo => axios.post('/todos', todo).then(({ data }) => data);

const deleteTodo = todoId => axios.delete(`/todos/${todoId}`);

const updateTodo = (todoId, update) =>
  axios.patch(`/todos/${todoId}`, update).then(({ data }) => data);

const todosApi = { fetchTodos, addTodo, deleteTodo, updateTodo };

export default todosApi;
