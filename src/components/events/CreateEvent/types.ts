export interface FormValues {
  type: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  address: string;
  trailDifficulty: string;
  trailNotes: string;
  rallyAddress: string;
  membersOnly: boolean;
  host: string;
  trail: string;
  image: string | null;
  newImage: string | null;
  maxAttendees: number;
  maxRigs: number;
  changeDisabled: boolean;
}
