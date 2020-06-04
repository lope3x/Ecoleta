import React, { FC } from 'react';



interface Item {
    item : {
        id: number,
        image_url: string,
        title: string,
    },
    handleSelectItem: (id:number) =>void,
    selected: boolean,
}


const Item: FC <Item> = (props) =>{
    const {image_url, title, id} = props.item;
    const { handleSelectItem, selected} = props;
    return(
        <li onClick={()=>handleSelectItem(id)} className={selected ? 'selected': ''}>
            <img src={image_url} alt={title}/>
            <span>{title}</span>
        </li>
    );
}

export default Item;