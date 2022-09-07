const events = require('events');
const { response } = require('express');
let ETH_API = require('polygonscan-api').init('SAJTIEXURIAZ3S6ZAVVGB5YGG2CUQQ5WDN');
let {localProvider} = require('./wallet')
let balance = ETH_API.account.balance("0x0000000000000000000000000000000000001010")
let em = new events.EventEmitter()
let array = ["확인"];
const array1 = [1, 2, 3, 4]
const initialValue = 0;
let init = "test";
let myEventHandler = function(test){
    console.log('비동기를 동기 테스트')
    em.emit('scream', test);
}
setTimeout(() => {myEventHandler(init)}, 1);
let polygonScanApi = balance.then(function(data){
    console.log('polygon data: ', data)
})
setTimeout(() => {polygonScanApi}, 2);
// 함수 활용하고자 할 때 
em.on('scream', function(data){
    array.push(data)
});

const loadContract = (contractName) => {
    require(`./contracts/${contractName}.address.js`)
}

function checkRoyaltyRegistry(){
    let response = {
        code : 0,
        message: "success"
    }
    try{
        console.log("로열티 체크")
        if(array1.length<=4){
            response.message = "현재 처리 가능한 로열티 리스트가 없습니다.!!"
            return response;
        }
        console.log('array data: ', array, 'array length: ', array.length)
    }
    catch(err){
        console.log(err)
    }

}

async function run(){
    setInterval(() => {checkRoyaltyRegistry()}, 3000);
}

function loadContracts(){
    // const sumWithlntial = array1.reduce(
    //     (previousValue, currentValue) => {
    //         console.log('previousValue: ', previousValue, 'currentValue: ', currentValue)
    //     }
    // );
   
    const contracts = require("./contracts/contracts");
    const newContracts = contracts.reduce((accumulator, contractName) => {
        console.log('accumulator: ', accumulator, 'contract name: ', contractName)
        accumulator[contractName] = loadContract(contractName)
        return accumulator;
    }, {});
    return newContracts
};
(async function(){
    try{
        console.log("[Init] Initailize royalties updater..")
        let readContracts = await loadContracts(localProvider);
        console.log('readContracts: ', readContracts);
        run();
    }
    catch(err){
        console.log(err)
    }

})();
