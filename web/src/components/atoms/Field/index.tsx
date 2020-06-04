import React, { FC, ChangeEvent } from 'react';

interface FieldProps{
    htmlFor: string,
    type: string,
    name: string,
    id: string,
    labelText: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
};


const Field: FC <FieldProps> = (props) =>{
    const {htmlFor, type, name, id, labelText, onChange} = props;
    return(
        <div className ="field">
            <label htmlFor={htmlFor}>{labelText}</label>
            <input 
            type={type}
            name={name}
            id={id}
            onChange={onChange}
            />
        </div>
    )
}

export default Field;