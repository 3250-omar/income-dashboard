export interface SubItem {
  name: string;
  completed: boolean;
}

export interface GoalItem {
  goal: string;
  completed: boolean;
  subItems: SubItem[];
  month: number;
}
