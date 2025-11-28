"use client";

import React, { ReactNode, ReactElement } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactElement;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  section?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in ${this.props.section || "component"}:`, error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.resetError);
      }

      return (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <div>
                <CardTitle className="text-red-900">Something went wrong</CardTitle>
                <CardDescription className="text-red-700">
                  {this.props.section ? `Error in ${this.props.section}` : "An error occurred"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-red-800">
              {this.state.error?.message || "An unexpected error occurred. Please try again."}
            </p>
            <div className="flex gap-3">
              <Button
                onClick={this.resetError}
                variant="outline"
                className="border-red-300 hover:bg-red-100"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                variant="outline"
                className="border-red-300 hover:bg-red-100"
              >
                Go to home
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional error boundary wrapper for use with async components
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  section?: string
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary section={section}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
