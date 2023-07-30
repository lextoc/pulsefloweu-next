"use client";

import { IconChevronLeft, IconMenu2 } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

import { clearCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import Button from "@/components/Buttons/Base";
import Popover from "@/components/Overlays/Popover";
import AuthenticationContext from "@/lib/Authentication/Context";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./index.module.css";

export interface NavigationMenuProps {}

export default function NavigationMenu(props: NavigationMenuProps) {
  const menuTitle = useNavigationStore((state) => state.menuTitle);
  const queryClient = useQueryClient();
  const user = useContext(AuthenticationContext);
  const { push } = useRouter();
  const pathname = usePathname();

  const onSignOut = () => {
    clearCookies();
    push("/");
    queryClient.invalidateQueries([endpoints.authValidateToken]);
  };

  if (!pathname.startsWith("/app")) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <div className={styles.menuTitle}>
          <div className={styles.menuTitleInner}>
            <button
              className={styles.backButton}
              onClick={() => history.back()}
              type="submit"
            >
              <IconChevronLeft />
            </button>
            {menuTitle}
          </div>
        </div>
        <button className={styles.menu}>
          <IconMenu2 size="1rem" color="white" />
        </button>
        <div className={styles.account}>
          {user?.email && (
            <div className={styles.signedInAs}>
              Signed in as<strong>{user?.email}</strong>
            </div>
          )}
          <Popover
            white
            content={
              <>
                {/* <p>
                  Signed in as<strong>{user?.email}</strong>
                </p> */}
                <Button noMargin variant="subtle" onClick={onSignOut}>
                  Sign out
                </Button>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
