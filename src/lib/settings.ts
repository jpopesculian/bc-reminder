const flags = require("node-flags")

export interface SettingsOptions<T> {
    parsers : Parser[]
    name? : string
    validators? : Validator[]
    transformer? : (value : string) => T
    required? : boolean
}

export class Setting<T> {
    private value : T
    private loaded : boolean
    
    constructor(private options : SettingsOptions<T>) {
        this.loaded = false
    }
    
    private load () : void {
        this.loaded = true
        
        for (let parser of this.options.parsers) {
            let value = parser.parse()
            if (value === null) { continue }
            let valid = true
            if (this.options.validators) {
                for (let validator of this.options.validators) {
                    valid = validator.validate(value)
                    if (!valid) {
                        break
                    }
                }
            }
            if (valid) {
                this.value = this.options.transformer ? this.options.transformer(value) : value as any as T
                return
            }
        }
        if (this.options.required) {
            let message = "No valid value for required setting"
            if (this.options.name) {
                message += " -> " + this.options.name
            }
            throw new Error(message)
        }
        this.value = null
    }
    
    get () : T {
        if (!this.loaded) {
            this.load()
        }
        return this.value
    }
}

export enum ValidatorType {
    OneOf
}

export class Validator {
    constructor (private type: ValidatorType, private value?: any) {}
    
    validate (value : string) : boolean {
        switch (this.type) {
            case ValidatorType.OneOf:
                return this.validateOneOf(value)
        }
        return true
    }
    
    private validateOneOf (value : string) : boolean {
        return (this.value as string[]).indexOf(value) > -1
    }
}

export enum ParserType {
    Flag,
    Value,
    Env
}

export class Parser {
    constructor (private type: ParserType, private value: string) {}

    parse () : string {
        switch (this.type) {
            case ParserType.Flag:
                return this.parseFlag()
            case ParserType.Env:
                return this.parseEnv()
        }
        return this.value
    }

    private parseFlag () : string {
        return flags.get(this.value) || null
    }
    
    private parseEnv() : string {
        return process.env[this.value] || null
    }
}

export interface Settings {
    wit : {
        token: Setting<string>
    }
    environment: Setting<string>
    port: Setting<number>
    debugLevel: Setting<string>
    db: {
        host: Setting<string>
        port: Setting<number>
        name: Setting<string>
    }
}

export const settings : Settings = {
    wit: {
        token: new Setting<string>({
            name: "Wit Token",
            parsers: [
                new Parser(ParserType.Flag, 'wit-token'),
                new Parser(ParserType.Env, 'WIT_TOKEN')
            ],
            required: true
        })
    },
    
    environment: new Setting<string>({
        name: "Environment",
        parsers: [
            new Parser(ParserType.Flag, 'env'),
            new Parser(ParserType.Env, 'ENV'),
            new Parser(ParserType.Value, 'dev')
        ],
        required: true,
    }),
    
    port: new Setting<number>({
        name: "Port",
        parsers: [
            new Parser(ParserType.Flag, 'port'), 
            new Parser(ParserType.Env, 'PORT'), 
            new Parser(ParserType.Value, '5000')
        ],
        transformer: (value) => parseInt(value),
        required: true,
    }),
    
    debugLevel: new Setting<string>({
        name: "Debug Level",
        parsers: [
            new Parser(ParserType.Flag, 'debug'), 
            new Parser(ParserType.Env, 'DEBUG'), 
            new Parser(ParserType.Value, 'log')
        ],
        validators: [
            new Validator(ValidatorType.OneOf, ['debug', 'log', 'warn', 'error'])
        ],
        required: true
    }),
    
    db: {

        host: new Setting<string>({
            name: "DB Host",
            parsers: [
                new Parser(ParserType.Flag, 'db-host'), 
                new Parser(ParserType.Env, 'DB_HOST'), 
                new Parser(ParserType.Value, 'localhost')
            ],
            required: true
        }),
        
        port: new Setting<number>({
            name: "DB Port",
            parsers: [
                new Parser(ParserType.Flag, 'db-port'),
                new Parser(ParserType.Env, 'DB_PORT'),
                new Parser(ParserType.Value, '28015')
            ],
            transformer: (value) => parseInt(value),
            required: true
        }),
        
        name: new Setting<string>({
            name: "DB Name",
            parsers: [
                new Parser(ParserType.Flag, 'db-name'),
                new Parser(ParserType.Env, 'DB_NAME'),
                new Parser(ParserType.Value, 'bc_reminder')
            ],
            required: true
        })
    }
}

export default settings
