'use client';

import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

type ReservationStatus = {
  timer?: number;
  capacity_status: 'pending' | 'confirmed' | 'rejected' | 'initial';
};

type ReservationStatusContextType = {
  ws: WebSocket | null;
};

const ReservationStatusContext = createContext<ReservationStatusContextType>({
  ws: null,
});

export function ReservationStatusProvider({
  trackingCode,
  children,
}: {
  trackingCode: string | null;
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!trackingCode) return;

    const socket = new WebSocket(
      `wss://cps.safarnameh24.com/ws/${trackingCode}/`,
    );
    setWs(socket);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as ReservationStatus;
        queryClient.setQueryData<ReservationStatus>(
          ['reservation-status', trackingCode],
          data,
        );
      } catch (err) {
        console.error('Error parsing WebSocket data:', err);
      }
    };

    return () => {
      socket.close();
    };
  }, [trackingCode, queryClient]);

  return (
    <ReservationStatusContext.Provider value={{ ws }}>
      {children}
    </ReservationStatusContext.Provider>
  );
}

export function useReservationSocket() {
  return useContext(ReservationStatusContext);
}
