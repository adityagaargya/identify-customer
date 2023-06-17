import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './entities/contact.entities';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private usersRepository: Repository<ContactEntity>,
  ) {}
}
