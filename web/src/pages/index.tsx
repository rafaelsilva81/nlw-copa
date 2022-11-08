import Image from 'next/image';
import appPreviewImg from '../assets/app-preview.png';
import logoImg from '../assets/logo.svg';
import avatarImg from '../assets/avatars.png';
import checkIcon from '../assets/icon-check.svg';
import api from '../lib/axios';
import { FormEvent, useEffect, useState } from 'react';

import { create } from 'domain';
import { useRouter } from 'next/router';
import { Dialog } from '@headlessui/react';

interface HomeProps {
  pollCount: number;
  userCount: number;
  guessCount: number;
}

export default function Home(props: HomeProps) {
  const { pollCount, guessCount, userCount } = props;

  const [pollTitle, setpollTitle] = useState('');

  const createpoll = async (event: FormEvent) => {
    event.preventDefault();

    await api
      .post('/poll', {
        title: pollTitle,
      })
      .then(async ({ data }) => {
        const { code } = data;
        await navigator.clipboard.writeText(code);
        alert('Código copiado para a área de transferência!');
        setpollTitle('');
      })
      .catch((err) => {
        alert('Erro ao criar poll');
        console.log(err);
      });
  };

  const router = useRouter();

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image
          src={logoImg}
          alt='NLWCopa'
        />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-8 flex items-center gap-2'>
          <Image
            src={avatarImg}
            alt='avatares'
            quality={100}
          />
          <strong className='font-bold text-white text-xl'>
            <span className='text-green-500'> +{userCount} </span> pessoas já
            estão usando
          </strong>
        </div>

        <div className='mt-8 flex flex-col gap-2'>
          <input
            onChange={(event) => setpollTitle(event.target.value)}
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-white placeholder-neutral-400'
            type='text'
            value={pollTitle}
            required
            placeholder='Qual o nome do seu bolão?'
          />
        </div>

        <p className='text-gray-300 mt-4 text-sm leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className='mt-6 pt-6 border-t border-gray-600 flex justify-between items-center text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image
              src={checkIcon}
              alt='App-preview-banner'
              quality={100}
            />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'> +{pollCount} </span>
              <span> Botões criados </span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image
              src={checkIcon}
              alt='App-preview-banner'
              quality={100}
            />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'> +{guessCount} </span>
              <span> Palpites enviados </span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt='App-preview-banner'
        quality={100}
      />
    </div>
  );
}

export async function getStaticProps() {
  const [pollCountData, guessCountData, userCountData] = await Promise.all([
    api.get('poll/count'),
    api.get('guess/count'),
    api.get('user/count'),
  ]);

  return {
    props: {
      pollCount: pollCountData.data.count,
      guessCount: guessCountData.data.count,
      userCount: userCountData.data.count,
    },

    revalidate: 60 * 10, // 60 seg * 10 = 10 min
  };
}
