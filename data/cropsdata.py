import pymysql.cursors
import json

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='harvest1',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:
    with connection.cursor() as cursor:
        # Read data from crops table
        sql = "SELECT * FROM `crops`"
        cursor.execute(sql)
        crops = cursor.fetchall()

        # Read data from customers table
        sql = "SELECT * FROM `customers`"
        cursor.execute(sql)
        customers = cursor.fetchall()

        # Read data from farmers table
        sql = "SELECT * FROM `farmers`"
        cursor.execute(sql)
        farmers = cursor.fetchall()

        # Read data from orders table
        sql = "SELECT * FROM `orders`"
        cursor.execute(sql)
        orders = cursor.fetchall()

finally:
    connection.close()

# Convert data to JSON format
data = {
    "crops": crops,
    "customers": customers,
    "farmers": farmers,
    "orders": orders
}

json_data = json.dumps(data, indent=4)

# Print the JSON data
print(json_data)
