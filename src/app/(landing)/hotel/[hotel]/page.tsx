import {
  Tags,
  Rooms,
  Pictures,
  Facilities,
  Description,
  SectionLinks,
  EssentialTips,
  ImportantPlaces,
  CustomerReviews,
  SuggestedHotels,
  AdditionalDetails,
  InitialInformation,
  RulesAndRegulations,
  FrequentlyQuestions,
} from '@/components/landing/modules/hotel';

import { apiBaseUrl } from '@/constants';
import { notFound } from 'next/navigation';
import { hotel } from '@/constants/landing';
import { TopBarConfig } from '@/components/landing/shared';

import Configs from '@/components/landing/modules/hotel/Configs';
import StickyArea from '@/components/landing/shared/StickyArea';

import { Section } from '@/components/landing/modules/hotel/molecules/Section';
import Sharing from '@/components/landing/modules/hotel/molecules/sharing/Sharing';

import HotelWrapper from '@/components/landing/modules/hotel/molecules/HotelWrapper';
import { FavoriteButton } from '@/components/landing/modules/hotel/molecules/favorite-button';
import MImageGallery from '@/components/landing/modules/hotel/molecules/pictures-gallery/MImageGallery';
import DImageGallery from '@/components/landing/modules/hotel/molecules/pictures-gallery/LSPicturesGallery';

type Props = { params: Promise<{ hotel: string }> };

// ----------------------------------

export default async function Hotel(props: Props) {
  const { sectionLinks } = hotel;
  const { hotel: hotelSlug } = await props.params;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(
      `${apiBaseUrl}/hotel/hotels/${hotelSlug}/introduction/`,
      {
        signal: controller.signal,
        // next: { revalidate: 180 }, // Cache for 3 minutes to make page refreshes instant
      }
    );
    clearTimeout(timeoutId);

    if (response.status === 404) {
      notFound();
    }
  } catch (error) {
    console.error('SSR hotel fetch error (handled safely):', error);
  }

  return (
    <>
      <HotelWrapper>
        <StickyArea
          scrollFromTop={500}
          fixedClassName="pb-0"
          staticClassName="mt-5"
          childrenStatus={{ fixed: true }}
          searchbarStatus={{ static: true, fixed: true }}
        >
          <div className="-mx-5 -mt-3">
            <SectionLinks sectionList={sectionLinks} />
          </div>
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
            <TopBarConfig
              className="mb-1 lg:mb-2"
              title={{ type: 'single', text: 'توضیحات هتل' }}
            />

            <div
              id="description"
              className="grid items-start gap-12 lg:grid-cols-2"
            >
              <Description hotelSlug={hotelSlug} />
              <InitialInformation hotelSlug={hotelSlug} />
            </div>
          </div>

          <Rooms hotelSlug={hotelSlug} />
          <AdditionalDetails hotelSlug={hotelSlug} />

          <Section
            sectionID="rules"
            className="grid items-start gap-8 lg:grid-cols-2"
          >
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
