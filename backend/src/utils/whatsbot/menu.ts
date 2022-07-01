
interface Product {
    description: string,
    price: number
}

interface Menu {
    [key: string] : Product
}

const menu: Menu = {
    "hamburger": {
        description: "Hamburger",
        price: 4.92
    },
    "cheeseburger": {
        description: "Camburger",
        price: 4.92
    },
}

export default menu