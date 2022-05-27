/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  return (
    <Popover className="sticky top-0 z-10">
      <div className="max-w-6xl mx-auto dark:bg-gray-900 bg-gray-50 sm:px-6">
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-gray-800 md:justify-start md:space-x-10">
          <div className="flex items-center justify-start space-x-2 lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Sekund</span>
                <img
                  className="w-auto h-10 sm:h-10"
                  src="/assets/images/sekund-icon-color.png"
                  alt="Sekund Collaborative Wiki"
                />
              </a>
            </Link>
            <div className="text-gray-500">
              <div>{process.env.TITLE}</div>
              <div className="text-xs">{process.env.SUB_TITLE}</div>
            </div>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md dark:text-gray-500 bg-gray-50 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset dark:bg-gray-900 focus:ring-primary-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-gray-50 dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                    )}
                  ></Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 px-5 py-6 bg-gray-50 dark:bg-gray-900 sm:gap-8 sm:p-8"></div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {/* <a
              className="text-base font-medium text-gray-500 capitalize hover:text-gray-900"
              key={'Contribute'}
              href={'value'}
            >
              {'Table of Contents'}
            </a>

            <a
              className="text-base font-medium text-gray-500 capitalize hover:text-gray-900"
              key={'Contribute'}
              href={'value'}
            >
              {'Discuss'}
            </a>

            <a
              className="text-base font-medium text-gray-500 capitalize hover:text-gray-900"
              key={'Contribute'}
              href={'value'}
            >
              {'Contribute'}
            </a> */}

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-gray-50 dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                    )}
                  ></Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8"></div>
                        <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                          <div className="mt-5 text-sm">
                            <a
                              href="#"
                              className="font-medium text-primary-600 hover:text-primary-500"
                            >
                              {' '}
                              View all posts{' '}
                              <span aria-hidden="true">&rarr;</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          {/* <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            <a
              href="#"
              className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 whitespace-nowrap hover:bg-primary-700"
            >
              Sign up
            </a>
          </div> */}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="divide-y rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900 ring-1 ring-black dark:ring-gray-500 ring-opacity-5 divide-gray-50 dark:divide-gray-500">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <a>
                    <div className="flex items-center space-x-2">
                      <img
                        className="w-auto h-10"
                        src="/assets/images/sekund-icon-color.png"
                        alt="Sekund Collaborative Wiki"
                      />
                      <div className="text-gray-500">
                        <div>SDTs and Social Innovation</div>
                        <div className="text-xs">
                          A Sekund® Collaborative Wiki
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md dark:text-gray-500 bg-gray-50 dark:bg-gray-900 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="px-5 py-6 space-y-6">
              {/* <div className="flex justify-evenly">
                <a
                  href="#"
                  className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-700"
                >
                  Table of Contents
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-700"
                >
                  Discuss
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-700"
                >
                  Contribute
                </a>
              </div> */}
              {/* <div>
                <a
                  href="#"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-base font-medium text-center text-gray-500">
                  Existing customer?{' '}
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </div> */}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
