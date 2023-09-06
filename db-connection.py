import mysql.connector

config = {
  'user': 'user1',
  'password': 'SP105rf',
  'host': 'localhost',
  'database': 'primer_db',
  'raise_on_warnings': True
}
add_query = ("INSERT INTO tabla1 "
               "(name) "
               "VALUES ('Miguel')")
query = "SELECT * FROM tabla1"

connection = mysql.connector.connect(**config)
cursor = connection.cursor()
cursor.execute(add_query)
connection.commit()
cursor.execute(query)

for(id, register) in cursor:
    print("{},{}".format(id, register))
cursor.close()
connection.close()