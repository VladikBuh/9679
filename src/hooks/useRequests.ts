import { useCallback } from 'react';
import { getDepartment, initialRequests, requestStats } from '../data/requests';
import { GuestRequest, RequestCategory, RequestDeliveryTime, RequestPriority, RequestStatus } from '../types';
import { createStore } from './createStore';

interface RequestsState {
  requests: GuestRequest[];
}

const requestsStore = createStore<RequestsState>({ requests: initialRequests });
let submissionCount = 0;

const STATUS_SEQUENCE: RequestStatus[] = ['Submitted', 'Received', 'Assigned', 'In Progress'];

function formatNow() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function advanceStatus(id: string, sequenceIndex: number) {
  if (sequenceIndex >= STATUS_SEQUENCE.length - 1) return;
  setTimeout(() => {
    requestsStore.setState(prev => ({
      requests: prev.requests.map(r =>
        r.id === id ? { ...r, status: STATUS_SEQUENCE[sequenceIndex + 1], updatedAt: formatNow() } : r,
      ),
    }));
    advanceStatus(id, sequenceIndex + 1);
  }, 4000);
}

export function useRequests() {
  const requests = requestsStore.useStore(s => s.requests);

  const activeCount = requests.filter(r => r.status !== 'Completed' && r.status !== 'Cancelled').length;

  const submitRequest = useCallback(
    (
      category: RequestCategory,
      description: string,
      priority: RequestPriority,
      deliveryTime: RequestDeliveryTime,
      customTime?: string,
      notes?: string,
    ) => {
      submissionCount += 1;
      const id = `REQ-24072${8 + submissionCount}`;
      const now = formatNow();
      const request: GuestRequest = {
        id,
        categoryId: category.id,
        categoryTitle: category.title,
        emoji: category.emoji,
        description,
        priority,
        deliveryTime,
        customTime,
        notes,
        status: 'Submitted',
        department: getDepartment(category.id),
        estimatedArrival: '15 Minutes',
        createdAt: now,
        updatedAt: now,
      };
      requestsStore.setState(prev => ({ requests: [request, ...prev.requests] }));
      advanceStatus(id, 0);
      return request;
    },
    [],
  );

  const getRequestById = useCallback(
    (id: string) => requestsStore.getState().requests.find(r => r.id === id),
    [],
  );

  const cancelRequest = useCallback((id: string) => {
    requestsStore.setState(prev => ({
      requests: prev.requests.map(r => (r.id === id ? { ...r, status: 'Cancelled', updatedAt: formatNow() } : r)),
    }));
  }, []);

  return {
    requests,
    activeCount,
    completedCount: requestStats.completed,
    averageResponse: requestStats.averageResponse,
    submitRequest,
    getRequestById,
    cancelRequest,
  };
}
