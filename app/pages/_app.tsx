import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "app/core/styles/theme";
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
  );
}
