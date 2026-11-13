import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'An unexpected rendering error occurred.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
          <div className="max-w-md w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Something went wrong
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {this.state.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              Reload Sarf Companion
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
