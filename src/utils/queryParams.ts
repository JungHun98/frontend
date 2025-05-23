import { NONE_SELECT } from '@/app/home/[stadiumId]/review/_constants/info';
import type { ListSort } from '@/types/review';

export const serializeReviewListParams = (params?: {
  features?: number[];
  obstructions?: number[];
  lastReviewId?: number;
  sort?: ListSort;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.features?.length) {
    searchParams.set('features', params.features.join(','));
  }

  if (params?.obstructions?.length) {
    searchParams.set('obstructions', params.obstructions.join(','));
  }

  if (params?.lastReviewId !== undefined && params.lastReviewId !== NONE_SELECT) {
    searchParams.set('lastReviewId', String(params.lastReviewId));
  }

  if (params?.sort) {
    searchParams.set('sort', params.sort);
  }

  return searchParams.toString();
};
