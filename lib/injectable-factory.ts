/**
 * 
 */
export interface InjectableFactory {

  /**
   * 
   */
  factory(): any | Promise<any>;
}