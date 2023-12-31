"use client";

import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import queryString from "query-string";
import { useEffect, useState } from "react";

import { getHeaders } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { TimeEntry } from "@/api/types/time-entries";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import { useFetch } from "@/hooks/useQueryBase";
import { useNavigationStore } from "@/stores/navigation";
import {
  transformSecondsToHumanReadableString,
  transformSecondsToTimer,
} from "@/utils/helpers";

import styles from "./index.module.css";
import TimesheetsGeneratorProjectsButton from "./ProjectButton";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface TimesheetsGeneratorProps {}

export default function TimesheetsGenerator() {
  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: "Generate timesheets based on your input" });

  const [timesheetsData, setTimesheetsData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
  const [per, setPer] = useState("day");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedFolders([]);
  }, [selectedProject]);

  const { data: projectsData } = useFetch<Project[]>(endpoints.projects.main);
  const projects: Project[] = projectsData?.success ? projectsData.data : [];

  const { data: foldersData } = useFetch<Folder[]>(endpoints.folders.main, {
    project_id: selectedProject?.id,
  });
  const folders: Folder[] = foldersData?.success ? foldersData.data : [];

  const form = useForm({
    initialValues: {
      from: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
      to: dayjs().format("YYYY-MM-DD"),
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const toggleFolder = (folderId: number) => {
    if (selectedFolders.find((_folderId) => _folderId === folderId)) {
      setSelectedFolders(
        selectedFolders.filter((_folderId) => _folderId !== folderId),
      );
    } else {
      setSelectedFolders([...selectedFolders, folderId]);
    }
  };

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
  };

  const fetchTimesheets = () => {
    setTimesheetsData(null);
    setIsLoading(true);
    return fetch(
      `${
        per === "day"
          ? endpoints.misc.timesheetsPerDay
          : endpoints.misc.timesheetsPerWeek
      }${`?${queryString.stringify({
        ["folder_ids[]"]: selectedFolders,
        from: form.getInputProps("from").value,
        to: form.getInputProps("to").value,
      })}`}`,
      requestOptions,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTimesheetsData(data);

        if (!Object.keys(data?.data?.time_entries).length) return;

        console.info(data?.data);
        const csvContent = [
          "Date,Task,Start Time,Duration",
          ...Object.keys(data?.data?.time_entries).flatMap((date) => [
            `"${date}", "${data?.data
              ?.view_type}", "", "${transformSecondsToHumanReadableString(
              data?.data?.time_entries[date]?.total_duration,
            )}"`,
            ...data?.data?.time_entries[date]?.time_entries.map(
              (time_entry: TimeEntry) =>
                `"${dayjs(time_entry.start_date).format("YYYY-MM-DD")}","${
                  time_entry.task_name
                }","${dayjs(time_entry.start_date).format(
                  "HH:mm",
                )}","${getDurationFromDates(
                  time_entry.start_date,
                  time_entry.end_date,
                )}"`,
            ),
          ]),
        ].join("\n");

        // Create a Blob containing the CSV data
        const csvBlob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8",
        });

        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(csvBlob);
        downloadLink.download = "timesheets.csv";
        downloadLink.style.display = "none";

        // Append the link to the document and trigger the click event
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up the URL object after download
        URL.revokeObjectURL(downloadLink.href);

        // Remove the link from the document
        document.body.removeChild(downloadLink);
      })
      .finally(() => setIsLoading(false));
  };

  const getDurationFromDates = (start: string, end: string) => {
    const seconds = dayjs(end).diff(dayjs(start), "seconds");
    return transformSecondsToTimer(seconds);
  };

  return (
    <div>
      <h2>Choose date range</h2>
      <div className="cards">
        <Input
          className={styles.input}
          label="From"
          type="date"
          {...form.getInputProps("from")}
        />
        <Input
          className={styles.input}
          label="To"
          type="date"
          {...form.getInputProps("to")}
        />
      </div>
      <hr className="divider" />
      <h2>Choose project</h2>
      <div className="cards">
        {projects.map((_project) => (
          <TimesheetsGeneratorProjectsButton
            key={_project.id}
            project={_project}
            setProject={() => setSelectedProject(_project)}
            active={_project.id === selectedProject?.id}
          />
        ))}
      </div>
      {selectedProject && (
        <>
          <hr className="divider" />
          <h2>Select folders</h2>
          <div className={styles.foldersPicker}>
            {folders.map((folder) => (
              <div key={folder.id} className={styles.foldersCheckbox}>
                <Input
                  label={folder.name}
                  type="checkbox"
                  onClick={() => toggleFolder(folder.id)}
                />
              </div>
            ))}
          </div>
          <hr className="divider" />
          <h2>Select type</h2>
          <div className={styles.buttonWrapper}>
            <Input
              label="Per day"
              type="radio"
              onClick={() => setPer("day")}
              checked={per === "day"}
            />
            <Input
              label="Per week"
              type="radio"
              onClick={() => setPer("week")}
              checked={per === "week"}
            />
          </div>
          <hr className="divider" />
          <Button disabled={isLoading} noMargin onClick={fetchTimesheets}>
            Generate timesheet
          </Button>
          <hr className="divider" />
        </>
      )}
      {timesheetsData && (
        <>
          <div className={styles.timesheetsWrapper}>
            <p className={styles.topDetails}>
              <div>
                Start date
                <br />
                <strong>{timesheetsData?.data?.from_date}</strong>
              </div>
              <div>
                End date
                <br />
                <strong>{timesheetsData?.data?.to_date}</strong>
              </div>
              <div>
                View type
                <br />
                <strong>per {timesheetsData?.data?.view_type}</strong>
              </div>
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Start time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(timesheetsData?.data?.time_entries).map((date) => (
                  <>
                    <tr>
                      <td>
                        <strong>
                          {dayjs(date).format("dddd DD MMMM YYYY")}
                        </strong>
                      </td>
                      <td></td>
                      <td>
                        <strong>
                          {transformSecondsToHumanReadableString(
                            timesheetsData?.data?.time_entries[date]
                              ?.total_duration,
                          )}
                        </strong>
                      </td>
                    </tr>
                    {timesheetsData?.data?.time_entries?.[
                      date
                    ]?.time_entries.map((time_entry: TimeEntry) => (
                      <>
                        <tr>
                          <td>{time_entry.task_name}</td>
                          <td>
                            {dayjs(time_entry.start_date).format(
                              "DD MMMM YYYY [at] HH:mm",
                            )}
                          </td>
                          <td>
                            {getDurationFromDates(
                              time_entry.start_date,
                              time_entry.end_date,
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                    <tr>
                      <td className="empty"></td>
                      <td className="empty"></td>
                      <td className="empty"></td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
