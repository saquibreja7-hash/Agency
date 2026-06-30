'use client'

import { Component, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1d1d1d' }}>
          <p style={{ fontSize: 16, color: '#696969' }}>Something went wrong. Please refresh the page.</p>
          <button onClick={() => this.setState({ hasError: false })} style={{ marginTop: 16, padding: '10px 24px', background: '#4a154b', color: '#fff', border: 'none', borderRadius: 100, cursor: 'pointer', fontSize: 14 }}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
