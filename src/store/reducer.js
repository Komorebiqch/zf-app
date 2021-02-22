let defaultState = {
    area: [],
    rentType: [],
    price: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "area":
            let newArea = state;
            newArea.area = action.value;
            return newArea;
        case "rentType":
            let newRentType = state;
            newRentType.rentType = action.value
            return newRentType;
        case "price":
            let newPrice = state;
            newPrice.price = action.value;
            return newPrice;
        default:
            return state;
    }
}

export default reducer;