import PaddingContainer from "@/components/Shared/PaddingContainer";

import styles from "./NewTask.module.css";

export interface NewTaskProps {}

export default function NewTask(props: NewTaskProps) {
  return (
    <div className={styles.root}>
      <PaddingContainer>
        <div>hi</div>
      </PaddingContainer>
    </div>
  );
}
