import React, { ChangeEvent, CSSProperties } from 'react';
import Switch from '@mui/material/Switch';

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        margin: '0 10px',
        color: '#EBEBEB',
    },
};

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
    leftLabel: string,
    rightLabel: string,
}

const TwoOptionalSwitch = ({ leftLabel, onChange, rightLabel }: Props) => {
    return (
        <div style={styles.container}>
            <div style={styles.label}>{leftLabel}</div>
            <Switch
                color="default"
                size="medium"
                onChange={onChange}
            />
            <div style={styles.label}>{rightLabel}</div>
        </div>
    );
};

export default TwoOptionalSwitch;