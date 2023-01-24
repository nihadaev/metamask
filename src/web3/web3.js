import Web3 from "web3";
import abi from './abi.json'

const web3 = new Web3('https://data-seed-prebsc-2-s3.binance.org:8545')

const contractAddress ='0x9778FaC64F0384f3f239d026197195CA95B3d9b6'
const userAddress = '0xDbFAA275589dEeA7A9C3BB7e0Dde78D564EdB7AF'

class My_web3 {
    constructor (userAddress, contractAddress) {
        this.userAddress = userAddress
        this.contractAddress = contractAddress
    }

    new_Web3 () {
        return  new Web3('https://data-seed-prebsc-2-s3.binance.org:8545')
    }
}



let contract = new web3.eth.Contract(abi,contractAddress)
// function for get accaunts
// const getAccaunts = async () => {
//     const addresses = await web3.eth.getAccounts()
//     console.log(addresses);
// }

//function for get balance of userAddress
const getResult = async () => {
    
    const result = await contract.methods.balanceOf(userAddress).call()
    console.log(result);
}
export default getResult;