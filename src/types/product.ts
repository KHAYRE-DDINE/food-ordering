import { Prisma } from '@prisma/client';

export type ProductWithRelations = Omit<
  Prisma.ProductGetPayload<{
    include: {
      sizes: true;
      extras: true;
    };
  }>,
  'createdAt' | 'updatedAt'
> & {
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
