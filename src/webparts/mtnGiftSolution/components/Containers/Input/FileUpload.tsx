import * as React from 'react';
import styles from './styles.module.scss'

const FileUpload = ({ onChange, title,multiple }) => {
    return <div className="mtn__InputContainer mtn__child">
        <div className={styles.uploadWrapper}>
            <button className={`mtn__btn ${styles.uploadBtn}`}>{title}</button>
            <input
                type="file"
                multiple={multiple}
                onChange={onChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
        </div>

    </div>;
};

export default FileUpload;
