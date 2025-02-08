import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#f5e6ff',
    100: '#dbb3ff',
    200: '#c180ff',
    300: '#a74dff',
    400: '#8d1aff',
    500: '#7400e6',
    600: '#5a00b3',
    700: '#400080',
    800: '#26004d',
    900: '#0d001a',
  },
};

const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
  },
};

const styles = {
  global: (props: { colorMode: 'light' | 'dark' }) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
    },
  }),
};

const theme = extendTheme({
  config,
  colors,
  components,
  styles,
});

export default theme; 