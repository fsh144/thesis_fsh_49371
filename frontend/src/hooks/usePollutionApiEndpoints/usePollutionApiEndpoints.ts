import axios, { Method } from 'axios';
import { getQueryParams, QueryParamsObj} from './lib';

const {
    POLLUTION_API_URL: pollutionApiUrl = 'http://127.0.0.1:8000',
} = process.env;

type ObjectName = 'pollution-types' | 'monitoring-stations' | 'pollution-info';

/**
 * hook to use the Pollution API.
 * Basic CRUD methods, FlexibleRequest for more specific requests
 * @param objectName name of required object in Pollution API (pollution-types, monitoring-stations, pollution-info)
 */
const usePollutionApiEndpoints = (objectName: ObjectName) => {
    const instance = axios.create({
        baseURL: `${pollutionApiUrl}/monitoring-api/v1/${objectName}`,
    });

    const requests = {
        Get: (id: number, queryParamsObj: QueryParamsObj | null = null) => {
            return instance.get(`/${id}${getQueryParams(queryParamsObj)}`, );
        },
        GetAll: (queryParamsObj: QueryParamsObj | null = null) => {
            return instance.get(`/${getQueryParams(queryParamsObj)}`);
        },
        Create: (bodyData: object = {}) => {
            return instance.post('', bodyData);
        },
        FlexibleRequest: (
            type: Method,
            url: string,
            data: object = {},
            queryObj: object | null = null,
            headers: object = {},
        ) => {
            return instance.request({
                method: type,
                url,
                data,
                params: queryObj,
                headers,
            });
        },
    };

    return requests;
};

export default usePollutionApiEndpoints;