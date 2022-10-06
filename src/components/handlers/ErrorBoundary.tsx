import React, { ReactNode } from 'react'

import { Container, Stack } from '../shared'

type ErrorBoundaryProps = {
  children?: ReactNode
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error?: any; errorInfo?: any }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(errorInfo)
    this.setState({ ...this.state, errorInfo, error })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container
          maxWidth='md'
          style={{
            margin: 'auto'
          }}
        >
          <Stack direction='column'>
            <h1>Something went wrong.</h1>
            {this.state.error?.message && <p>{this.state.error?.message}</p>}
            {this.state.errorInfo?.componentStack && (
              <p>{this.state.errorInfo.componentStack}</p>
            )}
          </Stack>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
