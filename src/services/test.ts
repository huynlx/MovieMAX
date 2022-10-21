import { HomeSection } from '@/types';
import axios from 'axios';

export const test = async (page: number = 0): Promise<HomeSection[]> => {
  console.log('deo hieu', page);


  return (
    await axios.get('/api/home?page=' + page)
  ).data;
};