# Frame test with higher level programming in order to test if the server works
#  
import requests
url = 'http://sensor-network-lora.herokuapp.com/api/sensors'
url = 'http://localhost:5001/weather-node-ui/us-central1/measurements'

# Update sensors
data = { 
        "temperature": 1,
        "humidity": 2,
        "latitude": 3,
        "longitude": 4,
        "PM1": 5,
        "PM2": 6,
        "timestamp": 7
} 

response = requests.post(url, json=data)
print(">> url:", url)
print(">>> tx:", data)
print(">>> rx:", response.json())