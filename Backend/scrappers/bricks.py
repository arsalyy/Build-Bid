import re
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

def update_mongodb():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["buildbid"]
    collection = db["prices"]

    url = "https://priceindex.pk/bricks-price-pakistan/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    table = soup.find("table")
    rows = table.find_all("tr")
    columns = rows[1].find_all("td")[1:4]

    values = [float(re.search(r"\d+(\.\d+)?", column.get_text()).group()) for column in columns]

    collection.update_one({}, {"$set": {"bricks.options.gradeA": values[0], "bricks.options.gradeB": values[1], "bricks.options.gradeC": values[2]}})

update_mongodb()