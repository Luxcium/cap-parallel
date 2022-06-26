import { Tedis } from 'tedis';

/*
 + Glosaire:
 - RDSS: Redis Data Structures Server
 */

/**********************************************************************
 * In a prefix space (name space) create a getter for a specif RDSS to
 * retrive the value for specific key (ID) on a predetermined jsonPath.
 **********************************************************************/
export const tedis_jsonGet =
  (prefix: string) =>
  <R = any>(jsonPath: string = '.') =>
  /**
   * @param RDSServer - Redis Data Structures Server
   */
  (RDSServer: Tedis) =>
  (key: string, close: 'close' | boolean = false) =>
    (async (): Promise<R> =>
      RDSServer.command('JSON.GET', `${prefix}::${key}`, jsonPath).then(
        value => {
          close === 'close' || close ? RDSServer.close() : null;
          return value;
        }
      ))();

/**********************************************************************
 * In a prefix space (name space) activated for a specific RDSS create
 * a setter for a specific key (ID) to wich diferent jsonPaths will be
 * asigned a value.
 **********************************************************************/
export const tedis_jsonSet =
  (prefix: string) =>
  (jsonPath: string) =>
  /**
   * @param RDSServer - Redis Data Structures Server
   */
  (RDSServer: Tedis) =>
  (key: string) =>
  <R>(value: string | number | Date, close: 'close' | boolean = false) =>
    (async (): Promise<R> =>
      RDSServer.command(
        'JSON.SET',
        `${prefix}::${key}`,
        jsonPath,
        `${value}`
      ).then((result: R) => {
        close === 'close' || close ? RDSServer.close() : null;
        return result;
      }))();
