export interface Statistic {
  id: number;
  userId: number;
  fullName: string;
  year: number;
  licenceId: number;
  licenceName: string;
  statistic: CatchStatistic;
}

export interface CatchStatistic {
  fishingClub: string;
  firstName: string;
  lastName: string;
  year: string;
  months: Months[];
}

export interface Months {
  month: string;
  days: Days[];
}

export interface Days {
  day: string;
  hour: string;
  fishCatches: FishCatch[];
}

export interface FishCatch {
  fish: string;
  number: string;
}
