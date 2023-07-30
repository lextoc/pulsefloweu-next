import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";

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
      <PaddingContainer>
        <p>Timesheet generator requirements:</p>
        <ul>
          <li>Select one project</li>
          <li>Select (multiple) folder(s)</li>
        </ul>
      </PaddingContainer>
    </div>
  );
}
