export const NOT_NULL_TEST = {
    "str": [{ "key": 'not-null', "params": ['str'] }],
    "num": [{ "key": 'not-null', "params": ['num'] }],
    "arr": [{ "key": 'not-null', "params": ['arr'] }],
    "obj": [{ "key": 'not-null', "params": ['obj'] }]
}
export const NOT_EMPTY_TEST = {
    "str": [{ "key": 'not-empty', "params": ['str'] }],
    "arr": [{ "key": 'not-empty', "params": ['arr'] }],
    "obj": [{ "key": 'not-empty', "params": ['obj'] }]
}
export const NOT_BLANK_TEST = {
    "str": [{ "key": 'not-blank', "params": ['str'] }],
    "num": [{ "key": 'not-blank', "params": ['num'] }],
    "arr": [{ "key": 'not-blank', "params": ['arr'] }],
    "obj": [{ "key": 'not-blank', "params": ['obj'] }]
}

export const MIN_MAX_RANGE = {
    "minInclude": [{ "key": 'min', "params": ['minInclude', "0"] }],
    "maxInclude": [{ "key": 'max', "params": ['maxInclude', "0"] }],
    "minExclude": [{ "key": 'min-exclude', "params": ['minExclude', "0"] }],
    "maxExclude": [{ "key": 'max-exclude', "params": ['maxExclude', "0"] }],
    "minmax": [{ "key": 'min', "params": ['minmax', "0"] }]
}

export const MIN_MAX_OPTIONAL = {
    "minInclude": [{ "key": 'min', "params": ['minInclude', "0"] }],
    "maxInclude": [{ "key": 'max', "params": ['maxInclude', "0"] }],
    "minExclude": [{ "key": 'min-exclude', "params": ['minExclude', "0"] }],
    "maxExclude": [{ "key": 'max-exclude', "params": ['maxExclude', "0"] }]
}

export const MIN_LENGTH_MAX_LENGTH_RANGE = {
    "minLength": [{ "key": 'min-length', "params": ['minLength', "1"] }],
    "maxLength": [{ "key": 'max-length', "params": ['maxLength', "5"] }],
    "both": [{ "key": 'min-length', "params": ['both', "1"] }]
}

export const MIN_LENGTH_MAX_LENGTH_OPTIONAL = {
    "minLength": [{ "key": 'min-length', "params": ['minLength', "1"] }],
    "maxLength": [{ "key": 'max-length', "params": ['maxLength', "5"] }]
}

export const REGEX_INVALID = {
    "regex": [{ "key": 'regex-donkey-or-monkey', "params": ['regex'] }],
    "email": [{ "key": 'regex-email', "params": ['email'] }]
}
export const REGEX_OPTIONAL = {
    "email": [{ "key": 'regex-email', "params": ['email'] }]
}