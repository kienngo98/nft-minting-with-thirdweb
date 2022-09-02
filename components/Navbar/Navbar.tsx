import Link from "next/link";
import { useRouter } from "next/router";
import { JSXElementConstructor, ReactElement, ReactFragment } from "react";
import usePageLoad from "../../hooks/usePageLoad";
import styles from "./Navbar.module.css";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
type NavBarProps = {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment;
};

const NavBar = (props: NavBarProps) => {
  const pageLoaded = usePageLoad();

  const address = useAddress();
  const disconnect = useDisconnect();
  return (
    <div id={styles.Navbar}>
      {pageLoaded && !address && (
        <span className={styles.LogInBtnContainer}>
          <ConnectWallet />
        </span>
      )}
      {pageLoaded && address && (
        <span className={styles.LogInBtnContainer}>
          <button onClick={disconnect}>Disconnect</button>
        </span>
      )}
      {/* {pageLoaded && router.pathname !== "/login" && !isConnected && (
        <span className={styles.LogInBtnContainer}>
          <LogInButton />
        </span>
      )}
      {pageLoaded && router.pathname !== "/profile" && isConnected && (
        <Link href={{ pathname: "/profile", query: { address: address } }}>
          <a className={styles.ProfileIcon}>
            <img src="/misc_icons/user.svg" width={40} height={40} alt="" />
          </a>
        </Link>
      )}

      {pageLoaded && router.pathname === "/profile" && isConnected && (
        <ConnectWalletButton />
      )} */}
      <Link href="/profile">
        <a
          style={{
            marginTop: "auto",
            marginRight: "40px",
            marginBottom: "auto",
            color: "white",
          }}
        >
          Profile
        </a>
      </Link>
    </div>
  );
};

export default NavBar;
