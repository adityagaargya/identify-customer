import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactDto } from './dto/identify.dto';
import { ContactEntity } from './entities/contact.entities';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private usersRepository: Repository<ContactEntity>,
  ) {}

  async identifyUser(body: ContactDto) {
    try {
      const fetchDetails = await this.usersRepository.findOne({
        where: [
          { phoneNumber: body.phoneNumber, linkPrecedence: 'primary' },
          { email: body.email, linkPrecedence: 'primary' },
        ],
      });
      if (fetchDetails) {
        body['linkPrecedence'] = 'secondary';
        body['linkedId'] = fetchDetails['id'];
        body['createdAt'] = new Date();
        body['updatedAt'] = new Date();
        const createSecondaryUser = await this.usersRepository.create(body);
        const saveSecondaryUser = await this.usersRepository.save(
          createSecondaryUser,
        );
        const fetchSecondaryDetails = await this.usersRepository.find({
          where: { linkedId: fetchDetails.id },
        });
        let emails = [fetchDetails['email'] ? fetchDetails['email'] : null];
        let phoneNumbers = [
          fetchDetails['phoneNumber'] ? fetchDetails['phoneNumber'] : null,
        ];
        let secondaryContactIds = [];
        for (let i = 0; i < fetchSecondaryDetails.length; i++) {
          emails.push(
            fetchSecondaryDetails[i]['email']
              ? fetchSecondaryDetails[i]['email']
              : '',
          );
          phoneNumbers.push(
            fetchSecondaryDetails[i]['phoneNumber']
              ? fetchSecondaryDetails[i]['phoneNumber']
              : '',
          );
          secondaryContactIds.push(fetchSecondaryDetails[i]['id']);
        }
        let resObj = {
          contact: {
            primaryContactId: fetchDetails.id,
            emails: emails,
            phoneNumbers: phoneNumbers,
            secondaryContactIds: secondaryContactIds,
          },
        };

        return { status: 200, data: resObj };
      } else {
        body['linkPrecedence'] = 'primary';
        body['createdAt'] = new Date();
        body['updatedAt'] = new Date();
        const createPrimaryUser = await this.usersRepository.create(body);
        const savePrimaryUser = await this.usersRepository.save(
          createPrimaryUser,
        );
        return { status: 200, data: savePrimaryUser };
      }
    } catch (err) {
      return { status: 500, data: err };
    }
  }
}
