import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { CdrEntity } from './entities/cdr.entity';

//subscribes to automatically calculate cdrCost field on CdrEntity
//initialised in databaseProviders.subscribers
@EventSubscriber()
export class CdrSubscriber implements EntitySubscriberInterface<CdrEntity> {
  listenTo() {
    return CdrEntity;
  }

  async afterLoad(cdr: CdrEntity): Promise<void> {
    if (cdr.rate != null) {
      cdr.cdrCost = cdr.volume * cdr.rate.amountPerVolume;
      delete cdr.rate.rateZoneId;
    }
  }
}
