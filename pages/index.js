import { supabase } from '../lib/initSupabase'
import { Auth } from '@supabase/ui'
import TodoList from '../components/TodoList'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
//

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IndexPage() {
  const { user } = Auth.useUser()
  const [enabled, setEnabled] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [referal, setReferal] = useState('')

  const _sendMagicLink = async () => {
    console.log('email', email)
    const { user, session, error } = await supabase.auth.signIn({
      email
    })

    console.log('user', user)
    console.log('session', session)
    console.log('error', error)
  }

  const _sendSms = async () => {
    console.log('sms')

    const { user, session, error } = await supabase.auth.signIn({
      phone: `+52${phone}`
    })

    console.log(error)
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {!user ? (
        <div className='w-full h-full flex flex-col justify-center items-center p-4'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            {/* <Auth supabaseClient={supabase} socialLayout='horizontal' socialButtonSize='xlarge' /> */}
            {!enabled ? (
              <div className='w-80'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Correo Electrónico
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                    placeholder='tu@ejemplo.com'
                  />
                </div>
              </div>
            ) : (
              <div className='w-80'>
                <label htmlFor='phone-number' className='block text-sm font-medium text-gray-700'>
                  Número de Teléfono
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 flex items-center'>
                    <label htmlFor='country' className='sr-only'>
                      País
                    </label>
                    <select
                      id='country'
                      name='country'
                      className='focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md'>
                      <option>MX</option>
                    </select>
                  </div>
                  <input
                    type='text'
                    name='phone-number'
                    id='phone-number'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md'
                    placeholder='(552) 987-6543'
                  />
                </div>
              </div>
            )}
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={classNames(
                enabled ? 'bg-indigo-600' : 'bg-indigo-400',
                'relative inline-flex flex-shrink-0 mb-3 mt-3 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              )}>
              <span className='sr-only'>Use setting</span>
              <span
                className={classNames(
                  enabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                )}>
                <span
                  className={classNames(
                    enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                    'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                  )}
                  aria-hidden='true'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3 w-3 text-indigo-600'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                </span>
                <span
                  className={classNames(
                    enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                    'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                  )}
                  aria-hidden='true'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3 w-3 text-indigo-600'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
                    <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
                  </svg>
                </span>
              </span>
            </Switch>
            <div className='w-80'>
              <label htmlFor='referal-code' className='block text-sm font-medium text-gray-700'>
                Código de referido
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='referal-code'
                  id='referal-code'
                  value={referal}
                  onChange={e => setReferal(e.target.value.toUpperCase())}
                  className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md'
                  placeholder='CODE10'
                />
                {/* <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fill-rule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </div> */}
              </div>
              <div>
                <button
                  onClick={enabled ? _sendSms : _sendMagicLink}
                  className='w-full flex justify-center mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <svg className='h-5 w-5 mr-3' viewBox='0 0 20 20' fill='white' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0)'>
                      <path
                        d='M14.7261 3.72114C14.749 3.56508 14.7282 3.4057 14.6657 3.26083C14.6033 3.11596 14.5018 2.99132 14.3726 2.90084C14.2434 2.81036 14.0916 2.75762 13.9341 2.74851C13.7766 2.7394 13.6197 2.77429 13.4809 2.84927L1.77939 9.18548C1.63426 9.26401 1.51512 9.38309 1.4365 9.52817C1.35789 9.67326 1.3232 9.83809 1.33667 10.0026C1.35014 10.167 1.41118 10.324 1.51235 10.4544C1.61352 10.5848 1.75044 10.6829 1.90642 10.7367L6.08522 12.1797C6.2599 12.24 6.44946 12.2417 6.6252 12.1846C6.80094 12.1275 6.9533 12.0147 7.0592 11.8633L9.28813 8.68006C9.41745 8.49536 9.61485 8.3696 9.8369 8.33045C10.0589 8.2913 10.2875 8.34195 10.4721 8.47128C10.6568 8.60061 10.7826 8.798 10.8218 9.02005C10.8609 9.2421 10.8102 9.47061 10.6809 9.6553L8.452 12.8385C8.34593 12.9898 8.29204 13.1716 8.2985 13.3563C8.30496 13.5409 8.37141 13.7185 8.48779 13.862L11.2735 17.2946C11.3773 17.4228 11.5163 17.5179 11.6733 17.5685C11.8304 17.6191 11.9987 17.6229 12.1579 17.5794C12.3171 17.536 12.4602 17.4471 12.5697 17.3237C12.6792 17.2003 12.7505 17.0478 12.7748 16.8846L14.7268 3.72163L14.7261 3.72114Z'
                        fill='white'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0'>
                        <rect width='20' height='20' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                  Enviar {!enabled ? 'Magic Link' : 'SMS'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='w-full h-full flex flex-col justify-center items-center p-4'
          style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}>
          <TodoList user={supabase.auth.user()} />
          <button
            className='btn-black w-full mt-12'
            onClick={async () => {
              const { error } = await supabase.auth.signOut()
              if (error) console.log('Error logging out:', error.message)
            }}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
