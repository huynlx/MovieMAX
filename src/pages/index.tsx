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
import { useState, useEffect, useCallback, useMemo } from "react";
import { GetStaticProps } from 'next'
import { HomeSection } from "@/types";
import useFetchHome from "@/hooks/useFetchHome";

interface HomeProps {
  dataSSG: HomeSection[]
}

const Home: NextPage<HomeProps> = ({ dataSSG }) => {
  const router = useRouter();
  const { dataCSR, setSize, hasNextPage } = useFetchHome();
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    setSidebarActive(false); //mobile
  }, [router]);

  const handleInview = useCallback(() => {
    setSize(prev => prev + 1)
  }, [])

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
            dataSSG.map((section, index) =>
              section.homeSectionType === "BANNER" ? (
                <div
                  key={index}
                  className="overflow-hidden w-full mt-8"
                >
                  <BannerSlider
                    images={
                      useMemo(() => (section.recommendContentVOList
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
                        }[]) || [], [])
                    }
                  />
                </div>
              ) : (
                <div key={index}>
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
            dataCSR?.map((section, index) =>
              <div key={index}>
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
          }

          {
            hasNextPage &&
            <InView onInView={handleInview}>
              <Skeleton className="mt-8 mb-4 h-6 w-full max-w-[200px]" />
              <div className="overflow-hidden">
                <SkeletonSlider />
              </div>
            </InView>
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
    const dataSSG = await getHome();

    return {
      props: {
        dataSSG
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