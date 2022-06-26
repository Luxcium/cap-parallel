import { Tedis } from 'tedis';

export type SetJsonArgs = {
  prefix: string;
  jsonPath: string;
  keyID: string;
  value: string | number;
  RDSServer: Tedis;
};
