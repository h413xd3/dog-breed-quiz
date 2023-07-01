import { Dog } from '@models/dog';
import { dogs } from '@data/dogs';

export function findDogById(id: number): Dog | undefined {
    return dogs.find(dog => dog.id === id);
}
