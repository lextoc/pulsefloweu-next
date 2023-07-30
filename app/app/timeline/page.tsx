import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";

import styles from "./page.module.css";

export interface AppTimelineProps {}

export default function AppTimeline(props: AppTimelineProps) {
  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>
            Your calendar <span className="wip" />
          </h1>
          <p>Use a timeline for inserting time entries.</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>
        <p>We're currently not working on this feature but it will be there.</p>
      </PaddingContainer>
    </div>
  );
}
