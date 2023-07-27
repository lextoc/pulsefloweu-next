export const convertSecondsToHHmmss = (seconds: number | null) => {
  if (!seconds) return null;
  let hours: any = Math.floor(seconds / 3600);
  let minutes: any = Math.floor((seconds - hours * 3600) / 60);
  let _seconds: any = seconds - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (_seconds < 10) {
    _seconds = "0" + _seconds;
  }
  return hours + ":" + minutes + ":" + _seconds;
};
