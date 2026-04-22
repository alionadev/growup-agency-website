import { component$ } from '@builder.io/qwik';

import { HomeHero } from '../../components/sections/home/HomeHero';
import { HomeStats } from '../../components/sections/home/HomeStats';
import { HomeServices } from '../../components/sections/home/HomeServices';
import { HomeClients } from '../../components/sections/home/HomeClients';
import { HomeTeam } from '../../components/sections/home/HomeTeam';
import { HomeProcess } from '../../components/sections/home/HomeProcess';
import { HomeFaqCta } from '../../components/sections/home/HomeFaqCta';

import '../../styles/home.css';

export default component$(() => {
  
  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeServices />
      <HomeClients />
      <HomeTeam />
      <HomeProcess />
      <HomeFaqCta />
    </>
  );
});