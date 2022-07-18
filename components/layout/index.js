import Header from "../header";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname !== "/events/[id]" ? true : false;
  return (
    <>
      <Header isHomePage={isHomePage} />
      <main>{children}</main>
    </>
  );
}
