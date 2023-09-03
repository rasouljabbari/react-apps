import React from 'react'

function ErrorBoundaryContent({ fallback, error, errorInfo }) {
    return (
        <div className='dv-error-content'>
            <h2>{fallback}</h2>
            <p>
                <b>{error?.toString()}</b>
            </p>
            <div><b>Stack Trace:</b> {errorInfo?.componentStack}</div>
        </div>
    )
}

export default ErrorBoundaryContent