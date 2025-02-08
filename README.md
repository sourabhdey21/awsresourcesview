# AWS Resource Viewer

A modern web application for viewing and monitoring AWS resources using a secure and user-friendly interface. Built with React, FastAPI, and PostgreSQL.

![AWS Resource Viewer](https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg)

## Features

- 🔐 Secure user authentication
- 🌓 Light/Dark theme support
- 📊 Real-time AWS resource monitoring
- 🖥️ EC2 instance details with AMI information
- 🪣 S3 bucket management
- 🗄️ RDS instance monitoring
- λ Lambda function overview
- 🎨 Modern, responsive UI
- 🐳 Docker containerization

## Prerequisites

- Docker and Docker Compose
- AWS Access Key and Secret Key with appropriate permissions
- Git (for cloning the repository)

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd aws-resource-viewer
```

2. Create a `.env` file in the root directory:
```bash
# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=awsview
POSTGRES_HOST=db
POSTGRES_PORT=5432

# JWT Configuration
JWT_SECRET_KEY=your-secure-secret-key-here  # Change this in production
```

3. Build and start the application:
```bash
docker-compose up --build
```

4. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Architecture

The application consists of three main components:

### Frontend (React + TypeScript)
- Built with React 18 and TypeScript
- Chakra UI for component styling
- Responsive design with theme support
- Secure AWS credentials handling

### Backend (FastAPI)
- FastAPI for high-performance API
- JWT authentication
- PostgreSQL database integration
- Boto3 for AWS service interaction

### Database (PostgreSQL)
- Stores user information
- Manages authentication data
- Ensures data persistence

## Development Setup

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## API Documentation

The API documentation is automatically generated and can be accessed at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Security Considerations

1. AWS Credentials:
   - Use IAM roles with minimum required permissions
   - Never commit AWS credentials to version control
   - Regularly rotate access keys

2. Application Security:
   - JWT tokens for authentication
   - Secure password hashing
   - CORS protection
   - Environment variable management

## Production Deployment

For production deployment, make sure to:

1. Update environment variables:
   - Use strong JWT secret key
   - Set secure database credentials
   - Configure appropriate CORS settings

2. Enable HTTPS:
   - Add SSL/TLS certificates
   - Update nginx configuration
   - Configure secure headers

3. Set up monitoring:
   - Configure logging
   - Set up error tracking
   - Monitor system resources

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers. 