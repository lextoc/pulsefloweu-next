"use client";

import { useForm } from "@mantine/form";
import { IconChevronLeft, IconMenu2 } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { clearCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import update from "@/api/update";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import AuthenticationContext from "@/lib/Authentication/Context";
import { useNavigationStore } from "@/stores/navigation";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  username: string;
}

export interface NavigationMenuProps {}

export default function NavigationMenu(props: NavigationMenuProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const menuTitle = useNavigationStore((state) => state.menuTitle);
  const queryClient = useQueryClient();
  const user = useContext(AuthenticationContext);
  const { push } = useRouter();
  const pathname = usePathname();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onSignOut = () => {
    clearCookies();
    push("/");
    queryClient.invalidateQueries([endpoints.authValidateToken]);
  };

  const form = useForm<ProfileFormValues>({
    initialValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      username: user?.username || "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    update(endpoints.auth, {
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.username,
    }).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      } else {
        queryClient.invalidateQueries().then(() => {
          setIsEditModalOpen(false);
        });
      }
    });
  };

  useEffect(() => {
    form.setValues({
      firstName: user?.first_name,
      lastName: user?.last_name,
      username: user?.username,
    });
  }, [isEditModalOpen]);

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
            {/* {menuTitle} */}
          </div>
        </div>
        <button className={styles.menu}>
          <IconMenu2 color="white" />
        </button>
        <div className={styles.account}>
          {user?.email && (
            <div className={styles.signedInAs}>
              Signed in as<strong>{user?.username}</strong>
            </div>
          )}
          <Popover
            white
            content={
              <div className={styles.dropdown}>
                <Button
                  noMargin
                  variant="subtle"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit profile
                </Button>
                <Button noMargin variant="subtle" onClick={onSignOut}>
                  Sign out
                </Button>
              </div>
            }
          />
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} close={() => setIsEditModalOpen(false)}>
        <h1>Edit profile</h1>
        <p>Please fill in your profile details correctly.</p>
        <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Input
            label="First name"
            {...form.getInputProps("firstName")}
            placeholder="First name"
          />
          <Input
            label="Last name"
            {...form.getInputProps("lastName")}
            placeholder="Last name"
          />
          <Input
            label="Username"
            {...form.getInputProps("username")}
            placeholder="Username"
          />
          <div className="buttons-right">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
