import os
import psycopg2
from dotenv import load_dotenv

conn = psycopg2.connect(
        host=os.getenv['localhost'],
        database=os.getenv['taskhub'],
        user=os.getenv['DB_USERNAME'],
        password=os.getenv['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS Users;')
cur.execute('CREATE TABLE Users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, last_login TIMESTAMP NULL, first_name VARCHAR(50), last_name VARCHAR(50), status ENUM("active", "pending", "deactivated") NOT NULL DEFAULT "active";)'
)

conn.commit()

cur.close()
conn.close()