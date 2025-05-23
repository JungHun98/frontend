'use client';

import Portal from '../Portal';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import React, { type HTMLAttributes, ReactNode, type Ref } from 'react';

interface DropdownProps {
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const DropdownMain = ({ className, children, ref }: DropdownProps) => {
  return (
    <div ref={ref} className={classNames(styles.dropdownContainer, className)}>
      {children}
    </div>
  );
};

interface DropdownTriggerProps {
  as: ReactNode;
}

const DropdownTrigger = ({ as }: DropdownTriggerProps) => {
  return as;
};

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  return <ul className={classNames(styles.dropdownMenu, className)}>{children}</ul>;
};

interface DropdownModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  controls?: ReactNode;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const DropdownModal = ({ isOpen, controls, children, ref, ...props }: DropdownModalProps) => {
  return (
    <Portal isOpen={isOpen}>
      <div className={styles.overlayWrapper}>
        <div className={styles.overlay} />
        <div ref={ref} className={styles.modalContent} {...props}>
          {children}
          {controls && <>{controls}</>}
        </div>
      </div>
    </Portal>
  );
};

interface DropdownItemProps {
  children: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const DropdownItem = ({ children, isSelected, onClick, className }: DropdownItemProps) => {
  return (
    <li
      className={classNames(styles.dropdownItem, className, { selected: isSelected })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

const Dropdown = Object.assign(DropdownMain, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Modal: DropdownModal,
  Item: DropdownItem,
});

export default Dropdown;
