var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3305,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

var checkAndBuy2 = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        //CREATES A NEW TABLE IN THE COOL CLI VIEW 
        var table = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });

        //DISPLAYS ALL ITEMS FOR SALE 
        console.log("HERE ARE ALL THE ITEMS AVAILABLE FOR SALE: ");
        console.log("===========================================");
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quality]);
        }
        console.log("-----------------------------------------------");
        //LOGS THE COOL TABLE WITH ITEMS IN FOR PURCHASE. 
        console.log(table.toString());
        inquirer.prompt([{
            name: "itemId",
            type: "input",
            message: "What is the item ID you would like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "Quantity",
            type: "input",
            message: "How many of this item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function(answer) {
            var chosenId = answer.itemId - 1
            var chosenProduct = res[chosenId]
            var chosenQuantity = answer.Quantity
            if (chosenQuantity < res[chosenId].stock_quality) {
                console.log("Your total for " + "(" + answer.Quantity + ")" + " - " + res[chosenId].product_name + " is: " + res[chosenId].price.toFixed(2) * chosenQuantity);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quality: res[chosenId].stock_quality - chosenQuantity
                }, {
                    item_id: res[chosenId].item_id
                }], function(err, res) {
                    //console.log(err);
                    checkAndBuy2();
                });

            } else {
                console.log("Sorry, insufficient quantity at this time. All we have is " + res[chosenId].stock_quality + " in our Inventory.");
                checkAndBuy2();
            }
        })
    })
}


checkAndBuy2();