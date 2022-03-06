const fs = require('fs');
const path = require('path');
const solc = require('solc');

const inboxContractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const inboxContractSource = fs.readFileSync(inboxContractPath, 'utf-8');

module.exports = solc.compile(inboxContractSource, 1).contracts[':Inbox'];