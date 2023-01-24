const initState = {
    web3: null
}

export default function reducer (state = initState,action) {

    switch(action.type){

        case "WEB3" :

            return {
                ...state, web3: action.payload
            }
    }
    
}

