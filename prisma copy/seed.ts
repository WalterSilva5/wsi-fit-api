import { PrismaService } from '../src/database/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prismaService = new PrismaService();

(async () => {
  const users = [
    {
      firstName: 'template',
      lastName: 'wsi',
      email: 'template.admin@wsi.com',
      password: await bcrypt.hash('M*7%jfUoDQF7&8cX', 10),
      role: Role.ADMIN
    },
    {
      firstName: 'template',
      lastName: 'wsi',
      email: 'template.user@wsi.com',
      password: await bcrypt.hash('J4BGwT$o&W*48xY', 10),
      role: Role.USER
    },
    {
      firstName: 'template',
      lastName: 'wsi',
      email: 'template.manager@wsi.com',
      password: await bcrypt.hash('J4BT$*&woGW48xY', 10),
      role: Role.MANAGER
    }
  ];

  for (const user of users) {
    await prismaService.user.upsert({
      where: {
        email: user.email
      },
      create: user,
      update: user
    });
  }
})();
