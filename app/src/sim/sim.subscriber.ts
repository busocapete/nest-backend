import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { SimEntity } from './entities/sim.entity';

//subscribes to automatically calculate cdrCost field on CdrEntity
//initialised in databaseProviders.subscribers
@EventSubscriber()
export class SimSubscriber implements EntitySubscriberInterface<SimEntity> {
  listenTo() {
    return SimEntity;
  }

  async afterLoad(sim: SimEntity): Promise<void> {
    let totalCost = 0;

    if (sim.cdrs != null && sim.cdrs.length > 0) {
      sim.cdrs.map((cdr) => {
        delete cdr.simId;
        delete cdr.rateZoneId;
        return (totalCost += cdr.cdrCost);
      });

      sim.simCost = totalCost;
    }
  }
}
