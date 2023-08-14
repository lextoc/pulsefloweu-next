export const transformSecondsToHumanReadableString = (
  seconds: number | null,
) => {
  if (!seconds) return null;
  const days = Math.floor(seconds / 86400);
  const remainingSeconds = seconds % 86400;

  const hours = Math.floor(remainingSeconds / 3600);
  const remainingMinutes = remainingSeconds % 3600;

  const minutes = Math.floor(remainingMinutes / 60);
  const remainingSecondsFinal = remainingMinutes % 60;

  let formattedDuration = "";

  if (days > 0) {
    formattedDuration += `${days}d `;
  }

  if (days > 0 || hours > 0) {
    formattedDuration += `${hours}h `;
  }

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSecondsFinal.toString().padStart(2, "0");

  formattedDuration += `${formattedMinutes}m ${formattedSeconds}s`;

  return formattedDuration;
};

export const transformSecondsToTimer = (seconds: number | null) => {
  if (!seconds) return null;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
