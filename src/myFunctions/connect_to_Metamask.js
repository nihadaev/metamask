import Web3 from "web3"



const connect_to_Metamask = async (web3) => {
    return await new Promise((resolve, reject) => {
        const connect =  async () => {
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
            console.log('hello');
            
        }
     
        connect()
    })
}

export default connect_to_Metamask;