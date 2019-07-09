const posMachine = require('../main');
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

describe('Item Valid Checking', () => {
    it('Should return true in verifyItems when call [0001, 0002]', () => {
        expect(posMachine.verifyItems(['0001', '0001'], DATA_BASE)).toBe(true)
    })

    it('Should return false in verifyItems when call [1111]', () => {
        expect(posMachine.verifyItems(['1111'], DATA_BASE)).toBe(false)
    })

    it('Should return false in verifyItems when call [0001, 1111]', () => {
        expect(posMachine.verifyItems(['0001', '1111'], DATA_BASE)).toBe(false)
    })
})

describe('Calculate Items And Prices Checking', () => {
    it('Should pickup one Fanta item and calculate amount as 12 in CalculateItemsAndPrices when call [0010]', () => {
        expect(posMachine.calculateItemsAndPrices(['0010'], DATA_BASE)).toStrictEqual({
            settlementItems: [{
                detail: { "id": "0010", "name": "Fanta", "price": 12 },
                count: 1,
                amount: 12
            }],
            amount: 12
        })
    })

    it('Should pickup two Fanta and one Coca Cola item and '
        + 'calculate amount as 27 in CalculateItemsAndPrices when call [0010]', () => {
            expect(posMachine.calculateItemsAndPrices(['0010', '0001', '0010'], DATA_BASE)).toStrictEqual({
                settlementItems: [{
                    detail: { "id": "0010", "name": "Fanta", "price": 12 },
                    count: 2,
                    amount: 24
                },
                {
                    detail: { "id": "0001", "name": "Coca Cola", "price": 3 },
                    count: 1,
                    amount: 3
                }],
                amount: 27
            })
        })
})
