import classNames from 'classnames';
import Todo from '../Todo';
import './TodoList.scss';

const TodoList = ({ todos, onDeleteTodo, onUpdateTodo }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          text={text}
          completed={completed}
          onDelete={() => onDeleteTodo(id)}
          onUpdate={() => onUpdateTodo(id)}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
