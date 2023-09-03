import re
import requests
import statistics
from bs4 import BeautifulSoup
from pymongo import MongoClient

def update_mongodb():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["buildbid"]
    collection = db["prices"]

    url = "https://priceindex.pk/saria-rate-pakistan-today-steel-iron-rod-price/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    table = soup.find("table")
    rows = table.find_all("tr")[2: 8]

    result = []

    for row in rows:
        columns = row.find_all("td")
        grade40 = float(columns[1].text.strip().split(" ")[1])
        grade60 = float(columns[2].text.strip().split(" ")[1])
        mean = statistics.mean([grade40, grade60])
        result.append(mean) 

    kg = statistics.mean(result)
    perSquareFoot = 4
    perMarla = round(272.251 * 4 * kg, 2)

    collection.update_one({}, {"$set": {"steel.price": perMarla}})

update_mongodb()