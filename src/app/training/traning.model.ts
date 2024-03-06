export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: ExerciseState;
}

export type ExerciseState = 'completed' | 'cancelled' | null;
