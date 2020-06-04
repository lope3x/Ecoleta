import React, { FC, ChangeEvent } from 'react';

interface SelectOptionProps{
    data: string[],
    value: string,
    name: string,
    title: string,
    onChange: (event:ChangeEvent<HTMLSelectElement>) => void
    
} 


const SelectOption: FC<SelectOptionProps> = (props) =>{

    const { data,value , name, title, onChange } = props;
    return(
        <select name={name} id={name} onChange ={onChange} value={value}>
            <option value="0">{title}</option>
                {data.map(item=>(
                    <option key={item} value={item}>{item}</option>
            ))}
        </select>
    )
}

export default SelectOption;