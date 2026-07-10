export type RaidEvent = {
  startTime: number;
  startDate: string;
  leaderName: string;
  signUps: SignUp[];
  title: string;
};

export type SignUp = {
  className: string;
  name: string;
  specName: string;
};

export type RaidData = {
  leaderName: string;
  startTime: string;
  startDate: string;
  title: string;
  className: string;
  name: string;
  specName: string;
};
