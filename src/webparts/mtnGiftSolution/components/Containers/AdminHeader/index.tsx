import * as React from 'react'
import styles from './styles.module.scss'
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import * as pnp from 'sp-pnp-js';
import { sp } from "@pnp/sp"


const AdminHeader = ({ title }) => {

    const [data, setData] = React.useState({ DisplayName: "", Email: "" })

    React.useEffect(() => {
        sp.profiles.myProperties.get()
            .then((response) => {
                setData(response)
            });
    }, [])
    return (
        <div className={styles.header}>
            <div className={styles.title}>{title}</div>

            <div className={styles.info}>
                <h3>{data.DisplayName}</h3>
                <p>{data.Email}</p>
            </div>
        </div>
    )
}

export default AdminHeader