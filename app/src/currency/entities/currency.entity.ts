import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currency')
export class CurrencyEntity {
  @PrimaryGeneratedColumn({ name: 'currency_id' })
  currencyId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'rate' })
  rate: number;

  @Column({ name: 'symbol' })
  symbol: string;
}
