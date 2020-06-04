import React, { Fragment } from 'react';
import logo from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

interface HeaderProps{
    backHome?: boolean
};

const backHomeButton = () =>{
    return (
        <Link to="/">
            <FiArrowLeft/>
            Voltar para Home
        </Link>
    );
}


const Header : React.FC<HeaderProps> = ({ backHome }) =>{

    return(
        <Fragment>
            <header>
                <img src = {logo} alt="Ecoleta" />
                {backHome && backHomeButton()}
            </header>
        </Fragment>
    );
}

export default Header;