export interface Device {
    type : string
    endpoint : string
}

export interface MessageEvent {
    event : string
    to : Device
    from : Device
    message : string
    timestamp : Date
    version: number
}

export const MOCK_FROM = '10123456789'
export const MOCK_TO = '10000000000'

export function mockMessageEvent (message : string) : MessageEvent {
    return {
        event: 'incomingSms',
        to: {
            type: 'Number',
            endpoint: MOCK_TO
        },
        from: {
            type: 'Number',
            endpoint: MOCK_FROM
        },
        message: message,
        timestamp: new Date,
        version: 1
    }
}