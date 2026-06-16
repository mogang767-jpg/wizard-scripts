import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('BotScripts Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F0F12] text-white flex flex-col items-center justify-center px-5 text-center">
          <p className="font-display text-4xl font-bold text-[#FFD600] mb-4">⚠ ОШИБКА</p>
          <p className="text-[#8B8B93] mb-6">Что-то пошло не так. Попробуй перезагрузить приложение.</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-brutal"
          >
            ПЕРЕЗАГРУЗИТЬ
          </button>
          {this.state.error && (
            <p className="mt-6 text-xs text-[#5A5A62] font-mono max-w-xs break-all">
              {this.state.error.message}
            </p>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
