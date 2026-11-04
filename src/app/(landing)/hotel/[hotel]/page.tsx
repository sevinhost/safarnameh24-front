import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { apiBaseUrl } from '@/constants';
import { hotel } from '@/constants/landing';

// ایمپورت‌های کامپوننت‌های شما
import { 
  Tags, Rooms, Pictures, Facilities, Description, SectionLinks, 
  EssentialTips, ImportantPlaces, CustomerReviews, SuggestedHotels, 
  AdditionalDetails, InitialInformation, RulesAndRegulations, FrequentlyQuestions 
} from '@/components/landing/modules/hotel';
import HotelWrapper from '@/components/landing/modules/hotel/molecules/HotelWrapper';
import StickyArea from '@/components/landing/shared/StickyArea';
import Configs from '@/components/landing/modules/hotel/Configs';
import { TopBarConfig } from '@/components/landing/shared';
import { Section } from '@/components/landing/modules/hotel/molecules/Section';
import Sharing from '@/components/landing/modules/hotel/molecules/sharing/Sharing';
import { FavoriteButton } from '@/components/landing/modules/hotel/molecules/favorite-button';
import MImageGallery from '@/components/landing/modules/hotel/molecules/pictures-gallery/MImageGallery';
import DImageGallery from '@/components/landing/modules/hotel/molecules/pictures-gallery/LSPicturesGallery';

type Props = { params: Promise<{ hotel: string }> };

// 1. دریافت دیتای سئو برای متادیتا
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hotel: hotelSlug } = await params;
  try {
    const res = await fetch(`${apiBaseUrl}/hotel/seo/${hotelSlug}/`, { cache: 'no-store' });
    if (!res.ok) return { title: 'هتل در زروان تریپ' };
    const seo = await res.json();
    return {
      title: seo.title_tag,
      description: seo.description,
      keywords: seo.keywords, // آرایه‌ای که از جنگو می‌آید
      robots: { index: !seo.no_index, follow: !seo.no_index },
      alternates: { canonical: seo.canonical_url },
      openGraph: {
        title: seo.og_title,
        description: seo.og_description,
        images: seo.og_image ? [seo.og_image] : [],
        type: 'website',
      },
    };
  } catch {
    return { title: 'زروان تریپ' };
  }
}

export default async function Hotel({ params }: Props) {
  const { hotel: hotelSlug } = await params;
  const { sectionLinks } = hotel;

  // 2. دریافت دیتای اصلی هتل برای محتوا و اسکیما
  const res = await fetch(`${apiBaseUrl}/hotel/hotels/${hotelSlug}/introduction/`, { cache: 'no-store' });
  if (res.status === 404) notFound();
  const hotelData = await res.json();

  // 3. تعریف اسکیما برای ستاره‌دار شدن در گوگل
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    'name': hotelData.name,
    'description': hotelData.description || `رزرو هتل ${hotelData.name} در زروان تریپ`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': hotelData.city_name || 'ایران',
    }
  };

  return (
    <>
      {/* تزریق اسکیما */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HotelWrapper>
        <StickyArea scrollFromTop={500} fixedClassName="pb-0" staticClassName="mt-5" childrenStatus={{ fixed: true }} searchbarStatus={{ static: true, fixed: true }}>
          <div className="-mx-5 -mt-3"><SectionLinks sectionList={sectionLinks} /></div>
        </StickyArea>

        <div className="relative mt-5 flex flex-col gap-14 lg:mt-12 lg:gap-20">
          <Pictures hotelSlug={hotelSlug} />

          <div className="relative -my-8 flex h-16 gap-3 rounded-xl bg-white p-2.5 shadow-xl shadow-black/5 lg:hidden">
            <FavoriteButton hotelSlug={hotelSlug} />
            <div className="grid flex-1 grid-cols-2 gap-3 sm:mr-auto sm:w-60 sm:flex-none">
              <Sharing />
              <MImageGallery hotelSlug={hotelSlug} />
              <DImageGallery hotelSlug={hotelSlug} />
            </div>
          </div>

          <div className="-mx-5 -mb-6 flex h-12 items-center overflow-hidden bg-white pt-1 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:hidden">
            <SectionLinks sectionList={sectionLinks} />
          </div>

          <Configs hotelSlug={hotelSlug} sectionList={sectionLinks} />

          <div>
            <TopBarConfig className="mb-1 lg:mb-2" title={{ type: 'single', text: 'توضیحات هتل' }} />
            <div id="description" className="grid items-start gap-12 lg:grid-cols-2">
              <Description hotelSlug={hotelSlug} />
              <InitialInformation hotelSlug={hotelSlug} />
            </div>
          </div>

          <Rooms hotelSlug={hotelSlug} />
          <AdditionalDetails hotelSlug={hotelSlug} />

          <Section sectionID="rules" className="grid items-start gap-8 lg:grid-cols-2">
            <RulesAndRegulations hotelSlug={hotelSlug} />
            <EssentialTips hotelSlug={hotelSlug} />
          </Section>

          <ImportantPlaces hotelSlug={hotelSlug} />
          <Facilities hotelSlug={hotelSlug} />
          <FrequentlyQuestions hotelSlug={hotelSlug} />
          <CustomerReviews hotelSlug={hotelSlug} />
          <Tags hotelSlug={hotelSlug} />
          <SuggestedHotels hotelSlug={hotelSlug} />
        </div>
      </HotelWrapper>
    </>
  );
}