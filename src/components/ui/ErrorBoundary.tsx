import React, { Component, ErrorInfo, ReactNode } from "react";
import { IS_DEVELOPMENT } from "@/config/env";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode | ((props: { error: Error; reset: () => void }) => ReactNode);
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({
          error: this.state.error,
          reset: this.handleReset,
        });
      }

      return (
        this.props.fallback || (
          <div
            role="alert"
            className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              There was an error loading this section. This might be due to a network issue or a
              temporary glitch.
              {IS_DEVELOPMENT && this.state.error && (
                <span className="block mt-2 text-xs font-mono opacity-60">
                  {this.state.error.message}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
