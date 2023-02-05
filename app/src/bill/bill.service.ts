import { Injectable } from '@nestjs/common';
import { CdrEntity } from 'src/cdr/entities/cdr.entity';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';
import { OrganisationEntity } from 'src/organisation/entities/organisation.entity';

@Injectable()
export class BillService {
  calculateTotalCostofCdrs(cdrs: CdrEntity[]): number {
    let totalCost = 0;
    cdrs.map((cdr) => {
      return (totalCost += cdr.cdrCost);
    });
    return totalCost;
  }

  convertToSelectedCurrency(
    organisation: OrganisationEntity,
    selectedCurrency: CurrencyEntity,
  ): OrganisationEntity {
    organisation.totalBillCost = this.calculateTotalBillCost(
      organisation,
      selectedCurrency,
    );
    organisation.sims.map((sim) => {
      sim.simCost = sim.simCost * selectedCurrency.rate;

      sim.cdrs.map((cdr) => {
        cdr.cdrCost = cdr.cdrCost * selectedCurrency.rate;
      });
    });

    return organisation;
  }

  calculateTotalBillCost(
    organisation: OrganisationEntity,
    selectedCurrency: CurrencyEntity,
  ) {
    return organisation.totalBillCost * selectedCurrency.rate;
  }
}
