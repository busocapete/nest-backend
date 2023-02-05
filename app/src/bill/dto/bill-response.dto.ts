import DefaultResponseDto from 'src/common/dtos/response.dto';
import { BillDto } from './bill.dto';

export default class BillResponseDto extends DefaultResponseDto {
  data: BillDto;
}
