import Web3 from "web3"
import abi from '../web3/abi.json'





const contractAddress = '0x9778FaC64F0384f3f239d026197195CA95B3d9b6'
const userAddress = '0xDbFAA275589dEeA7A9C3BB7e0Dde78D564EdB7AF'


let userAddress2 = '0x4C3D80bdEB25FE339A30D0b7aFeE4bEfb95de63A'

const getWeb3 = async () => {
    let web3;
    let addresses;
    await new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            if (window.ethereum) {
                web3 = new Web3(window.ethereum)
                try {
                    await window.ethereum.enable();
                    resolve(web3)
                }
                catch (error) {
                    reject(error);
                }

            } else if (window.web3) {
                web3 = window.web3;
                console.log(('Injected,web3 detected'));
                resolve(web3)
            }
            else {
                web3 = new Web3('https://data-seed-prebsc-2-s3.binance.org:8545')
                resolve(web3)
            }
        })
    })

    let contract = await new web3.eth.Contract(abi, contractAddress)

    const getAccaunts = async () => {
        addresses = await web3.eth.getAccounts()
        console.log(addresses);
    }

    const getResult = async () => {
        let balance = await web3.eth.getBalance(addresses[0])
        balance = await web3.utils.fromWei(balance)
        let result = await contract.methods.balanceOf('0xDbFAA275589dEeA7A9C3BB7e0Dde78D564EdB7AF').call()
        console.log(balance);
    }

    const getSymbol = async () => {
        let my_symbol = await contract.methods.symbol().call()
        console.log(my_symbol);
    }

    let transferCount = await web3.utils.toWei('1')
    const transferFrom = async () => {
        await contract.methods.transferFrom(addresses[0], userAddress2, transferCount).send()
    }
    // console.log(web3.utils.toWei('0.1'));
    const transfer = async () => {
        await contract.methods.transfer('0x4C3D80bdEB25FE339A30D0b7aFeE4bEfb95de63A', transferCount).send({ from: addresses[0] })
    }
    const getName = async () => {
        let name = await contract.methods.name().call()
        console.log(name);
    }

    console.log(contract.methods);
    await transfer();
    await getAccaunts();
    // await transferFrom();
    await getResult();
    await getSymbol();
    await getName();
}

export default getWeb3;