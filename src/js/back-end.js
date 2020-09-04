import idb from 'idb';
export var fixData = [];

var dbPromise = idb.open('repository-transaction', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('transaction-history')) {
        upgradeDb.createObjectStore('transaction-history',{keyPath:'id', autoIncrement: true });
    }
})

export function checkStorage(){
    if(typeof(Storage) !== 'undefined'){
        console.log("This Browser Support IndexedDB");
    }else{
        alert('this browser don\'t support System Storage');
    }
}

export function listOrder ( nameItem, totalItem, price){
    var data = {
        nameItem :  nameItem,
        totalItem : totalItem,
        price : price
    };
    fixData.push(data);
}


export function saveToIndexedDB(){
    dbPromise.then(function(db){
        var transaction = db.transaction('transaction-history', 'readwrite');
        var store = transaction.objectStore('transaction-history');
        store.add(fixData)
        return transaction.complete;
    }).then( () => {
        fixData = [];
        window.location.href = '/';
        alert('Transaction Succes');
    });
}

export function getAllIndexedDb(){
    const getAll = dbPromise.then( (db) =>{
        var transaction =db.transaction('transaction-history', 'readonly');
        var store = transaction.objectStore('transaction-history');
        return store.getAll();
    })

    return getAll;
}

