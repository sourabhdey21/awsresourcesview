import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Text,
  Badge,
  Image,
  IconButton,
  useColorMode,
  Tooltip,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FaKey, FaLock, FaSun, FaMoon, FaSignOutAlt, FaSync } from 'react-icons/fa';
import axios from 'axios';
import { awsIcons } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

const AWS_REGIONS = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-east-2', label: 'US East (Ohio)' },
  { value: 'us-west-1', label: 'US West (N. California)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'eu-west-1', label: 'EU (Ireland)' },
  { value: 'eu-central-1', label: 'EU (Frankfurt)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
];

interface Resources {
  ec2: Array<{
    id: string;
    state: string;
    type: string;
    public_ip: string;
    private_ip: string;
    ami_name: string;
    ami_id: string;
  }>;
  s3: Array<{
    name: string;
    creation_date: string;
  }>;
  rds: Array<{
    identifier: string;
    status: string;
    engine: string;
    endpoint: string;
  }>;
  lambda: Array<{
    name: string;
    runtime: string;
    memory: number;
    timeout: number;
  }>;
}

export default function Dashboard() {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<Resources | null>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';
  const cardBg = colorMode === 'light' ? 'white' : 'gray.800';
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700';
  const inputBg = colorMode === 'light' ? 'white' : 'gray.700';
  const inputColor = colorMode === 'light' ? 'gray.800' : 'white';
  const iconColor = colorMode === 'light' ? 'gray.500' : 'gray.400';
  const selectOptionBg = colorMode === 'light' ? 'white' : 'gray.700';
  const selectOptionHoverBg = colorMode === 'light' ? 'gray.100' : 'gray.600';

  const fetchResources = async () => {
    if (!accessKey || !secretKey) {
      toast({
        title: 'Missing Credentials',
        description: 'Please enter both AWS Access Key and Secret Key',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/aws/resources',
        {
          access_key: accessKey,
          secret_key: secretKey,
          region: region,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResources(response.data);
      toast({
        title: 'Success',
        description: 'AWS resources fetched successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Error fetching resources:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to fetch AWS resources',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    navigate('/login');
  };

  const handleRefresh = () => {
    if (accessKey && secretKey) {
      fetchResources();
    } else {
      toast({
        title: 'Missing Credentials',
        description: 'Please enter AWS credentials before refreshing',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Flex
            direction="column"
            align="center"
            bg={cardBg}
            p={8}
            rounded="xl"
            shadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
            width="100%"
            maxW="800px"
            position="relative"
          >
            <HStack position="absolute" right="4" top="4" spacing={2}>
              <Tooltip label="Refresh resources" placement="bottom">
                <IconButton
                  aria-label="Refresh resources"
                  icon={<FaSync />}
                  onClick={handleRefresh}
                  isLoading={loading}
                  colorScheme="blue"
                  size="lg"
                  borderRadius="full"
                />
              </Tooltip>
              <Tooltip label="Toggle theme" placement="bottom">
                <IconButton
                  aria-label="Toggle theme"
                  icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                  onClick={toggleColorMode}
                  colorScheme={colorMode === 'light' ? 'purple' : 'yellow'}
                  size="lg"
                  borderRadius="full"
                />
              </Tooltip>
              <Tooltip label="Logout" placement="bottom">
                <IconButton
                  aria-label="Logout"
                  icon={<FaSignOutAlt />}
                  onClick={handleLogout}
                  colorScheme="red"
                  size="lg"
                  borderRadius="full"
                />
              </Tooltip>
            </HStack>

            <Heading size="xl" mb={6} color="blue.500" display="flex" alignItems="center">
              <Image src={awsIcons.aws} alt="AWS Logo" boxSize="40px" mr={4} />
              AWS Resource Viewer
            </Heading>

            <Stack spacing={4} width="100%" mb={6}>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <FaKey color={iconColor} />
                </InputLeftElement>
                <Input
                  placeholder="AWS Access Key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  bg={inputBg}
                  color={inputColor}
                  size="lg"
                  borderRadius="lg"
                  borderWidth="2px"
                  _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                  _placeholder={{ color: colorMode === 'light' ? 'gray.400' : 'gray.300' }}
                />
              </InputGroup>

              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <FaLock color={iconColor} />
                </InputLeftElement>
                <Input
                  placeholder="AWS Secret Key"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  bg={inputBg}
                  color={inputColor}
                  size="lg"
                  borderRadius="lg"
                  borderWidth="2px"
                  _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                  _placeholder={{ color: colorMode === 'light' ? 'gray.400' : 'gray.300' }}
                />
              </InputGroup>

              <Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                bg={inputBg}
                color={inputColor}
                size="lg"
                borderRadius="lg"
                borderWidth="2px"
                _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                sx={{
                  '> option': {
                    bg: selectOptionBg,
                    color: inputColor,
                    padding: '10px',
                  },
                  '> option:hover': {
                    bg: selectOptionHoverBg,
                  },
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    bg: cardBg,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    bg: borderColor,
                    borderRadius: '8px',
                  },
                }}
              >
                {AWS_REGIONS.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </Select>
            </Stack>

            <Button
              colorScheme="blue"
              onClick={fetchResources}
              isLoading={loading}
              loadingText="Fetching Resources"
              size="lg"
              width="200px"
              borderRadius="full"
              fontSize="md"
              fontWeight="bold"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Fetch Resources
            </Button>
          </Flex>

          {resources && (
            <Box
              bg={cardBg}
              p={6}
              rounded="xl"
              shadow="lg"
              borderWidth="1px"
              borderColor={borderColor}
              width="100%"
            >
              <Tabs isFitted variant="soft-rounded" colorScheme="blue">
                <TabList mb="1em">
                  <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
                    <Flex align="center" gap={2}>
                      <Image src={awsIcons.ec2} alt="EC2" boxSize="24px" />
                      EC2 Instances
                    </Flex>
                  </Tab>
                  <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
                    <Flex align="center" gap={2}>
                      <Image src={awsIcons.s3} alt="S3" boxSize="24px" />
                      S3 Buckets
                    </Flex>
                  </Tab>
                  <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
                    <Flex align="center" gap={2}>
                      <Image src={awsIcons.rds} alt="RDS" boxSize="24px" />
                      RDS Instances
                    </Flex>
                  </Tab>
                  <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
                    <Flex align="center" gap={2}>
                      <Image src={awsIcons.lambda} alt="Lambda" boxSize="24px" />
                      Lambda Functions
                    </Flex>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {resources.ec2.map((instance) => (
                        <Card
                          key={instance.id}
                          bg={cardBg}
                          shadow="md"
                          _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                          transition="all 0.2s"
                        >
                          <CardHeader>
                            <Flex justify="space-between" align="center">
                              <Flex align="center" gap={2}>
                                <Image src={awsIcons.ec2} alt="EC2" boxSize="24px" />
                                <Heading size="md">{instance.id}</Heading>
                              </Flex>
                              <Badge
                                colorScheme={instance.state === 'running' ? 'green' : 'red'}
                                fontSize="0.8em"
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                {instance.state}
                              </Badge>
                            </Flex>
                          </CardHeader>
                          <CardBody>
                            <Stack spacing={2}>
                              <Text><strong>Type:</strong> {instance.type}</Text>
                              <Text><strong>Public IP:</strong> {instance.public_ip}</Text>
                              <Text><strong>Private IP:</strong> {instance.private_ip}</Text>
                              <Text><strong>AMI:</strong> {instance.ami_name}</Text>
                              <Text><strong>AMI ID:</strong> {instance.ami_id}</Text>
                            </Stack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {resources.s3.map((bucket) => (
                        <Card
                          key={bucket.name}
                          bg={cardBg}
                          shadow="md"
                          _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                          transition="all 0.2s"
                        >
                          <CardHeader>
                            <Flex align="center" gap={2}>
                              <Image src={awsIcons.s3} alt="S3" boxSize="24px" />
                              <Heading size="md">{bucket.name}</Heading>
                            </Flex>
                          </CardHeader>
                          <CardBody>
                            <Text><strong>Created:</strong> {new Date(bucket.creation_date).toLocaleDateString()}</Text>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {resources.rds.map((db) => (
                        <Card
                          key={db.identifier}
                          bg={cardBg}
                          shadow="md"
                          _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                          transition="all 0.2s"
                        >
                          <CardHeader>
                            <Flex justify="space-between" align="center">
                              <Flex align="center" gap={2}>
                                <Image src={awsIcons.rds} alt="RDS" boxSize="24px" />
                                <Heading size="md">{db.identifier}</Heading>
                              </Flex>
                              <Badge
                                colorScheme={db.status === 'available' ? 'green' : 'yellow'}
                                fontSize="0.8em"
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                {db.status}
                              </Badge>
                            </Flex>
                          </CardHeader>
                          <CardBody>
                            <Stack spacing={2}>
                              <Text><strong>Engine:</strong> {db.engine}</Text>
                              <Text><strong>Endpoint:</strong> {db.endpoint}</Text>
                            </Stack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {resources.lambda.map((func) => (
                        <Card
                          key={func.name}
                          bg={cardBg}
                          shadow="md"
                          _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                          transition="all 0.2s"
                        >
                          <CardHeader>
                            <Flex align="center" gap={2}>
                              <Image src={awsIcons.lambda} alt="Lambda" boxSize="24px" />
                              <Heading size="md">{func.name}</Heading>
                            </Flex>
                          </CardHeader>
                          <CardBody>
                            <Stack spacing={2}>
                              <Text><strong>Runtime:</strong> {func.runtime}</Text>
                              <Text><strong>Memory:</strong> {func.memory}MB</Text>
                              <Text><strong>Timeout:</strong> {func.timeout}s</Text>
                            </Stack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
} 