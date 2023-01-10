* Page 1 -:
# List of Categories -: 
http://localhost:9500/category

# List of Products -: 
http://localhost:9500/product

# products with respect to categoy -:
http://localhost:9500/product?categoriesId=3

* Page 2 -: 
# List of products with respect to cost -: 
http://localhost:9500/product/1?lcost=10000&hcost:30000

# List of products with respect to color -:
http://localhost:9500/product?categoriesId=1&color=black 

# List of products with respect to brand -: 
http://localhost:9500/product?categoriesId=1&brand=apple


* Page 3 -: 
# Details with respect to product -:
http://localhost:9500/details/2 

# Product selectd by User -: 
http://localhost:9500/orderItem/1


* Page 4 -: 
# Order Details (POST) -: 
http://localhost:9500/orderItem


# Place order (POST) -:
http://localhost:9500/placeOrder
{
	"orderId" : 1,
	"name" : "Rushikesh",
	"email" : "rushi@gmail.com",
	"address" : "Keshav Nagar, Akola",
	"phone" : 8888548412,
	"cost" : 10000,
	"menuItem" : [
		3,5,12
	]
} 


* page 5 
# List of all Orders -: 
http://localhost:9500/viewOrder


# List  of all  orders with respect to email -:
http://localhost:9500/viewOrder?email=rushi@gmail.com 


# Update  the order (PUT) -:
 http://localhost:9500/updateOrder/1
{
	"status":"Delivered",
	"bank_name":"Axis Bank",
	"date":"09/01/2023"
}



# Delete order (Delete) -: 
http://localhost:9500/deleteOrder/
63bc8165aa4e924a7a1bfbe2







 
