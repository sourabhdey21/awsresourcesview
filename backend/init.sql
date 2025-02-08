-- Create database if it doesn't exist
SELECT 'CREATE DATABASE awsview'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'awsview');

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE awsview TO postgres; 