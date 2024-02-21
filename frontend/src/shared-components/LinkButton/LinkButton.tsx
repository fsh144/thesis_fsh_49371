import React, { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const linkStyle: CSSProperties = {
    margin: '20px 10px',
};
const buttonStyle: CSSProperties = {
    minWidth: '200px',
};

interface Props {
    link: string,
    label: string,
    children?: ReactNode;
}

const LinkButton = ({ link, label } : Props) => {
    return (
        <Link to={link} style={linkStyle}>
            <Button variant="contained" style={buttonStyle}>
                {label}
            </Button>
        </Link>
    );
}

export default LinkButton;