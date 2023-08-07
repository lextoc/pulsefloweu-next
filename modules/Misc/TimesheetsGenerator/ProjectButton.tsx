import { Project } from "@/api/types/projects";
import Button from "@/components/Buttons/Base";

import styles from "./ProjectButton.module.css";

export interface TimesheetsGeneratorProjectsButtonProps {
  project: Project;
  setProject: Function;
  active: boolean;
}

export default function TimesheetsGeneratorProjectsButton({
  project,
  setProject,
  active,
}: TimesheetsGeneratorProjectsButtonProps) {
  return (
    <div className={`${styles.root} ${active ? styles.active : ""}`}>
      <h2 className="break-word">{project.name}</h2>
      <div className={styles.footer}>
        <div className=" buttons-right">
          {!active && <Button onClick={() => setProject()}>Select</Button>}
        </div>
      </div>
    </div>
  );
}
