import requests

url = "http://127.0.0.1:8000/api/users/create/"
payload = {
    "email": "testuser@example.com",
    "password": "testpassword123",
    "name": "Test User"
}

print("Attempting to register user...")
r = requests.post(url, json=payload)
print("Status Code:", r.status_code)
print("Response Content:", r.text)
