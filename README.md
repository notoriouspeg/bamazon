Hi! I created a Bamazon application for homework assigned in my U of M Coding Bootcamp / Trilogy.  

The MVP requirements are listed below. 

I have attached several screenshots to walk you through my application.

[Link to SCR 1](bamazon_screenshot1.JPG) - Displays item ID, product name, department, price and stock quantity. Prompts the customer to provide the item ID that they would like to buy. 

[Link to SCR 2](bamazon_screenshot2.JPG) - Displays customer answer to item ID prompt and adds a new prompt that asks how many of those items the customer wants to buy. 

[Link to SCR 3](bamazon_screenshot3.JPG) - Displays a message stating “insufficient quantity” when customer requests more of an item than is available in stock. 

[Link to SCR 4](bamazon_screenshot4.JPG) - Displays the total cost of the item quantity and product name chosen by the customer. Displays updated stock quantity number after subtracting what the customer is purchasing. 

INSTRUCTIONS -- Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called bamazon.
2. Then create a Table inside of that database called products.
3. The products table should have each of the following columns:
   - item_id (unique id for each product)
   - product_name (Name of product)
   - department_name
   - price (cost to customer)
   - stock_quantity (how much of the product is available in stores)
4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
5. Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
6. The app should then prompt users with two messages.
   - The first should ask them the ID of the product they would like to buy.
   - The second message should ask how many units of the product they would like to buy.
7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
   - If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
8. However, if your store does have enough of the product, you should fulfill the customer's order.
   - This means updating the SQL database to reflect the remaining quantity.
   - Once the update goes through, show the customer the total cost of their purchase.
