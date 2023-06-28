import re
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

def update_mongodb():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["buildbid"]
    collection = db["prices"]

    url = "https://zarea.pk/crush-price-in-pakistan/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    table = soup.find("table", id="tablepress-4")
    rows = table.find_all("tr")

    result = []

    for row in rows [1:3]:
        columns = row.find_all("td")
        result.append(float(columns[-1].text.strip()))
    
    collection.update_one({}, {"$set": {"crush.options.margala": result[0], "crush.options.sarghoda": result[1]}})

update_mongodb()