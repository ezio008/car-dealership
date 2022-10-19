import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Volvo',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Honda',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Jeep',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Tesla',
    createdAt: Date.now(),
  },
];
