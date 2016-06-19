let getBabelRelayPlugin = require("babel-relay-plugin");
let schemaData = require("../data/schema.json").data;
module.exports = getBabelRelayPlugin(schemaData);
