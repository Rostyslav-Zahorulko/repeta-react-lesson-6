import './TodoFilter.scss';

const TodoFilter = ({ value, onFilterTodos }) => (
  <div className="TodoFilter">
    <p className="TodoFilter__label">Фильтр по содержимому</p>
    <input
      type="text"
      className="TodoFilter__input"
      value={value}
      onChange={onFilterTodos}
    />
  </div>
);

export default TodoFilter;
