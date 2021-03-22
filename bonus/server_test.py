from time import sleep
from random import random
import requests
url = 'http://sensor-network-lora.herokuapp.com/api/sensors'
url = 'http://localhost:5001/weather-node-ui/us-central1/measurements'
url = 'https://us-central1-weather-node-ui.cloudfunctions.net/measurements'
# Update sensors



while True:
    data = { 
        "temperature": 25+round(3*random(),2),
        "humidity": 80+round(10*random(),2),
        "latitude": -13+round(random(),4),
        "longitude": -72+round(random(),4),
        "PM1": 10 + round(5*random()),
        "PM2": 100 + round(25*random()),
        "timestamp": 1
    } 
    response = requests.post(url, json=data)
    print(">> url:", url)
    print(">>> tx:", data)
    print(">>> rx:", response.json())
    sleep(10);