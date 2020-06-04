import React from 'react';
import Item from '../../atoms/Item';


interface ItemsGrid {
    items : {
        id: number,
        image_url: string,
        title: string, 
    }[],
    handleSelectItem: (id:number) => void,
    selectedItems: number[]
}


const ItemsGrid: React.FC <ItemsGrid>  = ({ items, handleSelectItem, selectedItems }) =>{
    return (
        <ul className="items-grid">
            {items.map((item) => 
                <Item 
                    key={item.id} 
                    item = {item} 
                    handleSelectItem = {handleSelectItem} 
                    selected = {selectedItems.includes(item.id)}
                />
            )}
        </ul> 
    )
}

export default ItemsGrid;