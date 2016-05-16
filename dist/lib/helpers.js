"use strict";
function firstEntityValue(entities, name) {
    const entity = entities[name];
    if (Array.isArray(entity) && entity.length > 0) {
        const value = entity[0].value;
        return typeof value === "object" ? value.value : value;
    }
    return undefined;
}
exports.firstEntityValue = firstEntityValue;
//# sourceMappingURL=helpers.js.map