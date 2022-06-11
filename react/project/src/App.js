import {
  Route,
  BrowserRouter,
  Outlet,
  Link,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

function Layout() {
  let navigate = new useNavigate();
  return (
    <div>
      <div>
        <h1>welcom to the app</h1>
        <nav>
          <div>两种跳转路由的方式 Link 和 useNavigate钩子</div>
          <Link to="invoice/:666">invoice</Link>
          <a
            href
            onClick={() => {
              navigate("/dashboard");
            }}
            style={{ marginLeft: "12px" }}
          >
            dashboard
          </a>
          {/* <Link to="dashboard">dashboard</Link> */}
        </nav>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

function Invoice() {
  const { value } = useParams();
  return (
    <div style={{ marginTop: "20px" }}>
      hello Invoive , 接收的参数为 {value}
    </div>
  );
}

function Dashboard() {
  return "hello Dashboard";
}

function NoFound() {
  return "404";
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Invoice />} />
          <Route path="invoice" element={<Invoice />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
        </Route> */}
        <Route path="/" element={<Layout />}>
          <Route path="invoice/:value" element={<Invoice />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<NoFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
