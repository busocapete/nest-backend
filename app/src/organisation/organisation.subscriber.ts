import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { OrganisationEntity } from './entities/organisation.entity';

@EventSubscriber()
export class OrganisationSubscriber
  implements EntitySubscriberInterface<OrganisationEntity>
{
  listenTo() {
    return OrganisationEntity;
  }

  async afterLoad(org: OrganisationEntity): Promise<void> {
    let totalCost = 0;

    if (org.sims != null && org.sims.length > 0) {
      org.sims.map((sim) => {
        delete sim.organisationid;
        return (totalCost += sim.simCost);
      });

      org.totalBillCost = totalCost;
    }
  }
}
