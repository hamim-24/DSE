'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from './context/AppContext';

// Simple error boundary component for the entire app
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Root error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '20px',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: '600px',
            margin: '50px auto',
          }}
        >
          <h1 style={{ color: '#d32f2f' }}>Something went wrong</h1>
          <p>
            We're sorry, but there was an error loading the application. Please
            try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '15px',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Mount the app with error boundary and context provider
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
