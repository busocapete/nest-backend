import { Injectable } from '@nestjs/common';
import { CdrEntity } from 'src/cdr/entities/cdr.entity';

@Injectable()
export class BillService {
  calculateTotalCostofCdrs(cdrs: CdrEntity[]): number {
    let totalCost = 0;
    cdrs.map((cdr) => {
      return (totalCost += cdr.cdrCost);
    });
    return totalCost;
  }
}
