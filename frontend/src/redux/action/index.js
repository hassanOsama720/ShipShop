// For Add Item to Cart

export const addCart = (product) => {


    return{
        type : "ADDITEM",
        payload : product
    }

}
export const addCartFirst = (product) => {


    return{
        type : "ADDITEMFIRST",
        payload : product
    }

}


export const addCartFromDB = (productArr) => {
    return{
        type : "ADDITEMS",
        payload : productArr
    }

}

export const addOrdersFromDB = (productsArr) => {
    return{
        type : "ADDORDERS",
        payload : productsArr
    }

}

// For Delete Item From Cart
export const delCart = (product) => {
    
    
    return{
        type : "DELITEM",
        payload : product
    }
}









export const addWishlist = (product) => {


    return{
        type : "ADDITEMWISHLIST",
        payload : product
    }

}
export const addWishlistFirst = (product) => {


    return{
        type : "ADDITEMFIRSTWISHLIST",
        payload : product
    }

}


export const addWishlistFromDB = (productArr) => {
    return{
        type : "ADDITEMSWISHLIST",
        payload : productArr
    }

}



// For Delete Item From Cart
export const delWishlist = (product) => {
    
    
    return{
        type : "DELITEMWISHLIST",
        payload : product
    }
}

// For Delete Item From Cart
export const zeroCart = (product) => {
    return{
        type : "ZEROITEM",
        payload : product
    }
}

export const zeroWishlist = (product) => {
    return{
        type : "ZEROITEMWISHLIST",
        payload : product
    }
}