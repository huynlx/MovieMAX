import { HomeSection } from '@/types';
import axios from '@/utils/axios';

export const getHome = async (page: number = 0): Promise<HomeSection[]> => (
  await axios.get("homePage/getHome", {
    params: {
      page,
    },
  })
).data.data?.recommendItems.filter((item, i) => i === 0 || !item.bannerProportion);