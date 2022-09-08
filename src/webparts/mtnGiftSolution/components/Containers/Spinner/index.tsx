import * as React from 'react'
import styles from './spinner.module.scss'

const Spinner = ({ size = "60" }) => {
    return (
        <div className={styles.spinner}>
            <svg
                className={styles.loader}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
            </svg>
        </div>

    );
};

export default Spinner