// script.js
const foods = [
    { name: "Idli", calories: 39, price: 10 },
    { name: "Dosa", calories: 120, price: 30 },
    { name: "Sambar", calories: 80, price: 20 },
    { name: "Rice", calories: 130, price: 25 },
    { name: "Vegetable Curry", calories: 100, price: 35 },
    { name: "Egg", calories: 68, price: 6 },
    { name: "Milk", calories: 42, price: 25 },
    { name: "Curd", calories: 60, price: 20 },
    { name: "Paneer", calories: 296, price: 200 },
    { name: "Vada", calories: 90, price: 20 },
    { name: "Uttapam", calories: 150, price: 40 },
    { name: "Coconut Chutney", calories: 60, price: 15 },
    { name: "Upma", calories: 150, price: 30 },
    { name: "Pongal", calories: 170, price: 35 },
    { name: "Rasam", calories: 50, price: 15 },
    { name: "Mixed Vegetable Salad", calories: 80, price: 25 },
    { name: "Carrot", calories: 41, price: 10 },
    { name: "Potato", calories: 77, price: 15 },
    { name: "Tomato", calories: 18, price: 5 },
    { name: "Onion", calories: 40, price: 10 },
    { name: "Spinach", calories: 23, price: 15 },
    { name: "Green Peas", calories: 81, price: 20 },
    { name: "Banana", calories: 89, price: 10 },
    { name: "Apple", calories: 52, price: 15 },
    { name: "Orange", calories: 47, price: 12 },
    { name: "Whole Wheat Bread", calories: 69, price: 25 },
    { name: "Chickpeas", calories: 164, price: 30 },
    { name: "Moong Dal", calories: 347, price: 40 },
    { name: "Brown Rice", calories: 111, price: 30 },
    { name: "Chappathi", calories: 200, price: 20 },
];

document.getElementById('calorie-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const calorieInput = parseInt(document.getElementById('calories').value);
    const budgetInput = parseInt(document.getElementById('budget').value);
    const results = findCombination(calorieInput, budgetInput);
    displayResults(results);
});

function findCombination(calories, budget) {
    const combinations = [];
    
    const helper = (start, currentCombination, currentCalories, currentPrice, quantityMap) => {
        if (currentCalories === calories && currentPrice <= budget) {
            combinations.push({ items: { ...quantityMap }, totalPrice: currentPrice });
            return;
        }
        if (currentCalories > calories || currentPrice > budget) {
            return;
        }
        for (let i = start; i < foods.length; i++) {
            // Update quantity map
            quantityMap[foods[i].name] = (quantityMap[foods[i].name] || 0) + 1;
            currentCombination.push(foods[i]);
            helper(i, currentCombination, currentCalories + foods[i].calories, currentPrice + foods[i].price, quantityMap);
            // Backtrack
            currentCombination.pop();
            quantityMap[foods[i].name] -= 1;
            if (quantityMap[foods[i].name] === 0) {
                delete quantityMap[foods[i].name];
            }
        }
    };

    helper(0, [], 0, 0, {});
    return combinations;
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No combinations found within budget and calorie limit.</p>';
    } else {
        results.forEach(combination => {
            const itemsList = Object.entries(combination.items)
                .map(([itemName, quantity]) => `${itemName} (x${quantity})`)
                .join(', ');
            resultsDiv.innerHTML += `<p>Combination: ${itemsList} - Total Price: ₹${combination.totalPrice}</p>`;
        });
    }
}
