import { CdrEntity } from 'src/cdr/entities/cdr.entity';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';

export class BillDto {
  organisationName: string;
  currency: CurrencyEntity;
  totalCost: number;
  usage: CdrEntity[];
}
