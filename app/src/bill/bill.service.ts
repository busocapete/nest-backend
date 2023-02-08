import { Injectable } from '@nestjs/common';
import { CdrEntity } from '../cdr/entities/cdr.entity';
import { CurrencyEntity } from '../currency/entities/currency.entity';
import { OrganisationEntity } from '../organisation/entities/organisation.entity';

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
    organisation.sims.map((sim) => {
      sim.simCost = sim.simCost * selectedCurrency.rate;
      sim.displaySimCost = selectedCurrency.symbol + sim.simCost.toFixed(2);

      sim.cdrs.map((cdr) => {
        cdr.cdrCost = +cdr.cdrCost * +selectedCurrency.rate;
        cdr.displayCurrency = selectedCurrency.name;
        cdr.displayCdrCost = selectedCurrency.symbol + cdr.cdrCost.toFixed(2);
      });
    });

    organisation.totalUsageCost =
      organisation.totalUsageCost * selectedCurrency.rate;

    if (!organisation.tariff.isPayg) {
      organisation.totalSubscriptionCost =
        organisation.totalSubscriptionCost * selectedCurrency.rate;
    } else {
      organisation.totalSubscriptionCost = 0.0;
    }

    organisation.displayTotalUsageCost =
      selectedCurrency.symbol + organisation.totalUsageCost.toFixed(2);

    organisation.displayTotalSubscriptionCost =
      selectedCurrency.symbol + organisation.totalSubscriptionCost.toFixed(2);

    organisation.totalBillCost =
      organisation.totalBillCost * selectedCurrency.rate;

    organisation.displayTotalBillCost =
      selectedCurrency.symbol + organisation.totalBillCost.toFixed(2);

    return organisation;
  }

  calculateTotalBillCost(
    organisation: OrganisationEntity,
    selectedCurrency: CurrencyEntity,
  ) {
    return organisation.totalUsageCost * selectedCurrency.rate;
  }
}
