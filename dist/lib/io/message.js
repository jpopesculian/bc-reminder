"use strict";
exports.MOCK_FROM = '10123456789';
exports.MOCK_TO = '10000000000';
function mockMessage(message) {
    return {
        event: 'incomingSms',
        to: {
            type: 'Number',
            endpoint: exports.MOCK_TO
        },
        from: {
            type: 'Number',
            endpoint: exports.MOCK_FROM
        },
        message: message,
        timestamp: new Date,
        version: 1
    };
}
exports.mockMessage = mockMessage;
//# sourceMappingURL=message.js.map