import { MENU } from '@/constants';
import { useStore } from '@/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface SidebarProps {
  sidebarActive: boolean;
  setSidebarActive: (state: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
  const router = useRouter();

  const currentUser = useStore((state) => state.currentUser);

  return (
    <>
      <div className={`flex-shrink-0 sm:sticky left-auto right-full sm:!right-0 sm:!left-0 fixed top-0 flex flex-col items-stretch py-10 pl-5 xl:pl-10 pr-0 w-[90vw] max-w-[288px] sm:max-w-none sm:w-16 xl:w-72 border-r border-gray-800 h-screen overflow-y-auto z-10 bg-dark sm:bg-transparent sm:!translate-x-0 transition-all duration-500 ${sidebarActive ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <Link href="/" >
          <a className="flex gap-2 items-center">
            <img className="h-12 sm:hidden xl:block" src="/static/images/logo.png" alt="Logo" />
            <img className="w-6 h-7 hidden xl:hidden sm:block" src="/static/icons/favicon.ico" alt="Logo" />
          </a>
          {/* <p className="font-semibold text-xl block sm:hidden xl:block">Movie Max</p> */}
        </Link>

        <div className='mt-0 sm:mt-4 xl:mt-0 block sm:flex flex-col gap-0 sm:gap-4 xl:block xl:gap-0'>
          <p className='uppercase mt-10 mb-4 block sm:hidden xl:block text-gray-400'>Menu</p>

          <div className='flex flex-col items-stretch gap-3'>
            {
              MENU.map(item => (
                <React.Fragment key={item.slug}>
                  <Link href={item.slug}>
                    <a className={`flex items-center gap-2 transition ${router.pathname === item.slug
                      ? "text-primary border-r-4 border-primary hover:brightness-125" :
                      'text-gray-400 hover:text-gray-300'
                      }`}>
                      <i className={`${item.icon} text-xl w-[24px]`}></i>
                      <p className="block sm:hidden xl:block">{item.name}</p>
                    </a>
                  </Link>
                </React.Fragment>
              ))
            }
          </div>

          <p className="uppercase mt-10 mb-4 block sm:hidden xl:block text-gray-400">Personal</p>

          {!currentUser ? (
            <Link
              href={`/sign-in?redirect=${encodeURIComponent(router.pathname)}`}
            >
              <a className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300">
                <i className="fas fa-sign-in-alt text-xl w-[24px]"></i>
                <p className="block sm:hidden xl:block">Sign In</p>
              </a>
            </Link>
          ) : (
            <div className="flex flex-col items-stretch gap-3">
              <div className="flex gap-2 items-center">
                {/* <img
                  className="w-[24px] h-[24px] rounded-full"
                  src={resizeImage(currentUser.photoURL, "24", "24")}
                  alt=""
                /> */}

                <p className="text-gray-400 block sm:hidden xl:block">
                  {currentUser.displayName}
                </p>
              </div>
              {/* <button
                onClick={handleSignOut}
                className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
              >
                <i className="fas fa-sign-out-alt text-xl w-[24px]"></i>
                <p className="block sm:hidden xl:block">Sign Out</p>
              </button> */}
            </div>
          )}
        </div>
      </div>

      <div
        onClick={() => setSidebarActive(false)}
        className={`bg-[#00000080] z-[5] fixed top-0 left-0 w-full h-full transition-all duration-500 sm:!opacity-0 ${sidebarActive ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      ></div>
    </>
  );
};

export default Sidebar;