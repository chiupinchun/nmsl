import { BadRequestException } from "@nestjs/common";
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";

export default async <T = unknown>(
  repository: Repository<T>,
  where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  otherOptions: FindManyOptions<T> & {
    order?: string;
    page?: number | string;
    show?: number | string;
  } = {}
) => {
  const {
    order: _order,
    page = 1,
    show = 99999,
    ...others
  } = otherOptions;

  const take = +show;
  const skip = (+page - 1) * take;

  const order = (_order ? { [_order.replace(/^-/, '')]: _order[0] === '-' ? 'DESC' : 'ASC' } : undefined) as FindOptionsOrder<T>;

  try {
    const condition = { ...others, where, order, skip, take };
    console.log(condition);
    const [dataList, totalRecord] = await repository.findAndCount(condition);
    return {
      dataList, totalRecord,
      totalPage: Math.ceil(totalRecord / take)
    };
  } catch {
    throw new BadRequestException();
  }
};