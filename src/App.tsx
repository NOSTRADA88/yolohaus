import useRoutes from "./routes/routes";


function App() {

  const routes = useRoutes();
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;