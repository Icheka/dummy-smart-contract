const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

// create a connection to a local Eth test network using Ganache CLI
const web3 = new Web3(ganache.provider());

// before-each vars
let accounts;
let inbox;
const initialMessage = 'Hi, there!';

beforeEach(async () => {
    // get a list of accounts
    accounts = await web3.eth.getAccounts();

    // deploy contract to one of these accounts
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [initialMessage] })
        .send({ from: accounts[0], gas: '1000000' });
    // console.log(inbox);
});

describe('Inbox::', () => {
    it('is successfully deployed', () => {
        assert.ok(inbox.options.address);
    });

    it(`default message is ${initialMessage}`, async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    });

    it('can set a new message', async () => {
        const newMessage = 'Hello, world!';
        await inbox.methods.setMessage(newMessage).send({ from: accounts[0], gas: '1000000' });
        const messageNow = await inbox.methods.message().call();

        assert.equal(messageNow, newMessage);
    });
});