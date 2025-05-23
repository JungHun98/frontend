import { stadiumKeys } from '../common/queryKeys';
import {
  getSectionSeatings,
  getStadiumConcerts,
  getStadiumFeatures,
  getStadiumList,
  getStadiumObstructions,
  getStadiumSeats,
  getStadiumSections,
} from './stadium.api';

export const stadiumQueries = {
  list: {
    queryKey: stadiumKeys.all,
    queryFn: getStadiumList,
  },
  concerts: (stadiumId: number, query?: string) => ({
    queryKey: stadiumKeys.concerts(stadiumId, query),
    queryFn: () => getStadiumConcerts(stadiumId, query),
  }),
  seats: (stadiumId: number) => ({
    queryKey: stadiumKeys.seats(stadiumId),
    queryFn: () => getStadiumSeats(stadiumId),
    staleTime: Infinity,
  }),
  features: {
    queryKey: stadiumKeys.features(),
    queryFn: getStadiumFeatures,
    staleTime: Infinity,
  },
  obstructions: {
    queryKey: stadiumKeys.obstructions(),
    queryFn: getStadiumObstructions,
    staleTime: Infinity,
  },
  sections: (stadiumId: number) => ({
    queryKey: stadiumKeys.sections(stadiumId),
    queryFn: () => getStadiumSections(stadiumId),
    staleTime: Infinity,
  }),
  sectionSeating: (sectionId: number) => ({
    queryKey: stadiumKeys.sectionSeating(sectionId),
    queryFn: () => getSectionSeatings(sectionId),
    staleTime: Infinity,
  }),
};
