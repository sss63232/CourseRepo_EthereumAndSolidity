const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {
  interface: contractInterface,
  bytecode,
} = require('./compile');

const provider = new HDWalletProvider(
  `universe trim kangaroo caution face damage side cabin base trust cushion shell`,
  `https://rinkeby.infura.io/v3/ee8baf2388f3492791b165930f25da45`
);
const web3 = new Web3(provider);

const deploy = async () => {
  const account = await web3.eth.getAccounts();
};
deploy();
