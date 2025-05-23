'use client';

import styles from './ReviewDropdown.module.scss';
import classNames from 'classnames';
import { Fragment, useEffect } from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';

interface ReviewDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  autoOpen?: boolean;
}

const ReviewDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  autoOpen,
}: ReviewDropdownProps) => {
  const {
    isDropdownOpen,
    handleToggleDropdown,
    handleOpenDropdown,
    handleCloseDropdown,
    dropdownRef,
  } = useDropdown();

  useEffect(() => {
    if (autoOpen) {
      handleOpenDropdown();
    }
  }, [value]);

  return (
    <Dropdown ref={dropdownRef}>
      <Dropdown.Trigger
        as={
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={classNames(styles.reviewDropdownTrigger, {
              [styles.isOpen]: isDropdownOpen,
            })}
          >
            <span
              className={classNames(styles.reviewDropdownText, {
                [styles.placeholder]: !value,
              })}
            >
              {value || placeholder}
            </span>
            {isDropdownOpen ? <Icon icon="UpArrow" /> : <Icon icon="DownArrow" />}
          </button>
        }
      />
      {isDropdownOpen && (
        <Dropdown.Menu className={styles.reviewDropdownMenu}>
          {options.map((option, index) => (
            <Fragment key={option}>
              <Dropdown.Item
                className={styles.reviewDropdownItem}
                isSelected={value === option}
                onClick={() => {
                  onChange(option);
                  handleCloseDropdown();
                }}
              >
                {option}
              </Dropdown.Item>
              {index !== options.length - 1 && <Splitter color="subGray7" />}
            </Fragment>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default ReviewDropdown;
