import { CdrEntity } from 'src/cdr/entities/cdr.entity';

export class BillDto {
  organisationName: string;
  totalCost: number;
  usage: CdrEntity[];
}
