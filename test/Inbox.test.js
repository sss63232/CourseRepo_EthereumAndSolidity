const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
const {
  interface: contractInterface,
  bytecode,
} = require('../compile');

let accounts;
let inbox;
const INITIAL_MSG = `hello`;
beforeEach(async () => {
  // get list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of the accounts to deploy the contract
  inbox = await new web3.eth.Contract(
    JSON.parse(contractInterface)
  )
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MSG],
    })
    .send({
      from: accounts[0],
      gas: `1000000`,
    });

  inbox.setProvider(provider);
});

describe(`Inbox`, () => {
  it(`deploy a contract`, () =>
    assert.ok(inbox.options.address));

  it(`has a default msg`, async () => {
    const msg = await inbox.methods.message().call();
    assert.equal(msg, INITIAL_MSG);
  });

  it(`can change the msg`, async () => {
    const newMsg = `BYE BYE`;
    await inbox.methods.setMsg(newMsg).send({
      from: accounts[0],
    });

    const msg = await inbox.methods.message().call();
    assert.equal(msg, newMsg);
  });
});

// class Car {
//   constructor() {}
//   park() {
//     return `stop`;
//   }
//   drive() {
//     return `go`;
//   }
// }

// let car;
// beforeEach(() => (car = new Car()));
// describe(`test Car class`, () => {
//   it(`can part`, () => assert.equal(car.park(), `stop`));
//   it(`can drive`, () => assert.equal(car.drive(), `go`));
// });
