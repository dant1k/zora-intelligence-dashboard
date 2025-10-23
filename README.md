# 🧠 Zora Intelligence Dashboard

Enhanced ZoraScan with official Zora API SDK integration, built with FastAPI backend and Next.js frontend.

## 🚀 Features

- **📊 Real-time Profile Analytics**: Market cap, holders count, posts count, followers
- **🔍 Advanced Filtering**: Filter by market cap range, sort by various metrics
- **🌐 Social Integration**: Twitter, Farcaster, and Zora social metrics
- **💎 Minimal Dark UI**: Clean, responsive design with Tailwind CSS
- **🐳 Docker Ready**: Complete containerization with Docker Compose
- **☁️ Cloud Deploy**: Ready for Hetzner deployment

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Redis Cache   │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│                 │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 6379    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┼───────────────────────────────┐
                                 │                               │
                    ┌─────────────────┐              ┌─────────────────┐
                    │   Nginx Proxy   │              │   Zora API      │
                    │   Port: 80/443  │              │   (External)    │
                    └─────────────────┘              └─────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **httpx**: Async HTTP client for Zora API
- **Pydantic**: Data validation and serialization
- **Redis**: Caching layer (optional)

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and load balancer
- **Redis**: Caching and session storage

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose

### 1. Clone and Setup
```bash
git clone <repository-url>
cd Zora_tracker
chmod +x run.sh
./run.sh
```

### 2. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 3. Test Backend
```bash
chmod +x test-backend.sh
./test-backend.sh
```

## 📡 API Endpoints

### Profiles
- `GET /profiles` - Get all profiles with basic metrics
- `GET /profile/{address}` - Get detailed profile information

### Query Parameters
- `limit`: Number of profiles to return (default: 25)

### Example Request
```bash
curl "http://localhost:8000/profiles?limit=10"
```

## 🐳 Docker Commands

### Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Access backend container
docker-compose exec backend bash

# Access frontend container
docker-compose exec frontend sh
```

### Production
```bash
# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs -f
```

## ☁️ Production Deployment

### 1. Prepare Server (Hetzner)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Deploy Application
```bash
# Set environment variables
export DOCKER_HUB_USERNAME=yourusername
export DOCKER_HUB_REPOSITORY=zora-dashboard
export SERVER_HOST=your-server-ip
export SERVER_USER=root

# Run deployment script
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### 3. SSL Configuration
```bash
# Generate SSL certificates (Let's Encrypt)
sudo apt install certbot
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates to project
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem
```

## 🔧 Configuration

### Environment Variables
```bash
# Required
ZORA_API_KEY=your_zora_api_key

# Optional
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=development
REDIS_URL=redis://localhost:6379
TWITTER_BEARER_TOKEN=your_twitter_token
FARCASTER_API_KEY=your_farcaster_key
```

### Nginx Configuration
- Rate limiting: 10 req/s for API, 30 req/s for web
- Gzip compression enabled
- Security headers configured
- SSL/TLS support for production

## 📊 Data Flow

1. **Frontend** requests profiles from `/api/profiles`
2. **Backend** fetches data from Zora API using official SDK
3. **Data Processing** enriches profiles with social metrics
4. **Caching** stores results in Redis (optional)
5. **Response** returns formatted JSON to frontend
6. **UI** displays profiles in responsive card layout

## 🎨 UI Components

- **ProfileCard**: Individual profile display with metrics
- **FilterPanel**: Advanced filtering and search
- **ProfileModal**: Detailed profile view
- **Header**: Navigation and branding
- **LoadingSpinner**: Loading states

## 🔍 Monitoring

### Health Checks
- Backend: `GET /health`
- Frontend: `GET /`
- Redis: `redis-cli ping`

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

## 🚨 Troubleshooting

### Common Issues

1. **API Key Not Working**
   ```bash
   # Check environment variable
   docker-compose exec backend env | grep ZORA_API_KEY
   ```

2. **Services Not Starting**
   ```bash
   # Check service status
   docker-compose ps
   
   # View error logs
   docker-compose logs backend
   ```

3. **Frontend Not Loading**
   ```bash
   # Check if backend is healthy
   curl http://localhost:8000/health
   
   # Check frontend logs
   docker-compose logs frontend
   ```

4. **Redis Connection Issues**
   ```bash
   # Test Redis connection
   docker-compose exec redis redis-cli ping
   ```

## 📈 Performance Optimization

- **Caching**: Redis caching for API responses
- **Compression**: Gzip compression for static assets
- **Rate Limiting**: API rate limiting to prevent abuse
- **Health Checks**: Automatic service health monitoring
- **Resource Limits**: Docker resource constraints

## 🔒 Security Features

- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Prevents API abuse
- **Security Headers**: XSS, CSRF protection
- **SSL/TLS**: HTTPS support for production
- **Non-root Users**: Docker containers run as non-root

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation at `/docs`

---

**Built with ❤️ for the Zora community**
