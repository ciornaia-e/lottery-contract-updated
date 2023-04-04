const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
    'flag shrug ketchup fresh cute connect obtain abandon junior canvas same oven',
    'https://goerli.infura.io/v3/54dfe69882d84adcb2ac88ae4a475e0c'
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ gas: '1000000', from: accounts[0] })

    provider.engine.stop()

    console.log(JSON.stringify(abi))
    console.log('Contract deployed to', result.options.address)
}

deploy()