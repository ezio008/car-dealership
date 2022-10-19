import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create({ name }: CreateBrandDto): Brand {
    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: Date.now(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: string): Brand {
    const brand = this.brands.find((b) => b.id === id);

    if (!brand) throw new NotFoundException(`Bran with id "${id}" not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto): Brand {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDB = { ...brandDB, ...updateBrandDto, updateAt: Date.now() };
        return brandDB;
      }
      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }

  fillWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
