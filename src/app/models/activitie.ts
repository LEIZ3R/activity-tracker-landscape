export interface Activity {
  activityId: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string | null;
}

export interface TaskList {
  date: string;
  tasks: Activity[];
}
