# Frame test with higher level programming in order to test if the server works
#  
import requests
url = 'http://sensor-network-lora.herokuapp.com/api/sensors'
url = 'http://localhost:5001/weather-node-ui/us-central1/measurements'
url = 'https://us-central1-weather-node-ui.cloudfunctions.net/measurements'
# Update sensors
data = { 
        "temperature": 1,
        "humidity": 2,
        "latitude": -12,
        "longitude": -70,
        "PM1": 5,
        "PM2": 6,
        "timestamp": 1
} 

response = requests.post(url, json=data)
print(">> url:", url)
print(">>> tx:", data)
print(">>> rx:", response.json())