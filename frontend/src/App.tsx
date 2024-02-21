import React from 'react';
import Root from 'Root';
import { BrowserRouter } from "react-router-dom";
import LinkButton from 'shared-components/LinkButton';
import reactLogo from './react-logo.svg';
import pythonLogo from './python-logo.svg';
import postgresqlLogo from './postgresql-logo.svg';
import './App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <img src={postgresqlLogo} className="App-logo" alt="logo"/>
                    <img src={pythonLogo} className="App-logo" alt="logo"/>
                    <img src={reactLogo} className="App-logo" alt="logo"/>
                    <h4 style={{right: '10px', top: 0, position: 'absolute', color: '#EBEBEB'}}>
                        Farhad Shukurov<br/>Student ID: 49371<br/>WSB University
                    </h4>
                    <div>
                        <LinkButton link="/pollution-types" label="Pollution Types" />
                        <LinkButton link="/monitoring-stations" label="Monitoring Stations" />
                        <LinkButton link="/pollution-info" label="Pollution Info" />
                    </div>
                    <Root/>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
