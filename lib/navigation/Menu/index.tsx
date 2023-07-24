"use client";

import { IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { clearCookies } from "@/api/cookies";
import { IUser } from "@/api/types/auth";
import Button from "@/components/buttons/base";
import Popover from "@/components/shared/Popover";

import styles from "./index.module.css";

export interface INavigationMenuProps {
  user: IUser | null | undefined;
}

export default function NavigationMenu({ user }: INavigationMenuProps) {
  const { push } = useRouter();

  const onSignOut = () => {
    clearCookies();
    push("/");
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <button className={styles.menu}>
          <IconMenu2 size="1rem" color="white" />
        </button>
        <div className={styles.account}>
          <div className={styles.signedInAs}>
            Signed in as<strong>{user?.email}</strong>
          </div>
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
