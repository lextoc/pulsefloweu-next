"use client";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { IFolder } from "@/api/types/folders";
import Button from "@/components/interaction/Button";
import Popover from "@/components/shared/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./Menu.module.css";

export interface IFolderCardMenuProps {
  folder: IFolder;
}

export default function FolderCardMenu({ folder }: IFolderCardMenuProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onDelete = () => {
    const hasAgreed = window.confirm(
      "Destroying your folder will also remove all its tasks and timesheets. Are you sure?",
    );
    if (!hasAgreed) return;
    destroy(endpoints.destroyFolder(folder.id!)).then((data) => {
      if (data.success) {
        showSnackbar({
          message: "Folder has been deleted",
        });
      } else {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      }
    });
  };

  return (
    <div className={styles.root}>
      <Popover
        content={
          <div className={styles.menu}>
            <Button variant="subtle" danger onClick={onDelete} noMargin>
              Delete folder
            </Button>
          </div>
        }
      />
    </div>
  );
}
