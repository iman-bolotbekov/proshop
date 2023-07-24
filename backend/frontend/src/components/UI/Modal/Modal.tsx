import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Card from '../Card/Card'
import styles from './Modal.module.css'

interface ModalProps extends React.PropsWithChildren {
  onConfirm: () => void
  title?: string
  message?: string
}

const BackDrop: React.FC<ModalProps> = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay: React.FC<ModalProps> = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>{props.children}</div>
    </Card>
  )
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
          children={props.children}
        />,
        document.getElementById('overlay-root')!
      )}
    </Fragment>
  )
}

export default Modal
