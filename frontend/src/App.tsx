import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Container,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Select,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  useColorMode,
  IconButton,
  Image,
  ColorModeScript,
} from '@chakra-ui/react';
import { FaKey, FaLock, FaSun, FaMoon } from 'react-icons/fa';
import axios from 'axios';
import { awsIcons } from './assets/icons';
import { ThemeProvider } from './contexts/ThemeContext';

const AWS_REGIONS = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-east-2', label: 'US East (Ohio)' },
  { value: 'us-west-1', label: 'US West (N. California)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'af-south-1', label: 'Africa (Cape Town)' },
  { value: 'ap-east-1', label: 'Asia Pacific (Hong Kong)' },
  { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
  { value: 'ap-northeast-2', label: 'Asia Pacific (Seoul)' },
  { value: 'ap-northeast-3', label: 'Asia Pacific (Osaka)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
  { value: 'ca-central-1', label: 'Canada (Central)' },
  { value: 'eu-central-1', label: 'Europe (Frankfurt)' },
  { value: 'eu-west-1', label: 'Europe (Ireland)' },
  { value: 'eu-west-2', label: 'Europe (London)' },
  { value: 'eu-west-3', label: 'Europe (Paris)' },
  { value: 'eu-north-1', label: 'Europe (Stockholm)' },
  { value: 'eu-south-1', label: 'Europe (Milan)' },
  { value: 'me-south-1', label: 'Middle East (Bahrain)' },
  { value: 'sa-east-1', label: 'South America (São Paulo)' }
];

interface AWSResources {
  ec2: Array<{
    id: string;
    type: string;
    state: string;
    public_ip: string;
    private_ip: string;
  }>;
  s3: Array<{
    name: string;
    creation_date: string;
  }>;
  rds: Array<{
    identifier: string;
    engine: string;
    status: string;
    endpoint: string;
  }>;
  lambda: Array<{
    name: string;
    runtime: string;
    memory: number;
    timeout: number;
  }>;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [resources, setResources] = useState<AWSResources | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.800';
  const cardBg = colorMode === 'light' ? 'white' : 'gray.700';
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.600';
  const inputBg = colorMode === 'light' ? 'white' : 'gray.600';
  const inputColor = colorMode === 'light' ? 'black' : 'white';
  const iconColor = colorMode === 'light' ? 'gray.300' : 'gray.400';
  const selectOptionBg = colorMode === 'light' ? 'white' : 'gray.700';
  const selectOptionHoverBg = colorMode === 'light' ? 'gray.100' : 'gray.600';

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/aws/resources', {
        access_key: accessKey,
        secret_key: secretKey,
        region,
      });
      setResources(response.data);
      toast({
        title: 'Success',
        description: 'AWS resources fetched successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch AWS resources. Please check your credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App; 