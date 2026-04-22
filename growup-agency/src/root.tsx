import { component$ } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { CookieBanner } from "./components/layout/CookieBanner"; 
import './styles/cookie-banner.css';


export default component$(() => {
  const META_PIXEL_ID = "1601489467655242";

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        {!isDev && (
          <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />
        )}
        <RouterHead />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        />
        {/* End Meta Pixel Code */}
      </head>

      <body lang="en">
        {/* Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none"
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        <RouterOutlet />
         <CookieBanner />
      </body>
    </QwikCityProvider>
  );
});