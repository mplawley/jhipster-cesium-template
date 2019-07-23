export interface ICesiumViewer {
  id?: number;
}

export class CesiumViewer implements ICesiumViewer {
  constructor(public id?: number) {}
}
