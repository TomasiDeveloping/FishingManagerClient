import {Address} from './address';

export interface Club {
  fishingClubId: number;
  name: string;
  address: Address;
  rules: Rules[];
  fishSpecies: Fish[];
  website: string;
  pictureUrl: string;
}

interface Rules {
  rule: string;
}

interface Fish {
  closedSeasonEnd: string;
  closedSeasonStart: string;
  fishSpecie: string;
  minimumSize: string;
}


