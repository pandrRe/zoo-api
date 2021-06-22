const CONFIG_VALUES = {
    SQLITE_DB_PATH: '../../local/development.db',
};

function FREEZE_CONFIG() {
    Object.freeze(CONFIG_VALUES);
}

function SET_TEST_VALUE(key, value) {
    if (!Object.isFrozen(CONFIG_VALUES)) {
        CONFIG_VALUES[key] = value;
    }
}

function CONFIG(key) {
    return CONFIG_VALUES[key];
}

module.exports = {
    CONFIG, SET_TEST_VALUE, FREEZE_CONFIG,
}