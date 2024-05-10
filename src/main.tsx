import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider,extendTheme } from '@chakra-ui/react';
import './index.css';
import { AuthProvider} from './context/AuthProvider.tsx';
const colors = {
    royalblue:{
        50: '#f4f8ff',
        100: '#e9f1ff',
        200: '#c7dfff',
        300: '#a5ccff',
        400: '#61aaff',
        500: '#1d88ff',
        600: '#1a7de6',
        700: '#1466bf',
        800: '#104f99',
        900: '#0d407f',
    }
}
const theme = extendTheme({colors})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </AuthProvider>
    </BrowserRouter>
);
