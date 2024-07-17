import { useState, useCallback, useEffect } from "react";
import ReactModal from "react-modal";

import Styles from "./modal.module.scss";

import Icon from "../Icon";

const customStyles = {
  content: {},
};

ReactModal.setAppElement("#root");

const Modal = ({
  style = customStyles,
  onClose,
  isOpen,
  className,
  children,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={style}
      contentLabel="Example Modal"
      className={className}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export const MainModal = ({ title, onClose, children, ...props }) => {
  return (
    <Modal onClose={onClose} className={Styles["modal"]} {...props}>
      <div className={Styles["modal__container"]}>
        <header className={Styles["modal__header"]}>
          <h2 className={Styles["modal__heading"]}>{title}</h2>
          <div className={Styles["modal__exit-container"]}>
            <button className={Styles["modal__exit-button"]} onClick={onClose}>
              <Icon className={Styles["modal__exit-icon"]} icon="exit">
                Close
              </Icon>
            </button>
          </div>
        </header>
        <main className={Styles["modal__main"]}>{children}</main>
      </div>
    </Modal>
  );
};

export const SideModal = ({ title, onClose, children, ...props }) => {
  return (
    <Modal onClose={onClose} className={Styles["side-modal"]} {...props}>
      <div className={Styles["side-modal__container"]}>
        <header className={Styles["side-modal__header"]}>
          <h2 className={Styles["side-modal__heading"]}>{title}</h2>
          <div className={Styles["side-modal__exit-container"]}>
            <button
              className={Styles["side-modal__exit-button"]}
              onClick={onClose}
            >
              <Icon className={Styles["side-modal__exit-icon"]} icon="exit">
                Close
              </Icon>
            </button>
          </div>
        </header>
        <main className={Styles["side-modal__main"]}>{children}</main>
      </div>
    </Modal>
  );
};

// export default {
//   MainModal,
//   // SideModal,
//   // FullscreenModal,
// };
