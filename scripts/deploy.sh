#!/bin/bash

# Zora Intelligence Dashboard Production Deploy Script
echo "🚀 Deploying Zora Intelligence Dashboard to production..."

# Configuration
DOCKER_HUB_USERNAME=${DOCKER_HUB_USERNAME:-"yourusername"}
DOCKER_HUB_REPOSITORY=${DOCKER_HUB_REPOSITORY:-"zora-dashboard"}
VERSION=${VERSION:-"latest"}
SERVER_HOST=${SERVER_HOST:-"your-server-ip"}
SERVER_USER=${SERVER_USER:-"root"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
if [ -z "$ZORA_API_KEY" ]; then
    print_error "ZORA_API_KEY environment variable is required"
    exit 1
fi

# Build and push Docker images
print_status "Building Docker images..."

# Build backend image
print_status "Building backend image..."
docker build -t $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY-backend:$VERSION ./backend
docker push $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY-backend:$VERSION

# Build frontend image
print_status "Building frontend image..."
docker build -t $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY-frontend:$VERSION ./frontend
docker push $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY-frontend:$VERSION

# Create production environment file
print_status "Creating production environment file..."
cat > .env.prod << EOF
ZORA_API_KEY=$ZORA_API_KEY
DOCKER_HUB_USERNAME=$DOCKER_HUB_USERNAME
DOCKER_HUB_REPOSITORY=$DOCKER_HUB_REPOSITORY
VERSION=$VERSION
EOF

# Copy files to server
print_status "Copying files to server..."
scp -r . $SERVER_USER@$SERVER_HOST:/opt/zora-dashboard/

# Deploy on server
print_status "Deploying on server..."
ssh $SERVER_USER@$SERVER_HOST << EOF
    cd /opt/zora-dashboard
    
    # Stop existing services
    docker-compose -f docker-compose.prod.yml down
    
    # Pull latest images
    docker pull $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY-backend:$VERSION
    docker pull $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY-frontend:$VERSION
    
    # Start services
    docker-compose -f docker-compose.prod.yml up -d
    
    # Wait for services to be healthy
    sleep 30
    
    # Check service health
    docker-compose -f docker-compose.prod.yml ps
EOF

print_status "Deployment complete!"
print_status "🌐 Your application should be available at: https://yourdomain.com"
print_status "🔧 API should be available at: https://api.yourdomain.com"

# Cleanup
rm -f .env.prod

print_status "✅ Deployment script completed successfully!"
