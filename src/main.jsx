import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from './components/error/ErrorBoundary.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary fallback="There was an error">
            <QueryClientProvider client={queryClient}>
                <Suspense fallback="loading data ...">
                    <App />
                </Suspense>
            </QueryClientProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
