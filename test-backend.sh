#!/bin/bash

echo "🧪 Testing Zora Backend API..."

# Test root endpoint
echo "Testing root endpoint..."
curl -s http://localhost:8000/ | jq .

echo ""
echo "Testing health endpoint..."
curl -s http://localhost:8000/health | jq .

echo ""
echo "Testing profiles endpoint..."
curl -s "http://localhost:8000/profiles?limit=5" | jq .

echo ""
echo "✅ Backend tests completed!"
