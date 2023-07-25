"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import PaddingContainer from "@/components/Shared/PaddingContainer";

export interface IFolderDetailProps {
  folderId?: number;
}

export function FolderDetail({ folderId }: IFolderDetailProps) {
  if (!folderId) return null;

  const query = useQuery({
    queryKey: [endpoints.getFolder(folderId)],
    queryFn: () => getPage(endpoints.getFolder(folderId)),
  });

  let folder: Folder | null = null;
  if (query.data?.success) folder = query.data?.data;

  if (!folder) return null;

  return (
    <PaddingContainer withBottomGap>
      <pre>{JSON.stringify(folder, null, 2)}</pre>
    </PaddingContainer>
  );
}
