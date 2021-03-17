// https://youtu.be/w6MW1szKuT4?t=1343 (вебинар № 5)

// Модальное окно (componentDidMount и componentWillUnmount)
//    -  Проблема z-index, как решать без костылей (порталы)
//    -  Слушатель на keydown для Escape
//    -  Слушатель на клик по Backdrop

import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      // console.log('Нажали ESC, нужно закрыть модалку');

      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      // console.log('Кликнули в бэкдроп, нужно закрыть модалку');

      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
