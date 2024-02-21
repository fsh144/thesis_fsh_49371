import { useEffect, useState } from 'react';
import usePollutionApiEndpoints from 'hooks/usePollutionApiEndpoints';
import { PollutionTypeResponseItem } from 'PollutionApiDataStructure';

const useGetPollutionTypes = (): PollutionTypeResponseItem[] => {
    const { GetAll: getPollutionTypes } = usePollutionApiEndpoints("pollution-types");
    const [pollutionTypes, setPollutionTypes] = useState<PollutionTypeResponseItem[]>([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await getPollutionTypes() || {};
                const { data: rawData = [] }: { data: PollutionTypeResponseItem[] } = response;

                setPollutionTypes(rawData);

            } catch (error) {
                global.console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return pollutionTypes;
}

export default useGetPollutionTypes;