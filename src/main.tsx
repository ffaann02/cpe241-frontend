import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { AuthProvider } from './context/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </AuthProvider>
    </BrowserRouter>
);
