"use client";

import { useForm } from "@mantine/form";
import { IconChevronLeft, IconMenu2 } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
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
  avatar: Blob | string;
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
  const [file, setFile] = useState<Blob | null>(null);

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
      avatar: user?.avatar || "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    const formData = new FormData();

    formData.append("first_name", `${values.firstName || user?.first_name}`);
    formData.append("last_name", `${values.lastName || user?.last_name}`);
    formData.append("username", `${values.username || user?.username}`);
    if (file) formData.append("avatar", file);

    update<FormData>(endpoints.auth, formData).then((data) => {
      if (data?.errors || data?.error) {
        showSnackbar({
          message: data?.errors?.join(" ") || "Something went wrong",
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
      avatar: user?.avatar,
    });
  }, [isEditModalOpen]);

  const saveAvatarLocally = (event: any) => {
    const file = event?.target?.files?.[0] || null;
    setFile(file);
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
            {/* {menuTitle} */}
          </div>
        </div>
        <button className={styles.menu}>
          <IconMenu2 color="white" />
        </button>
        <div className={styles.account}>
          {user?.email && (
            <div className={styles.signedInAs}>
              Signed in as
              {user?.avatar && (
                <Image
                  src={user?.avatar}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  width={80}
                  height={80}
                  className={`${styles.avatar} avatar`}
                />
              )}
              <strong>{user?.username}</strong>
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
        <Form
          onSubmit={form.onSubmit((values) => onSubmit(values))}
          encType="multipart/form-data"
        >
          <Input
            type="file"
            label="Avatar"
            placeholder="Avatar"
            accept="image/*"
            onChange={(event) => saveAvatarLocally(event)}
          />
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
            <Button variant="subtle" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
