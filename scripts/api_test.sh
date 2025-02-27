#!/bin/bash

API_URL="http://localhost:8080"

echo "🌌 Creating a Galaxy..."
RESPONSE=$(curl -s -X POST "$API_URL/galaxies" \
     -H "Content-Type: application/json" \
     -d '{"Name": "Milky Way", "Size": 100000, "Description": "Our home galaxy"}')
echo "Response: $RESPONSE"
echo -e "\n"

echo "🔭 Fetching All Galaxies..."
RESPONSE=$(curl -s -X GET "$API_URL/galaxies")
echo "Response: $RESPONSE"
echo -e "\n"

echo "🌌 Fetching Galaxy with ID 1..."
RESPONSE=$(curl -s -X GET "$API_URL/galaxies/1")
echo "Response: $RESPONSE"
echo -e "\n"

echo "📝 Updating Galaxy ID 1..."
RESPONSE=$(curl -s -X PUT "$API_URL/galaxies/1" \
     -H "Content-Type: application/json" \
     -d '{"Name": "Andromeda", "Size": 120000, "Description": "The closest spiral galaxy"}')
echo "Response: $RESPONSE"
echo -e "\n"

echo "🗑️ Deleting Galaxy ID 1..."
RESPONSE=$(curl -s -X DELETE "$API_URL/galaxies/1")
echo "Response: $RESPONSE"
echo -e "\n"

echo "🌞 Creating a Star in Galaxy ID 1..."
RESPONSE=$(curl -s -X POST "$API_URL/stars" \
     -H "Content-Type: application/json" \
     -d '{"Name": "Sun", "Size": 109, "Description": "A G-type main-sequence star", "galaxyId": 1}')
echo "Response: $RESPONSE"
echo -e "\n"

echo "✨ Fetching All Stars..."
RESPONSE=$(curl -s -X GET "$API_URL/stars")
echo "Response: $RESPONSE"
echo -e "\n"

echo "🌟 Fetching Star with ID 1..."
RESPONSE=$(curl -s -X GET "$API_URL/stars/1")
echo "Response: $RESPONSE"
echo -e "\n"

echo "🔥 Updating Star ID 1..."
RESPONSE=$(curl -s -X PUT "$API_URL/stars/1" \
     -H "Content-Type: application/json" \
     -d '{"Name": "Betelgeuse", "Size": 764, "Description": "A red supergiant star"}')
echo "Response: $RESPONSE"
echo -e "\n"

echo "🌠 Deleting Star ID 1..."
RESPONSE=$(curl -s -X DELETE "$API_URL/stars/1")
echo "Response: $RESPONSE"
echo -e "\n"

echo "🌍 Creating a Planet..."
RESPONSE=$(curl -s -X POST "$API_URL/planets" \
     -H "Content-Type: application/json" \
     -d '{"Name": "Earth", "Size": 12742, "Description": "The only planet known to support life"}')
echo "Response: $RESPONSE"
echo -e "\n"

echo "🪐 Fetching All Planets..."
RESPONSE=$(curl -s -X GET "$API_URL/planets")
echo "Response: $RESPONSE"
echo -e "\n"

echo "🔎 Fetching Planet with ID 1..."
RESPONSE=$(curl -s -X GET "$API_URL/planets/1")
echo "Response: $RESPONSE"
echo -e "\n"

echo "📝 Updating Planet ID 1..."
RESPONSE=$(curl -s -X PUT "$API_URL/planets/1" \
     -H "Content-Type: application/json" \
     -d '{"Name": "Mars", "Size": 6779, "Description": "The red planet"}')
echo "Response: $RESPONSE"
echo -e "\n"

echo "💀 Deleting Planet ID 1..."
RESPONSE=$(curl -s -X DELETE "$API_URL/planets/1")
echo "Response: $RESPONSE"
echo -e "\n"

echo "✅ API Testing Complete!"
