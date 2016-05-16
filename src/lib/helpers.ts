export interface Entities {
    [entity: string]: any
}

export function firstEntityValue (entities: Entities, name: string) : any {
    const entity = entities[name]
    if (Array.isArray(entity) && entity.length > 0) {
        const value = entity[0].value
        return typeof value === "object" ? value.value : value
    }
    return undefined
}