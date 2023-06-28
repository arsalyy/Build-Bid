import re
import requests
import statistics
from bs4 import BeautifulSoup
from pymongo import MongoClient

def update_mongodb():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["buildbid"]
    collection = db["prices"]

    url = "https://priceindex.pk/construction-material-rates-pakistan"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    table = soup.find("table", id="tablepress-33")
    rows = table.find_all("tr")
    value = rows[-1].find_all("td")[2].text.strip()

    matches = re.findall(r'\d+', value)
    values = [float(match) for match in matches]
    perSquareFoot = statistics.mean(values)
    perMarla = round(272.251 * perSquareFoot, 2)

    collection.update_one({}, {"$set": {"labor.costPerMarla": perMarla}})
    
update_mongodb()