import 'reflect-metadata';
import {injectableRegister} from './injectable-register';

/**
 * Injectable class decorator
 * @param constructor
 * @constructor
 */
export function Injectable(constructor: Function) {
  
  // TODO: arrange logging
  //console.log(`Injectable ${constructor.name}\n`);
  
  if (injectableRegister.get(constructor.name)) {
    throw new Error(`Duplicated injectable name ${constructor.name}`);
  }

  let injectableRecord = { constructor: constructor };
  if (constructor.prototype.factory) {
    injectableRecord['factory'] = 
      constructor.prototype.factory;
  }
  injectableRegister.set(constructor.name, injectableRecord);
}