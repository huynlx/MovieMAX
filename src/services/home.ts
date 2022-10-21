import { HomeSection } from '@/types';
import axios2 from 'axios';
import axios from '@/utils/axios';

export const getHome = async (page: number = 0): Promise<HomeSection[]> => {
  console.log('vao day', page);

  // const x = await axios2.get('/api/hello');
  // console.log(x);


  // return (
  //   await axios2.get("/api/home", {
  //     params: {
  //       page,
  //     },
  //   })
  return (
    await axios.get("homePage/getHome", {
      params: {
        page,
      },
    })
  ).data.data?.recommendItems.filter((item, i) => i === 0 || !item.bannerProportion);
};