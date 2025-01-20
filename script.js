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

// Define a pizza order class
class PizzaOrder {
  constructor(customerName = "", deliveryType = "EAT_IN") {
    this.customerName = customerName;
    this.deliveryType = deliveryType;
    this.pizzas = [];
  }

  // Add a pizza to the order
  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  // Get the total price of the order, including delivery fee
  getPrice() {
    let totalPrice = this.pizzas.reduce(
      (total, pizza) => total + pizza.getPrice(),
      0
    );

    // Add delivery charge based on delivery type
    let deliveryCharge = 0;
    switch (this.deliveryType) {
      case "EAT_IN":
        deliveryCharge = 0; // No charge for Eat In
        break;
      case "TAKE_OUT":
        deliveryCharge = 1.5 * 100; // $1.5 for Take Out (converted to cents)
        break;
      case "DELIVERY":
        deliveryCharge = 5 * 100; // $5 for Delivery (converted to cents)
        break;
    }

    // Return the total price including the delivery charge
    return totalPrice + deliveryCharge;
  }
}

// Array to hold selected pizzas
let selectedPizzas = [];
let currentOrder = new PizzaOrder(); // Initialize a new order

// Add a pizza to the order
function addPizza(name, toppings, basePrice) {
  const pizza = new Pizza(name, toppings, basePrice);
  currentOrder.addPizza(pizza); // Add pizza to the current order
  selectedPizzas.push(pizza); // Add pizza to the list of selected pizzas
  updateSelectedPizzas();
}

// Update the UI with the selected pizzas
function updateSelectedPizzas() {
  const selectedPizzasList = document.getElementById("selectedPizzas");
  selectedPizzasList.innerHTML = ""; // Clear the list

  selectedPizzas.forEach((pizza) => {
    const li = document.createElement("li");
    li.textContent = `${pizza.name} - $${(pizza.getPrice() / 100).toFixed(2)}`;
    selectedPizzasList.appendChild(li);
  });

  updateTotalPrice(); // Update total price whenever pizzas are added
}

// Update the total price displayed
function updateTotalPrice() {
  const totalPriceInCents = currentOrder.getPrice();
  document.getElementById("totalPrice").textContent = (
    totalPriceInCents / 100
  ).toFixed(2); // Convert to dollars
}

// Calculate the total price when the "Calculate Total Price" button is clicked
function calculateTotalPrice() {
  const deliveryType = document.getElementById("deliveryType").value;
  currentOrder.deliveryType = deliveryType; // Update the order's delivery type

  // Update the total price with the new delivery charge
  updateTotalPrice();
}
