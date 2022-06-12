import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
  useParams,
  useResolvedPath,
  useMatch,
} from "react-router-dom";

function Layout() {
  return (
    <div>
      <h1>there is my route</h1>
      <nav>
        <Link to="/invoices">invoices:发票</Link> |{" "}
        <Link to="/expenses">expenses:开支</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  return <h2>this is Home</h2>;
}

const invoicesMenu = [
  {
    lable: "aa",
    value: "aa",
  },
  {
    lable: "bb",
    value: "bb",
  },
];

function Invoices() {
  return (
    <div>
      <nav style={{ borderRight: "solid 1px", padding: "1rem" }}>
        {invoicesMenu.map((menu) => (
          // <NavLink
          //   style={{ marginRight: "8px" }}
          //   to={`/invoices/${menu.value}`}
          //   key={menu.value}
          // >
          //   {menu.lable}
          // </NavLink>

          // 自定义Link
          <CustomLink
            to={`/invoices/${menu.value}`}
            key={menu.value}
            style={{ marginRight: "8px" }}
          >
            {menu.lable}
          </CustomLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

function Invoice() {
  const param = useParams();
  return (
    <div style={{ padding: "1rem" }}>
      <h2>这里是Invoice</h2>
      <h3>路由传值为 {param?.invoiceId}</h3>
    </div>
  );
}

function Expenses() {
  return <h2>Expenses</h2>;
}

function NoFound() {
  return <h2>404</h2>;
}

function CustomLink({ children, to, ...props }) {
  let resolve = useResolvedPath(to);
  let match = useMatch({ path: resolve.pathname, end: true });
  console.log("match", match);
  return (
    <div>
      <Link
        style={{ textDecoration: match ? "underLine" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && "(active)"}
    </div>
  );
}

export default function MenuRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="invoices" element={<Invoices />}>
            <Route index element={"hhhhh 这里是 Invoices"} />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route path="expenses" element={<Expenses />} />
          <Route path="*" element={<NoFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
