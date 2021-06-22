const { SET_TEST_VALUE } = require("../src/config/values");

async function setup() {
    SET_TEST_VALUE("SQLITE_DB_PATH", "../../local/testing.db");
}

module.exports = async () => {
    SET_TEST_VALUE("SQLITE_DB_PATH", "../../local/testing.db");
};
