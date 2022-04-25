import axios from '@/utils/axios';

export const getHome = async (page: number = 0): Promise<any> => (
  await axios.get("homePage/getHome", {
    params: {
      page,
    },
  })
).data.data?.recommendItems.filter((item) => !item.bannerProportion);