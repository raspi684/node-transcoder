import { injectable } from 'inversify';

@injectable()
export abstract class Serializer<T> {
  abstract serializeCollection(objects: T[]): Promise<Record<string, any>[]>;
  abstract serialize(object: T): Promise<Record<string, any>>;
}
