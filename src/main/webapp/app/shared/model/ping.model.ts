export interface IPing {
  id?: number;
  label?: string;
  latitude?: number;
  longitude?: number;
}

export class Ping implements IPing {
  constructor(public id?: number, public label?: string, public latitude?: number, public longitude?: number) {}
}
