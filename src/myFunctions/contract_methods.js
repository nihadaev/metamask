
class Contract_methods {
    constructor(contract,address) {
       this.methods = contract?.methods
       this.address = address
    }

    async getSymbol() {
        return await this.methods?.symbol().call()
    }
    async transfer(address,count){
       await this.methods?.transfer(address,count).send({from: this.address })
    }
}

export default  Contract_methods;