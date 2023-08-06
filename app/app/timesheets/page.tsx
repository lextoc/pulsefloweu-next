import TimesheetsGenerator from "@/domains/Misc/TimesheetsGenerator";
import { Header } from "@/shared/Shared/Header";
import PaddingContainer from "@/shared/Shared/PaddingContainer";

import styles from "./page.module.css";

export interface AppTimesheetsProps {}

export default function AppTimesheets(props: AppTimesheetsProps) {
  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>
            Timesheets generator <span className="wip" />
          </h1>
          <p>Generate timesheets for a specific date range</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer withBottomGap>
        <TimesheetsGenerator />
      </PaddingContainer>
    </div>
  );
}
