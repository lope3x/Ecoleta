import React, { Fragment, FC } from 'react'

interface TitleProps {
    title: string,
    description?: string
}

const Title: FC<TitleProps> = ({title, description}) =>{
    return(
        <Fragment>
            <legend>
                <h2>{title}</h2>
                <span>{description}</span>
            </legend>
        </Fragment>
    );
};

export default Title;