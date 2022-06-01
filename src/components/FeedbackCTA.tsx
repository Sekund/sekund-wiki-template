import { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { ChatIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LoadingSpin from 'react-loading-spin';

import i18nConfig from '@/i18n.config';

type Props = {
  noteId: string;
};

type IFormInput = {
  fullName: String;
  email: String;
  message: String;
  noteId: String;
};

export default function FeedbackCTA({ noteId }: Props) {
  const { t } = useTranslation(['common'], { i18n: i18nConfig });
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit = handleSubmit(async (data) => {
    if (busy) {
      return;
    }
    setBusy(true);
    const res = await fetch('/api/addWebComment', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    setBusy(false);
    if (res.status === 200) {
      setOpen(false);
      reset();
    } else {
      reset();
      setOpen(false);
    }
  });

  function openCommentModal() {
    setOpen(true);
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="w-full px-4 py-8 rounded-md sm:w-2/3 sm:max-w-xl dark:bg-gray-900 bg-gray-50 sm:px-6 lg:col-span-3 lg:py-16 lg:px-8 xl:pl-12">
                  <div className="max-w-lg mx-auto lg:max-w-none">
                    <form
                      onSubmit={onSubmit}
                      method="POST"
                      className="grid grid-cols-1 gap-y-6"
                    >
                      <input
                        type="hidden"
                        {...register('noteId')}
                        value={noteId}
                      />
                      <div>
                        <label htmlFor="full-name" className="sr-only">
                          {t('fullName')}
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          {...register('fullName', { required: true })}
                          autoComplete="name"
                          className="block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow-sm"
                          placeholder={t('fullName')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">
                          {t('email')}
                        </label>
                        <input
                          id="email"
                          {...register('email')}
                          type="email"
                          autoComplete="email"
                          className="block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-md shadow-sm"
                          placeholder={t('email')}
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="sr-only">
                          {t('message')}
                        </label>
                        <textarea
                          id="message"
                          {...register('message', { required: true })}
                          rows={4}
                          className="block w-full px-4 py-3 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm"
                          placeholder={t('message')}
                          defaultValue={''}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          type="submit"
                          className="inline-flex justify-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-500 hover:bg-primary-700 ring-primary-900 hover:ring-2 hover:ring-offset-2 "
                        >
                          {busy ? (
                            <LoadingSpin
                              size="1.5rem"
                              width="3px"
                              primaryColor="#ccc"
                              secondaryColor="transparent"
                            />
                          ) : (
                            <span>{t('send')}</span>
                          )}
                        </button>
                        <button
                          onClick={() => setOpen(false)}
                          className="inline-flex justify-center px-6 py-3 text-base font-medium text-white bg-gray-500 border border-transparent rounded-md shadow-sm hover:bg-gray-700 ring-gray-900 hover:ring-2 hover:ring-offset-2 "
                        >
                          {t('cancel')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="sm:rounded-lg sekund-content">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-center mt-2 text-gray-500 text">
            <p className="max-w-xl text-center ">{t('areYouBothered')}</p>
          </div>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => openCommentModal()}
              type="button"
              className="inline-flex items-center px-4 py-2 space-x-1 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
            >
              <ChatIcon className="w-6 h-6" />
              <span>{t('sendComment')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
