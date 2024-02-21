
export interface QueryParamsObj {
    [key: string]: string | number;
}

export const getQueryParams = (paramsObj: QueryParamsObj | null) => {
    if (!paramsObj) {
        return '';
    }

    const paramsList = Object.keys(paramsObj).reduce((queryArrObj: string[], key) => {

        const { [key]: value } = paramsObj;

        return [
            ...queryArrObj,
            `${key}=${value}`,
        ];
    }, []);

    return `?${paramsList.join('&')}`;
};