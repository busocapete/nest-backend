import { CdrEntity } from 'src/cdr/entities/cdr.entity';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';
import { OrganisationEntity } from 'src/organisation/entities/organisation.entity';

export class BillDto {
  organisation: OrganisationEntity;
  currency: CurrencyEntity;
}
