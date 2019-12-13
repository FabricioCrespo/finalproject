import csv
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine("postgres://kjkmtwcexbgcrx:522c649866896ff5bddbbbb0c53f2dec216fb496e6590bdce81f42e5aba9f313@ec2-174-129-253-47.compute-1.amazonaws.com:5432/d98hjgkripkjc5")
db = scoped_session(sessionmaker(bind=engine))

def main():
    f = open("users.csv")
    users = csv.reader(f)
    for id, username, password, name, last_name in users:
        db.execute("INSERT INTO users1(id,username,password,name,last_name) VALUES (:id, :username, :password, :name, :last_name)",
                    {"id": id, "username": username, "password": password, "name": name, "last_name":last_name})
        print(f"Added user  {username}.")
    db.commit()

if __name__ == "__main__":
    main()

