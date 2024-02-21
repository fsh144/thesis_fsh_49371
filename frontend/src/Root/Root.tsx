import React from 'react';
import {
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import MonitoringStation from 'MonitoringStation';
import PollutionInfo from 'PollutionInfo';
import PollutionType from 'PollutionType';

const Root = () => {

    return (
        <Routes>
            <Route path="/pollution-types" element={<PollutionType />}/>
            <Route path="/monitoring-stations" element={<MonitoringStation />}/>
            <Route path="/pollution-info" element={<PollutionInfo />}/>
            <Route path="*" element={<Navigate to="/pollution-types" replace />}/>
        </Routes>
    );
};

export default Root;