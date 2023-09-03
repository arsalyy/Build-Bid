import re
import requests
import statistics
from bs4 import BeautifulSoup
from pymongo import MongoClient

def update_mongodb():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["buildbid"]
    collection = db["prices"]

    url = "https://priceindex.pk/cement-price-pakistan/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    table = soup.find_all("table", id="tablepress-28")

    rows = table[0].find_all("tr")[0:3]
    second_column_values = [row.find_all("td")[1].text.strip() for row in rows]

    result = []

    for value in second_column_values:
        matches = re.findall(r'\d{1,4}(?:,\d{3})*(?:\.\d+)?', value)
        extracted_numbers = [float(match.replace(',', '')) for match in matches]
        mean = statistics.mean(extracted_numbers)
        result.append(mean)

    collection.update_one({}, {"$set": {"cement.options.dg": result[0], "cement.options.lucky": result[1], "cement.options.mapleLeaf": result[2]}})

update_mongodb()
