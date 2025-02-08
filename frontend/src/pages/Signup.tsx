import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
  InputGroup,
  InputLeftElement,
  Flex,
  Divider,
  HStack,
  Image,
  useColorModeValue,
  IconButton,
  useColorMode,
  Tooltip,
} from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaSun, FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { awsIcons } from '../assets/icons';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post('http://localhost:8000/signup', {
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const purpleColor = useColorModeValue('purple.500', 'purple.300');

  return (
    <Box
      minH="100vh"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: `linear-gradient(to right, ${
          colorMode === 'light' 
            ? 'rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.85)'
            : 'rgba(26, 32, 44, 0.94), rgba(26, 32, 44, 0.87)'
        })`,
        backgroundImage: `url('https://images.unsplash.com/photo-1486783046960-64d2ef697c46?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
      }}
    >
      <Container maxW="container.xl" p={0}>
        <Box position="absolute" top={4} right={4} zIndex={2}>
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              size="lg"
              variant="ghost"
              colorScheme={colorMode === 'light' ? 'purple' : 'yellow'}
              borderRadius="full"
            />
          </Tooltip>
        </Box>
        <Flex h={{ base: 'auto', md: '100vh' }} py={[0, 10, 20]} direction={{ base: 'column-reverse', md: 'row' }}>
          <Box
            w={{ base: 'full', md: '50%' }}
            h={{ base: 'auto', md: 'full' }}
            px={[4, 8, 16]}
            py={[6, 8, 12]}
            bg={bgColor}
            borderRadius={{ base: 'none', md: 'xl' }}
            boxShadow="xl"
          >
            <Stack spacing={8} w="full" maxW="md" mx="auto">
              <Stack spacing={6}>
                <Stack spacing={3}>
                  <Text fontSize="2xl" fontWeight="bold" color={purpleColor}>
                    Create Account
                  </Text>
                  <Text fontSize="md" color={textColor}>
                    Already have an account?{' '}
                    <ChakraLink as={Link} to="/login" color={purpleColor}>
                      Login
                    </ChakraLink>
                  </Text>
                </Stack>
              </Stack>

              <form onSubmit={handleSignup}>
                <Stack spacing={6}>
                  <FormControl>
                    <FormLabel htmlFor="email" color={textColor}>Email Address</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FaEnvelope color="gray.300" />
                      </InputLeftElement>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        borderColor={borderColor}
                        _focus={{ borderColor: purpleColor, boxShadow: 'none' }}
                        _hover={{ borderColor: purpleColor }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="password" color={textColor}>Password</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FaLock color="gray.300" />
                      </InputLeftElement>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter 6 character or more"
                        required
                        borderColor={borderColor}
                        _focus={{ borderColor: purpleColor, boxShadow: 'none' }}
                        _hover={{ borderColor: purpleColor }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="confirmPassword" color={textColor}>Confirm Password</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FaLock color="gray.300" />
                      </InputLeftElement>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        required
                        borderColor={borderColor}
                        _focus={{ borderColor: purpleColor, boxShadow: 'none' }}
                        _hover={{ borderColor: purpleColor }}
                      />
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    bg={purpleColor}
                    color="white"
                    size="lg"
                    fontSize="md"
                    isLoading={isLoading}
                    _hover={{ bg: 'purple.600' }}
                  >
                    CREATE ACCOUNT
                  </Button>

                  <Stack spacing={6}>
                    <Stack direction="row" align="center">
                      <Divider borderColor={borderColor} />
                      <Text fontSize="sm" whiteSpace="nowrap" color={textColor}>
                        or sign up with
                      </Text>
                      <Divider borderColor={borderColor} />
                    </Stack>

                    <HStack spacing={4}>
                      <Button
                        w="full"
                        variant="outline"
                        leftIcon={<FaGoogle />}
                        borderColor={borderColor}
                        _hover={{ bg: 'gray.50' }}
                      >
                        Google
                      </Button>
                      <Button
                        w="full"
                        variant="outline"
                        leftIcon={<FaFacebook />}
                        borderColor={borderColor}
                        _hover={{ bg: 'gray.50' }}
                      >
                        Facebook
                      </Button>
                    </HStack>
                  </Stack>
                </Stack>
              </form>
            </Stack>
          </Box>

          <Flex
            w={{ base: 'full', md: '50%' }}
            h={{ base: '200px', md: 'full' }}
            bg={colorMode === 'light' ? 'blue.50' : 'gray.900'}
            alignItems="center"
            justifyContent="center"
            p={8}
            borderRadius={{ base: 'none', md: 'xl' }}
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: colorMode === 'light' ? 0.3 : 0.15,
              zIndex: 0,
            }}
          >
            <Box
              position="relative"
              zIndex={1}
              textAlign="center"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                alt="AWS Logo"
                width="300px"
                objectFit="contain"
                mb={6}
              />
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={colorMode === 'light' ? 'blue.600' : 'blue.200'}
                textShadow="0 2px 4px rgba(0,0,0,0.1)"
              >
                AWS Resource Viewer
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
} 