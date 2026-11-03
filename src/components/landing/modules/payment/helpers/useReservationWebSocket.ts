// hooks/useReservationWebSocket.ts
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

type ReservationStatus = {
  timer?: number;
  capacity_status: 'pending' | 'confirmed' | 'rejected' | 'initial';
};

const sockets = new Map<string, WebSocket>(); // singleton per trackingCode

export function useReservationWebSocket(trackingCode: string | null) {
  const queryClient = useQueryClient();
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;
  const reconnectDelay = () =>
    Math.min(1000 * 2 ** reconnectAttempts.current, 30000);

  useEffect(() => {
    if (!trackingCode) return;

    if (sockets.has(trackingCode)) {
      return;
    }

    const connect = () => {
      const ws = new WebSocket(`wss://cps.safarnameh24.com/ws/${trackingCode}/`);

      ws.onopen = () => {
        // console.log('WebSocket connected for', trackingCode);
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as ReservationStatus;
          queryClient.setQueryData(['reservation-status', trackingCode], data);
          //   console.log('data', data);
        } catch (err) {
          //   console.error('WS parse error:', err);
        }
      };

      ws.onclose = (event) => {
        // console.log('WebSocket closed', event.code, event.reason);
        sockets.delete(trackingCode);

        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          reconnectTimeout.current = setTimeout(() => {
            // console.log(`Reconnecting... attempt ${reconnectAttempts.current}`);
            connect();
          }, reconnectDelay());
        }
      };

      ws.onerror = (err) => {
        // console.error('WebSocket error:', err);
        ws.close();
      };

      sockets.set(trackingCode, ws);
    };

    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      const ws = sockets.get(trackingCode);
      if (ws) {
        ws.close(1000, 'Component unmounted');
        sockets.delete(trackingCode);
      }
    };
  }, [trackingCode, queryClient]);
}
