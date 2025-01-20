const extraToppingPrice = 50; // Price for extra toppings (in cents)
const numberOfFreeToppings = 4; // Number of free toppings per pizza

// Define a pizza class
class Pizza {
  constructor(name, toppings, basePrice, size = "S") {
    this.name = name;
    this.toppings = toppings;
    this.basePrice = basePrice * 100; // Convert base price to cents for precision
    this.size = size;
  }

  // Calculate the price of the pizza
  getPrice() {
    let extraToppings = this.toppings.length - numberOfFreeToppings;
    if (extraToppings < 0) {
      extraToppings = 0; // No extra charge for toppings if below the limit
    }

    const sizeAdjustment = this.getSizePriceAdjustment(); // Adjust price for different pizza sizes
    return this.basePrice + sizeAdjustment + extraToppings * extraToppingPrice;
  }

  // Get price adjustment based on pizza size
  getSizePriceAdjustment() {
    const sizePriceAdjustment = {
      S: 0, // Small pizza has no price change
      M: 100, // Medium pizza costs 1 more unit
      L: 200, // Large pizza costs 2 more units
    };
    return sizePriceAdjustment[this.size] || 0; // Default to no adjustment if size is invalid
  }
}
// Write code which models an order to a pizza place as a class.
// The order has a customer name, delivery type,
// and there can be several pizzas in one order.
// Order can be updated by adding pizzas to it with a method of the order class.

class PizzaOrder {
  customerName = "";
  deliveryType = "EAT_IN"; // other values TAKE_OUT, DELIVERY
  pizzas = [];

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  getPrice() {
    let totalPrice = 0;
    // 1) check delivery type and add delivery fee if needed
    // 2) loop over the pizzas and sum up their prices
    return totalPrice;
  }
}
