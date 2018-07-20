var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3305,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

var numberOfProductTypes = 0;

connection.connect(function (err) {
    // Throw error if it errors
    if (err) {
        console.log(err);
    }
    else {
        showProducts();
    }
});

// showProducts selects all data from the table
function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Welcome to Bamazon! Here are our products:')
            for (i = 0; i < res.length; i++) {
                console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quality + ')')
            }
            console.log('=================================================');

            placeOrder();
        }
    })
}
//Ask user to choose an item by ID

function placeOrder() {
    inquirer
        .prompt([
            {
                name: "requestedItem",
                type: "input",
                message: "Please chooose one of the IDs",
            }
        ])
        .then(function (answer) {

            console.log(answer.requestedItem);

            howMany(answer.requestedItem);
        }
        )
}
function howMany(itemSelected) {

    inquirer
        .prompt([
            {
                name: "requestedAmount",
                type: "input",
                message: "How many would you like?"
            }])
        .then(function(answer) {
            var chosenId = answer.requestedItem - 1
            var chosenProduct = res[chosenId]
            var chosenQuantity = answer.requestedAmount
            if (chosenQuantity < res[chosenId].stock_quality) {
                console.log("Your total for " + "(" + answer.requestedAmount + ")" + " - " + res[chosenId].ProductName + " is: " + res[chosenId].Price.toFixed(2) * chosenQuantity);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quality: res[chosenId].stock_quality - chosenQuantity
                }, {
                    id: res[chosenId].id
                }], function(err, res) {
                    //console.log(err);
                    showProducts();
                });

            } else {
                console.log("Sorry, insufficient Quantity at this time. All we have is " + res[chosenId].stock_quality + " in our Inventory.");
                showProducts();
            }
        })
    }

// showProducts();

