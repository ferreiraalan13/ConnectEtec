import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { QueryClientProvider, QueryClient } from "react-query";
import Router from "./services/Router";
import AuthProvider from "./contexts/Authentication";

function App() {
  const queryClient = new QueryClient();

  const theme = extendTheme({
    semanticTokens: {},
    breakpoints: {
      base: "340px",
      sm: "410px",
      md: "1024px",
      lg: "1180",
      xl: "1920px",
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Router />
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
