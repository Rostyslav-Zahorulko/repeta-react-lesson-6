import { Component } from 'react';

import './TodoEditor.scss';

class TodoEditor extends Component {
  state = {
    message: '',
  };

  handleChange = event => {
    this.setState({ message: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { message } = this.state;

    // if (message !== '') {
    this.props.onAddTodo(message);

    this.setState({ message: '' });
    // }
  };

  render() {
    const { message } = this.state;

    return (
      <form className="TodoEditor" onSubmit={this.handleSubmit}>
        <textarea
          className="TodoEditor__textarea"
          value={message}
          onChange={this.handleChange}
        ></textarea>
        <button type="submit" className="TodoEditor__button">
          Добавить
        </button>
      </form>
    );
  }
}

export default TodoEditor;
