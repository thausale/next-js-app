import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/csr">Client Side Rendering</Link>
          </li>
          <li>
            <Link href="/ssr">server Side Rendering</Link>
          </li>
          <li>
            <Link href="/ssg">static Side generation</Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
};

export default Layout;
