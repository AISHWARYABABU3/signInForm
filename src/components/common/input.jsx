//This input component can used as a re-useable component 

import React from 'react';

const Input = ({ name, label, value, error, onChange}) => {
    return ( 
        <div>
            <label className="labelstyels" htmlFor={name}>{label}</label>
            <input type="text" 
                    name={name} 
                    value = {value}
                    onChange = {onChange}
                    id={name}
                    className = "textbox"/>
        {error && <div className="errormessage">{error}</div>}            
        </div>                 
     );
}
 
export default Input;