import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { AppError } from "../errors";
import { IAddressRequest } from "../interfaces/properties";

class AddressService {
  private addressRepo: Repository<Address>;

  constructor() {
    this.addressRepo = AppDataSource.getRepository(Address);
  }

  validateData = (payload: IAddressRequest): void => {
    if (payload.state.length !== 2) {
      throw new AppError(400, "State length must be 2.");
    }

    if (payload.zipCode.length !== 8) {
      throw new AppError(400, "ZipCode length must be 2.");
    }
  };

  create = async (payload: IAddressRequest): Promise<Address> => {
    this.validateData(payload);
    const foundAddress = await this.addressRepo.findOneBy(payload);

    if (foundAddress) {
      throw new AppError(400, "Address already exists.");
    }

    const address = this.addressRepo.create(payload);
    await this.addressRepo.save(address);

    return address;
  };
}

export default new AddressService();
