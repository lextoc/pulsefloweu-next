import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import TimesheetsGenerator from "@/lib/Misc/TimesheetsGenerator";

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
