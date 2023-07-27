"use client";

import { IconMenu2 } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

import { clearCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import AuthenticationContext from "@/lib/Authentication/Context";
import Button from "@/ui/Buttons/Base";
import Popover from "@/ui/Overlays/Popover";

import styles from "./index.module.css";

export interface NavigationMenuProps {}

export default function NavigationMenu(props: NavigationMenuProps) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const user = useContext(AuthenticationContext);
  const { push } = useRouter();

  const onSignOut = () => {
    clearCookies();
    push("/");
    queryClient.invalidateQueries([endpoints.authValidateToken]);
  };

  if (!pathname.startsWith("/app")) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
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
