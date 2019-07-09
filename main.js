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
