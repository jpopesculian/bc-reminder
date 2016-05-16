"use strict";
const flags = require("node-flags");
class Setting {
    constructor(options) {
        this.options = options;
        this.loaded = false;
    }
    load() {
        this.loaded = true;
        for (let parser of this.options.parsers) {
            let value = parser.parse();
            if (value === null) {
                continue;
            }
            let valid = true;
            if (this.options.validators) {
                for (let validator of this.options.validators) {
                    valid = validator.validate(value);
                    if (!valid) {
                        break;
                    }
                }
            }
            if (valid) {
                this.value = this.options.transformer ? this.options.transformer(value) : value;
                return;
            }
        }
        if (this.options.required) {
            let message = "No valid value for required setting";
            if (this.options.name) {
                message += " -> " + this.options.name;
            }
            throw new Error(message);
        }
        this.value = null;
    }
    get() {
        if (!this.loaded) {
            this.load();
        }
        return this.value;
    }
}
exports.Setting = Setting;
(function (ValidatorType) {
    ValidatorType[ValidatorType["OneOf"] = 0] = "OneOf";
})(exports.ValidatorType || (exports.ValidatorType = {}));
var ValidatorType = exports.ValidatorType;
class Validator {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    validate(value) {
        switch (this.type) {
            case ValidatorType.OneOf:
                return this.validateOneOf(value);
        }
        return true;
    }
    validateOneOf(value) {
        return this.value.indexOf(value) > -1;
    }
}
exports.Validator = Validator;
(function (ParserType) {
    ParserType[ParserType["Flag"] = 0] = "Flag";
    ParserType[ParserType["Value"] = 1] = "Value";
    ParserType[ParserType["Env"] = 2] = "Env";
})(exports.ParserType || (exports.ParserType = {}));
var ParserType = exports.ParserType;
class Parser {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    parse() {
        switch (this.type) {
            case ParserType.Flag:
                return this.parseFlag();
            case ParserType.Env:
                return this.parseEnv();
        }
        return this.value;
    }
    parseFlag() {
        return flags.get(this.value) || null;
    }
    parseEnv() {
        return process.env[this.value] || null;
    }
}
exports.Parser = Parser;
exports.settings = {
    wit: {
        token: new Setting({
            name: "Wit Token",
            parsers: [
                new Parser(ParserType.Flag, 'wit-token'),
                new Parser(ParserType.Env, 'WIT_TOKEN')
            ],
            required: true
        })
    },
    environment: new Setting({
        name: "Environment",
        parsers: [
            new Parser(ParserType.Flag, 'env'),
            new Parser(ParserType.Env, 'ENV'),
            new Parser(ParserType.Value, 'dev')
        ],
        required: true,
    }),
    port: new Setting({
        name: "Port",
        parsers: [
            new Parser(ParserType.Flag, 'port'),
            new Parser(ParserType.Env, 'PORT'),
            new Parser(ParserType.Value, '5000')
        ],
        transformer: (value) => parseInt(value),
        required: true,
    }),
    debugLevel: new Setting({
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
        host: new Setting({
            name: "DB Host",
            parsers: [
                new Parser(ParserType.Flag, 'db-host'),
                new Parser(ParserType.Env, 'DB_HOST'),
                new Parser(ParserType.Value, 'localhost')
            ],
            required: true
        }),
        port: new Setting({
            name: "DB Port",
            parsers: [
                new Parser(ParserType.Flag, 'db-port'),
                new Parser(ParserType.Env, 'DB_PORT'),
                new Parser(ParserType.Value, '28015')
            ],
            transformer: (value) => parseInt(value),
            required: true
        }),
        name: new Setting({
            name: "DB Name",
            parsers: [
                new Parser(ParserType.Flag, 'db-name'),
                new Parser(ParserType.Env, 'DB_NAME'),
                new Parser(ParserType.Value, 'bc_reminder')
            ],
            required: true
        })
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.settings;
//# sourceMappingURL=settings.js.map