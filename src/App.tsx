import { ChakraProvider } from "@chakra-ui/react";

import { QueryClientProvider, QueryClient } from "react-query";
import Router from "./services/Router";
import AuthProvider from "./contexts/Authentication";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider>
            <Router />
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
