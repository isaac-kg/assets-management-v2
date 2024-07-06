import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { logOut } from '../../store/auth/actions/auth.actions';
import { useAppDispatch } from '../../store/hooks';
import { Image } from 'antd';
import dashboardIcon from '../../images/icon/icon-dashboard.svg';
import maintenanceIcon from '../../images/icon/icon-maintenance.svg';
import productIcon from '../../images/icon/icon-product.svg';
import usersIcon from '../../images/icon/icon-users.svg';
import signOutIcon from '../../images/icon/icon-signout.svg';
import profile from '../../images/icon/icon-profile.svg';


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  const dispatch = useAppDispatch();
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-6.5">
        <p className="text-xl text-white">PWY Consulting</p>
      </div>

      <div className="h-full no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="h-full flex flex-col justify-between mt-4 px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 pb-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('dashboard') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src={dashboardIcon}
                  />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('user') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src={usersIcon}
                  />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('product') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src={productIcon}
                  />
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/maintenance"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('maintenance') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src={maintenanceIcon}
                  />
                  Maintenances
                </NavLink>
              </li>
              <li>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
              <NavLink
                to="/profile"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  (pathname === '/profile' || pathname.includes('profile')) &&
                  'bg-graydark dark:bg-meta-4'
                }`}
              >
                <Image
                  height={30}
                  width={30}
                  preview={false}
                  src={profile}
                />
                Profile
              </NavLink>
              </li>
              <li>
              <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  (pathname === '/auth' || pathname.includes('auth')) &&
                  'bg-graydark dark:bg-meta-4'
                }`}
                onClick={(e) => {
                  dispatch(logOut());
                  e.preventDefault();
                }}
              >
                <Image
                  height={30}
                  width={30}
                  preview={false}
                  src={signOutIcon}
                />
                Sign Out
              </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
