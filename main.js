const DATA_BASE = [
    { "id": "0001", "name": "Coca Cola", "price": 3 },
    { "id": "0002", "name": "Diet Coke", "price": 4 },
    { "id": "0003", "name": "Pepsi-Cola", "price": 5 },
    { "id": "0004", "name": "Mountain Dew", "price": 6 },
    { "id": "0005", "name": "Dr Pepper", "price": 7 },
    { "id": "0006", "name": "Sprite", "price": 8 },
    { "id": "0007", "name": "Diet Pepsi", "price": 9 },
    { "id": "0008", "name": "Diet Mountain Dew", "price": 10 },
    { "id": "0009", "name": "Diet Dr Pepper", "price": 11 },
    { "id": "0010", "name": "Fanta", "price": 12 }
]

function verifyItems(items, dataBase) {
    const validItems = dataBase.map(DBItem => DBItem.id);
    return !items.some(item => !validItems.includes(item))
}

function calculateItemsAndPrices(items, dataBase) {
    const settlementItems = [];
    let total = 0;

    items.forEach(itemID => {
        const itemSettled = settlementItems.find(item => item.detail.id === itemID);
        if (!itemSettled) {
            const itemDetail = dataBase.find(DBItem => DBItem.id === itemID)
            settlementItems.push({
                detail: itemDetail,
                count: 1,
                amount: itemDetail.price
            })
            total += itemDetail.price
        } else {
            itemSettled.count = itemSettled.count + 1
            itemSettled.amount = itemSettled.amount + itemSettled.detail.price
            total += itemSettled.detail.price
        }
    });

    return { settlementItems, amount: total }
}

function getReceiptText(isItemsValid, settlementItems, amount) {
    if (!isItemsValid) {
        return '[ERROR]: Item id illegal'
    }
    let str = 'Receipts\n------------------------------------------------------------\n'
    settlementItems.forEach(item => {
        str += `${item.detail.name}\t\t${item.count}\t${item.amount}\n`
    })
    str += `------------------------------------------------------------\nPrice: ${amount}`
    return str
}

function printReceipt(items, dataBase) {
    const verifyStatus = verifyItems(items, dataBase);
    if(!verifyStatus) {
        return getReceiptText(verifyStatus)
    } else {
        const {settlementItems, amount} = calculateItemsAndPrices(items, dataBase)
        return getReceiptText(true, settlementItems, amount)
    }
}

module.exports = {
    verifyItems,
    calculateItemsAndPrices,
    getReceiptText,
    printReceipt
}
