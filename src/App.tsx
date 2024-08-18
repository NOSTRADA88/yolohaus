import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoutesComponent from "./routes/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} children={<RoutesComponent />}/>
  );
}

export default App;
