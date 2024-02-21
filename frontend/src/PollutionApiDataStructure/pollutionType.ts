export interface PollutionTypeCreateData {
    name: string,
    displayName: string,
    description: string,
    unit: string,
}

export interface PollutionTypeResponseItem extends PollutionTypeCreateData {
    id: number,
}