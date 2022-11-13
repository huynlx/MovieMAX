import { useRouter } from 'next/router';

const useQueryParmams = () => {
  const router = useRouter();
  const { query } = router;

  return query;
};

export default useQueryParmams;