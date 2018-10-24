export interface IAppState {
    emailIsInDatabase: boolean;
    locations: ILocation[];
    selection: string;
    email: string;
    openAutoComplete: boolean;
    validEmail: boolean;
    showModal: boolean;
    menuIndex: number;
  }
  
  export interface ILocation {
    state: string;
    city: string;
    coordinates: number[];
  }
  
  export interface IApiData {
    records: IRecord[];
    parameters: {};
    nhits: number;
    facet_groups: {};
    coordinates: number[];
  }
  
  export interface IRecord {
    datasetid: string;
    recordid: string;
    fields: IFields;
    geometry: {};
    record_timestamp: string;
  }
  
  export interface IFields {
    city: string;
    rank: number;
    state: string;
    coordinates: number[];
    growth_from_2000_to_2013: number;
    population: number;
  }
  