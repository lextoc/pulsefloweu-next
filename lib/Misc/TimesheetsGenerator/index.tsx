"use client";

import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import queryString from "query-string";
import { useState } from "react";

import { getHeaders } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { TimeEntry } from "@/api/types/time-entries";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./index.module.css";
import TimesheetsGeneratorProjectsButton from "./ProjectButton";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface TimesheetsGeneratorProps {}

export default function TimesheetsGenerator(props: TimesheetsGeneratorProps) {
  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: "Generate timesheets based on your input" });

  const [timesheetsData, setTimesheetsData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);

  const query = useQuery({
    queryKey: [endpoints.getProjects],
    queryFn: () => getPage(endpoints.getProjects),
  });

  let projects: Project[] = [];
  if (query.data?.success) projects = query.data?.data;

  const foldersQuery = useQuery({
    queryKey: [endpoints.getFoldersFromProject(selectedProject?.id || -1)],
    queryFn: () =>
      getPage(endpoints.getFoldersFromProject(selectedProject?.id || -1)),
  });

  let folders: Folder[] = [];
  if (foldersQuery.data?.success) folders = foldersQuery.data?.data;

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
    return fetch(
      `${endpoints.getTimesheets}${`?${queryString.stringify({
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
      });
  };

  return (
    <div>
      <h2>Select date range</h2>
      <div className={styles.inputs}>
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
      <h2>Select project</h2>
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
          {folders.map((folder) => (
            <div key={folder.id} className={styles.foldersCheckbox}>
              <Input
                label={folder.name}
                type="checkbox"
                onClick={() => toggleFolder(folder.id)}
              />
            </div>
          ))}
          <Button onClick={fetchTimesheets}>Generate timesheet</Button>
        </>
      )}
      {timesheetsData && (
        <>
          <div className={styles.timesheetsWrapper}>
            <p>
              <strong>{timesheetsData?.data?.from_date}</strong> Start date
              <br />
              <strong>{timesheetsData?.data?.to_date}</strong> End date
            </p>
            {timesheetsData.data?.time_entries?.map((time_entry: TimeEntry) => (
              <>
              <div className={styles.timeEntry}>
                </div>
                <pre>{JSON.stringify(time_entry, null, 2)}</pre>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
