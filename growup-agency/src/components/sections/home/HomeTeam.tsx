import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { useHomePage } from '~/routes/[lang]/layout';
import '~/styles/home.css';

type Locale = 'ru' | 'en' | 'ro';
const LOCALES: Locale[] = ['ru', 'en', 'ro'];

export const HomeTeam = component$(() => {
  const {
    teamEyebrow,
    teamTitle,
    teamSubtitle,
    team,
  } = useHomePage().value;

  const loc = useLocation();
  const raw = loc.params.lang as string | undefined;
  const lang: Locale = raw && LOCALES.includes(raw as Locale) ? (raw as Locale) : 'ru';

  const withLang = (path?: string) => {
    if (!path) return undefined;

    const normalized = path.startsWith('/') ? path : `/${path}`;
    const replaced = normalized.replace(/^\/(ru|en|ro)(\/|$)/, `/${lang}$2`);
    if (replaced === normalized) return `/${lang}${normalized}`;
    return replaced;
  };

  return (
    <section class="team" id="team">
      <div class="team__head">
        {teamEyebrow ? <div class="team__eyebrow">{teamEyebrow}</div> : null}

        <h2 class="section-title section-title--center">{teamTitle}</h2>

        {teamSubtitle ? (
          <p class="section-subtitle section-subtitle--center">{teamSubtitle}</p>
        ) : null}
      </div>

      <div class="team-grid">
        {(team ?? []).map((m) => {
          const href = withLang(m.link);
          const Tag: any = href ? 'a' : 'div';

          return (
            <Tag class="team-card" href={href} key={m.name}>
              <div class="team-card__photo-wrap">
                <img
                  class="team-card__photo"
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="team__meta">
                <div class="team-card__name">{m.name}</div>
                <div class="team-card__role">{m.role}</div>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
});