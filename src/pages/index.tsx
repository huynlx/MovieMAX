import BannerSlider from "@/components/Home/BannerSlider";
import SectionSlider from "@/components/Home/SectionSlider";
import Sidebar from "@/components/Home/Sidebar";
import SkeletonSlider from "@/components/Home/SkeletonSlider";
import InView from "@/components/Shared/InView";
import Skeleton from "@/components/Shared/Skeleton";
import { getHome } from "@/services/home";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { GetStaticProps } from 'next'
import { HomeSection } from "@/types";

interface HomeProps {
  data: HomeSection[]
}

const Home: NextPage<HomeProps> = ({ data }) => {
  const getKey = (index: number) => `home-${index || 0}`;
  const { data: dataClient, error, setSize } = useSWRInfinite(
    getKey,
    (key) => getHome(Number(key.split("-").slice(-1)[0])),
    { revalidateFirstPage: false }
  );


  // console.log(data?.reduce((acc, current) => [...acc, ...current], []));



  const [sidebarActive, setSidebarActive] = useState(false);
  const [page, setPage] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setSidebarActive(false);
  }, [router]);

  const handleInview = useCallback(() => {
    const nextPage = dataClient?.length;

    if (page < nextPage) {
      setPage(nextPage);
    }
  }, [page, dataClient])

  useEffect(() => {
    if (page > 0) {
      setSize(prev => prev + 1)
      console.log('fetch more');
    }

  }, [page])

  return (
    <>
      <div className='flex sm:hidden justify-between px-[4vw] mt-6'>
        <Link href='/'>
          <a className='flex items-center gap-2'><img className="h-8" src="/logo.png" alt="" /></a>
          {/* <span>MovieMAX</span> */}
        </Link>

        <button onClick={() => setSidebarActive(!sidebarActive)}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      <div className="flex">
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />

        <div className="flex-grow px-[4vw] md:px-8 pb-8 pt-0 overflow-hidden flex flex-col items-stretch">
          {
            page === 0 && data.map((section) =>
              section.homeSectionType === "BANNER" ? (
                <div
                  key={section.homeSectionId}
                  className="overflow-hidden w-full mt-8"
                >
                  <BannerSlider
                    images={
                      (section.recommendContentVOList
                        .map((item) => {
                          const searchParams = new URLSearchParams(
                            new URL(item.jumpAddress).search
                          );

                          if (!searchParams.get("id")) return null;

                          return {
                            title: item.title,
                            image: item.imageUrl,
                            link:
                              searchParams.get("type") === "0"
                                ? `/movie/${searchParams.get("id")}`
                                : `/tv/${searchParams.get("id")}`,
                          };
                        })
                        .filter(Boolean) as {
                          title: string;
                          image: string;
                          link: string;
                        }[]) || []
                    }
                  />
                </div>
              ) : (
                <div key={section.homeSectionId}>
                  <h1 className="text-2xl mb-3 mt-8 font-semibold">
                    {section.homeSectionName.replace("on Loklok", "")}
                  </h1>

                  <SectionSlider
                    images={section.recommendContentVOList.map((item) => {
                      const searchParams = new URLSearchParams(
                        new URL(item.jumpAddress).search
                      );

                      return {
                        title: item.title,
                        image: item.imageUrl,
                        link:
                          searchParams.get("type") === "0"
                            ? `/movie/${searchParams.get("id")}`
                            : `/tv/${searchParams.get("id")}`,
                      };
                    })}
                    coverType={section.coverType}
                  />
                </div>
              )
            )
          }
          {
            page > 0 && dataClient?.reduce((acc, current) => [...acc, ...current], []).map((section) =>
              section.homeSectionType === "BANNER" ? (
                <div
                  key={section.homeSectionId}
                  className="overflow-hidden w-full mt-8"
                >
                  <BannerSlider
                    images={
                      (section.recommendContentVOList
                        .map((item) => {
                          const searchParams = new URLSearchParams(
                            new URL(item.jumpAddress).search
                          );

                          if (!searchParams.get("id")) return null;

                          return {
                            title: item.title,
                            image: item.imageUrl,
                            link:
                              searchParams.get("type") === "0"
                                ? `/movie/${searchParams.get("id")}`
                                : `/tv/${searchParams.get("id")}`,
                          };
                        })
                        .filter(Boolean) as {
                          title: string;
                          image: string;
                          link: string;
                        }[]) || []
                    }
                  />
                </div>
              ) : (
                <div key={section.homeSectionId}>
                  <h1 className="text-2xl mb-3 mt-8 font-semibold">
                    {section.homeSectionName.replace("on Loklok", "")}
                  </h1>

                  <SectionSlider
                    images={section.recommendContentVOList.map((item) => {
                      const searchParams = new URLSearchParams(
                        new URL(item.jumpAddress).search
                      );

                      return {
                        title: item.title,
                        image: item.imageUrl,
                        link:
                          searchParams.get("type") === "0"
                            ? `/movie/${searchParams.get("id")}`
                            : `/tv/${searchParams.get("id")}`,
                      };
                    })}
                    coverType={section.coverType}
                  />
                </div>
              )
            )
          }

          {
            dataClient?.slice(-1)?.[0]?.length !== 0 && <InView onInView={handleInview} />
          }
        </div>

        <div className="flex-shrink-0 w-[320px] p-8 sticky top-0 h-screen scrollbar overflow-hidden overflow-y-auto hidden md:block">
          {/* <SearchBox /> */}
          <h1 className="text-xl my-6">Top Searches</h1>
          {/* <TopSearches /> */}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHome();

    return {
      props: {
        data
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
      revalidate: true,
    };
  }
}

export default Home;