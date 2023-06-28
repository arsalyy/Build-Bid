import re
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

def update_mongodb():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["buildbid"]
    collection = db["prices"]

    url = "https://www.zameen.com/blog/sand-price-pakistan.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    table = soup.find("table")
    rows = table.find_all("tr")

    result = []

    result.append(float(rows[1].find_all("td")[-1].text.strip().split(' ')[1]))
    result.append(float(rows[-1].find_all("td")[-1].text.strip().split(' ')[1]))

    collection.update_one({}, {"$set": {"sand.options.chenab": result[0], "sand.options.ravi": result[1]}})

update_mongodb()