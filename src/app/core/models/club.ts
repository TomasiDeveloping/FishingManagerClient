import {Address} from './address';

export interface Club {
  fishingClubId: number;
  name: string;
  address: Address;
  rules: {
    Regeln: {
      Regel: string[];
    }
  };
  fishSpecies: {
    FishArten: {
      Fisch: Fish[];
    }
  };
  website: string;
  pictureUrl: string;
}

interface Fish {
  Name: string;
  Schonmass: string;
  SchonZeitVon: string;
  SchonZeitBis: string;
}


