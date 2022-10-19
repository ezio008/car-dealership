import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/index';
@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  fineOneById(id: string): Car {
    const car = this.cars.find((car) => car.id == id);

    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuid(),
      ...createCarDto
    };

    this.cars.push(car);
    return car;
  }

  updateById(id: string, updateCarDto: UpdateCarDto): Car {
    let carDB = this.fineOneById(id);

    if( updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException('Car id is not valid inside body');

    this.cars = this.cars.map(car => {
      if(car.id === id) {
        carDB = {...carDB, ...updateCarDto, id};
        return carDB;
      }

      return car;
    });

    return carDB;
  }

  deleteById(id: string) {
    this.fineOneById(id);

    this.cars = this.cars.filter(car => car.id !== id);
  }
}
