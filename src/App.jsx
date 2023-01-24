import getWeb3 from './myFunctions/getWeb3';
import { useEffect, useState } from 'react';
import connect_to_Metamask from './myFunctions/connect_to_Metamask';
import My_Contract from './myFunctions/newContract';
import Contract_methods from './myFunctions/contract_methods';
import './App.css';



function App() {
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState()
  const [symbol, setSymbol] = useState(null)
  const [sendInfo, setSendInfo] = useState({
    address: null,
    count: null
  })

  const [address,setAddress] = useState(null)
  window.ethereum.request({method: 'eth_requestAccounts'}).then(account => {
    setAddress(account[0])
  })
  console.log(address);

  // connect to metamask and get contract
  const connect = async () => {
    setWeb3(await connect_to_Metamask(web3));
    const my_contract_data = new My_Contract(await connect_to_Metamask(web3))
    await my_contract_data.getContract()
    console.log(my_contract_data);
    setContract(my_contract_data.contract)
  }
  // for create new class to use all contract methods
  const contract_meth = new Contract_methods(contract,address);

  // for getting symbol of token
  const getSymbol = async () => {
    setSymbol(await contract_meth.getSymbol())
  }

  //for getting data to send transaction

  const getData = async (e) => {
    let { name, value } = e.target
    if (name === 'count' && value.length > 0) {
      value = await web3.utils.toWei(value)
    }
    setSendInfo({
      ...sendInfo,
      [name]: value
    })

  }
  const sendData = async (e) => {
    e.preventDefault();
    await contract_meth.transfer(sendInfo.address, sendInfo.count)
  }

  console.log(sendInfo);
  console.log(symbol);
  console.log(contract_meth);
  console.log(contract);
  return (
    <div className="App">
      <button onClick={connect} className={contract ? 'connect active' : 'connect'}>
        {contract ? 'Connected' : 'Connect to Metamask'}

      </button>
      <button onClick={getSymbol}>{symbol ? symbol : 'Get symbol'}</button>
      <div className="send-transaction">
        <h2>Send Transaction</h2>
        <form action="" onSubmit={(e) => sendData(e)}>
          <label htmlFor="">
            Address
            <input type="text" name='address' onChange={(e) => getData(e)} />
          </label>
          <label htmlFor="">
            Count
            <input type="text" name='count' onChange={(e) => getData(e)} />
          </label>
          <button>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
