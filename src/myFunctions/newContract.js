import abi from '../web3/abi.json'
import connect_to_Metamask from './connect_to_Metamask'
import { useState } from 'react'

let contractAddress = '0x9778FaC64F0384f3f239d026197195CA95B3d9b6'


// const getWeb3 = async () =>{
//     web3 = await connect_to_Metamask();
//     console.log('heeeelll');
// }
// getWeb3();

class My_Contract{
    constructor(web3){
        this.web3 = web3
        this.abi = abi
        this.contractAddress = contractAddress
        this.contract= null
    }

    async  getContract () {
        this.contract = await new this.web3.eth.Contract(this.abi,this.contractAddress)
    }

}


export default My_Contract