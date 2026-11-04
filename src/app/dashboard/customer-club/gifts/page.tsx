'use client';

import { ReactNode, useState } from 'react';
import Filter from '@/components/dashboard/customClub/filter';
import CustomersClubTable from '@/components/dashboard/customClub/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import ErrorTable from '@/components/dashboard/api/errorTable';
import {
  GETCustomerClubRoomList,
  GETCustomerClubShoppingCentreList,
} from '@/types/dashboard/api/get';
import RoomTable from '@/components/dashboard/customClub/roomTable';

export default function CustomerClubPage(): ReactNode {
  // Defining hooks
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [roomsPaginationNumber, setRoomsPaginationNumber] = useState<number>(0);
  const [giftsType, setGiftsType] = useState<'shoppingCentre' | 'hotel'>('shoppingCentre');

  // Fetching the data (Added pagination state to queryKey so it refetches automatically)
  const shoppingCentresFetch = useApiQuery<GETCustomerClubShoppingCentreList>({
    url: `/crm/shopping-discount-codes?p=${paginationNumber + 1}`,
    queryKey: ['shopping-centre-gifts', String(paginationNumber)],
    options: {
      enabled: giftsType === 'shoppingCentre',
    },
  });

  const roomsFetch = useApiQuery<GETCustomerClubRoomList>({
    url: `/crm/room-discount-codes?p=${roomsPaginationNumber + 1}`,
    queryKey: ['room-gifts', String(roomsPaginationNumber)],
    options: {
      enabled: giftsType === 'hotel',
    },
  });

  // Helper Function for rendering Shopping Centres
  const renderShoppingCentres = () => {
    if (shoppingCentresFetch.isLoading || shoppingCentresFetch.isRefetching) {
      return (
        <CustomersClubTable
          paginationActiveIndex={0}
          setPaginationActiveIndex={() => {}}
          loading
        />
      );
    }
    
    if (shoppingCentresFetch.isError || shoppingCentresFetch.error) {
      return <ErrorTable refetch={shoppingCentresFetch.refetch} />;
    }
    
    if (shoppingCentresFetch.data) {
      return (
        <CustomersClubTable
          refetch={shoppingCentresFetch.refetch}
          paginationActiveIndex={paginationNumber}
          setPaginationActiveIndex={setPaginationNumber}
          data={shoppingCentresFetch.data.results}
        />
      );
    }

    return null;
  };

  // Helper Function for rendering Rooms (Fixed the copy-paste refetch bug)
  const renderRooms = () => {
    if (roomsFetch.isLoading || roomsFetch.isRefetching) {
      return (
        <RoomTable
          paginationActiveIndex={0}
          setPaginationActiveIndex={() => {}}
          loading
        />
      );
    }
    
    if (roomsFetch.isError || roomsFetch.error) {
      return <ErrorTable refetch={roomsFetch.refetch} />; // برطرف شدن باگ رفرش اشتباه
    }
    
    if (roomsFetch.data) {
      return (
        <RoomTable
          refetch={roomsFetch.refetch}
          paginationActiveIndex={roomsPaginationNumber}
          setPaginationActiveIndex={setRoomsPaginationNumber}
          data={roomsFetch.data.results}
        />
      );
    }

    return null;
  };

  // Returning clean JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      <Filter
        loading={giftsType === 'shoppingCentre' ? shoppingCentresFetch.isLoading : roomsFetch.isLoading}
        onChange={setGiftsType}
      />
      
      {giftsType === 'shoppingCentre' ? renderShoppingCentres() : renderRooms()}
    </main>
  );
}