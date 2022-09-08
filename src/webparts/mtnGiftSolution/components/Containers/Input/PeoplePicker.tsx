import * as React from 'react';
import { graph } from "@pnp/graph";
import '@pnp/graph/users';



const PeoplePicker = ({ onChange, value, title, required = false, filter, size = "mtn__child", readOnly = false, }) => {

    const [user, setUser] = React.useState([])
    React.useEffect(() => {
        graph.users.top(999).get().then(u => setUser(u));
    }, []);
    return <div className={`mtn__InputContainer ${size}`}>
        <label>{title} {required && <span className='required'>*</span>}</label>
        <input onChange={onChange} value={value} list="users" required={required} placeholder={title} readOnly={readOnly} />
        <datalist id="users">
            <option value="">{title}</option>
            {user.map(users => (
                <option value={users[filter]} key={users[filter]}>{users.displayName}</option>
            ))}
        </datalist>

    </div>;
};

export default PeoplePicker;
