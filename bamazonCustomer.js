var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3305,
    user: "root",
    password: "root",
    database: "bamazon_db"
});


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
                console.log(' Item ID: ' + res[i].item_id + '|' + ' Product Name: ' + res[i].product_name + '|' + ' Department: ' + res[i].department_name + '|' + ' Price: ' + '$' + res[i].price + '|' + 'Quantity left: ' + res[i].stock_quality + '')
            }
            console.log('=================================================');

            placeOrder();
        }
    })
}
//Ask customer to choose an item by ID

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
//Ask customer to choose how many items they want

function howMany(itemSelected) {

    inquirer
        .prompt([
            {
                name: "requestedAmount",
                type: "input",
                message: "How many would you like?"
            }])
        .then(function (ans) {
            var whatToBuy = (ans.requestedItem) - 1;
            var howMuchToBuy = parseInt(ans.requestedAmount);
            var grandTotal = parseFloat(((res[whatToBuy].Price) * howMuchToBuy).toFixed(2));

            //check if there are enough items in stock
            if (res[whatToBuy].stock_quality >= howMuchToBuy) {
                //after purchase, updates quantity in Products
                connection.query("UPDATE Products SET ? WHERE ?", [
                    { stock_quality: (res[whatToBuy].stock_quality - howMuchToBuy) },
                    { item_id: ans.id }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                });

               
            } else {
                console.log("Sorry, there's not enough in stock!");
            }

            reprompt();
        })
}

        //   asks if they would like to purchase another item
          function reprompt(){
            inquirer.prompt([{
              type: "confirm",
              name: "reply",
              message: "Would you like to purchase another item?"
            }]).then(function(ans){
              if(ans.reply){
                showProducts();
              } else{
                console.log("See you soon!");
              }
            });
          }


