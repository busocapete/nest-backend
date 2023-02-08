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
    let totalUsageCost = 0;
    let simVolumeAllowance = 0;

    if (org.sims !== null && org.sims !== undefined) {
      //check organisation has a tariff
      if (org.tariff !== null) {
        simVolumeAllowance = org.tariff.inclusiveVolume;

        //check if tariff is pay as you go
        if (org.tariff.isPayg) {
          //Pay as you go should have 0 allowance,
          //Reset to 0 as a precaution in case allowance accidentally
          //added to PAYG tariff
          simVolumeAllowance = 0;
        }

        //Loop through each sim
        org.sims.map((sim) => {
          //Need to know which cdr takes volume over volume allowance
          let allowanceAdjustmentSet = false;
          //Property to track cost of the current sim
          let simTotalCost = 0;
          //Property to track volume used on current sim
          let simVolumeUsed = 0;
          if (sim.cdrs !== null && sim.cdrs !== undefined) {
            //Loop through the sim.cdrs
            sim.cdrs.map((cdr) => {
              //Property to track cost of current cdr
              cdr.cdrCost = 0.0;
              //add additional use to total sim volume use
              simVolumeUsed += +cdr.volume;

              //check if simAllowance has been reached
              if (simVolumeUsed > simVolumeAllowance) {
                const useInExcessOfAllowance =
                  simVolumeUsed - simVolumeAllowance;
                //if allowance reached on current cdr
                //calculate the additional useage above simVolumeAllowance
                if (!allowanceAdjustmentSet) {
                  cdr.cdrCost =
                    useInExcessOfAllowance * cdr.rate.amountPerVolume;
                  //set boolean so that remainder of cdr's will be charged in full
                  //now that we have covered first case of going over inclusive allowance
                  allowanceAdjustmentSet = true;
                } else {
                  //charge for crdVolume as we have exceeded inclusive sim volume
                  cdr.cdrCost = cdr.volume * cdr.rate.amountPerVolume;
                }
              }

              delete cdr.rate.rateZoneId;
              delete cdr.simId;
              //add the current cdr cost to the total sim cost
              return (simTotalCost += +cdr.cdrCost);
            });
            //assign total simCost to the property on the sim entity
            sim.simCost = simTotalCost;

            //remove unnecessary orgId from json response
            delete sim.organisationid;
          }
          //add current sim cost to the total bill cost
          return (totalUsageCost += sim.simCost);
        });

        //assign totalUsage cost to the billdto for the organisation entity

        org.totalUsageCost = totalUsageCost;

        org.totalSubscriptionCost =
          org.sims.length * org.tariff.subscriptionCostPerSim;

        org.totalBillCost = org.totalUsageCost + org.totalSubscriptionCost;

        // if (org.tariff.isPayg) {
        //   delete org.totalSubscriptionCost;
        //   delete org.displayTotalSubscriptionCost;
        // }
      }
    }
  }
}
