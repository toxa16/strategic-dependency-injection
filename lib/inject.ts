import 'reflect-metadata';
import {injectableRegister} from './injectable-register';

/**
 * Performs dependency injection for dependent class.
 * @param dependent
 */
export function inject(dependent: any): Promise<any> {
  
  // TODO: logging
  //console.log('INJECTABLE REGISTER:');
  //console.log(injectableRegister);
  //console.log('\n');
  

  const paramTypes =
    Reflect.getMetadata('design:paramtypes', dependent);
  
  if (!paramTypes || !paramTypes.length) {
    return Promise.resolve(new dependent());
  }

  let argPromises = [];
  for (const parameter of paramTypes) {
    const injectableRecord = injectableRegister.get(parameter.name);
    
    if (!injectableRecord) throw new ReferenceError(
      `${parameter.name} class is not an injectable.`
    );
    
    const factory = injectableRecord.factory;
    
    if (factory) {
      argPromises.push(factory());
    } else {
      argPromises.push(inject(injectableRecord.constructor))
    }
  }
  

  return Promise.all(argPromises)
    .then(args => {
      return new dependent(...args);
    })
    .catch(err => console.error(err)); // TODO: log errors
}