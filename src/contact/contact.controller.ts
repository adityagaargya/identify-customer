import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/identify.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('identify')
  async identifyUser(@Body() body: ContactDto) {
    try {
      const res = await this.contactService.identifyUser(body);
      return res;
    } catch (err) {
      return { status: 500, data: err };
    }
  }
}
