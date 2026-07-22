import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { vehicleApi } from './services/api';
import type { Vehicle, SearchFilters as SearchFiltersType, VehicleFormData } from './types';
import { Navbar } from './components/Navbar';
import { SearchFilters } from './components/SearchFilters';
import { VehicleCard } from './components/VehicleCard';
import { AuthModal } from './components/AuthModal';
import { VehicleModal } from './components/VehicleModal';
import { RestockModal } from './components/RestockModal';
import { ToastContainer, type ToastMessage } from './components/Toast';
import { Car, RefreshCw, Layers } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const AppContent: React.FC = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();


  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [restockingVehicle, setRestockingVehicle] = useState<Vehicle | null>(null);

  // Filters state
  const [filters, setFilters] = useState<SearchFiltersType>({});

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Vehicles Query with TanStack Query
  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => vehicleApi.searchVehicles(filters),
  });

  // Mutations
  const purchaseMutation = useMutation({
    mutationFn: (id: string) => vehicleApi.purchaseVehicle(id),
    onSuccess: (updatedVehicle) => {
      addToast(
        'success',
        `Successfully purchased 1 unit of ${updatedVehicle.make} ${updatedVehicle.model}!`
      );
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Purchase failed.');
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: VehicleFormData) => vehicleApi.createVehicle(data),
    onSuccess: (newVehicle) => {
      addToast('success', `${newVehicle.make} ${newVehicle.model} added to inventory!`);
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Failed to add vehicle.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: VehicleFormData }) =>
      vehicleApi.updateVehicle(id, data),
    onSuccess: (updated) => {
      addToast('success', `${updated.make} ${updated.model} updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Failed to update vehicle.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => vehicleApi.deleteVehicle(id),
    onSuccess: () => {
      addToast('info', 'Vehicle record deleted from inventory.');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Failed to delete vehicle.');
    },
  });

  const restockMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      vehicleApi.restockVehicle(id, quantity),
    onSuccess: (updated) => {
      addToast('success', `Restocked +${restockingVehicle ? updated.quantity - restockingVehicle.quantity : ''} units for ${updated.make} ${updated.model}!`);
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Failed to restock vehicle.');
    },
  });

  // Handlers
  const handleOpenAddVehicle = () => {
    setEditingVehicle(null);
    setIsVehicleModalOpen(true);
  };

  const handleOpenEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsVehicleModalOpen(true);
  };

  const handleOpenRestock = (vehicle: Vehicle) => {
    setRestockingVehicle(vehicle);
    setIsRestockModalOpen(true);
  };

  const handleVehicleSubmit = async (data: VehicleFormData) => {
    if (editingVehicle) {
      await updateMutation.mutateAsync({ id: editingVehicle.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleRestockSubmit = async (id: string, quantity: number) => {
    await restockMutation.mutateAsync({ id, quantity });
  };

  const handlePurchase = (vehicle: Vehicle) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      addToast('info', 'Please sign in or register to purchase vehicles.');
      return;
    }
    purchaseMutation.mutate(vehicle.id);
  };

  return (
    <div className="min-h-screen bg-[#13151A] text-[#F3F0E9] flex flex-col font-sans">
      <Navbar
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAddVehicle={handleOpenAddVehicle}
      />

      <main className="max-w-[1152px] mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#454C5C] font-signage text-xs uppercase tracking-widest mb-1 font-semibold">
            <Layers className="w-4 h-4 text-[#E3A143]" />
            <span>Showroom Inventory Management</span>
          </div>
          <h1 className="font-signage text-4xl sm:text-5xl font-bold tracking-tight text-[#F3F0E9] uppercase">
            THE SHOWROOM FLOOR
          </h1>
          <p className="text-sm text-[#F3F0E9]/70 mt-1 max-w-2xl font-sans">
            Real-time dealership vehicle stock, price specifications in INR (₹), and instant purchasing.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <SearchFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters({})}
        />

        {/* Vehicle Grid Content State */}
        {isLoading ? (
          <div className="py-16 text-center text-[#454C5C] font-signage tracking-wider uppercase text-sm flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#E3A143]" />
            <span>Loading Showroom Vehicles...</span>
          </div>
        ) : isError ? (
          <div className="bg-[#2C1E1C] border border-[#C4574A]/40 rounded-md p-6 text-center text-xs text-[#C4574A] my-8">
            <p className="font-semibold text-sm mb-1">Failed to load vehicle inventory</p>
            <p>{(error as any)?.message || 'Please check backend server connection.'}</p>
            <button
              onClick={() => refetch()}
              className="btn-ghost mt-4 px-4 py-1.5 rounded-sm text-xs font-signage uppercase tracking-wider text-[#F3F0E9]"
            >
              Retry Connection
            </button>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="bg-[#1B1E24] border border-[#333846] rounded-md p-12 text-center my-8">
            <Car className="w-12 h-12 text-[#454C5C] mx-auto mb-3" />
            <h3 className="font-signage text-xl font-semibold uppercase text-[#F3F0E9] mb-1">
              No Vehicles Found
            </h3>
            <p className="text-xs text-[#F3F0E9]/60 font-sans mb-4">
              No vehicle matches your active filter criteria. Try adjusting or clearing search parameters.
            </p>
            <button
              onClick={() => setFilters({})}
              className="btn-ghost px-4 py-2 rounded-sm text-xs font-signage uppercase tracking-wider text-[#E3A143] border-[#E3A143]/40"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onPurchase={handlePurchase}
                onEdit={handleOpenEditVehicle}
                onDelete={(id) => deleteMutation.mutate(id)}
                onRestock={handleOpenRestock}
                isPurchasing={
                  purchaseMutation.isPending &&
                  purchaseMutation.variables === vehicle.id
                }
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#333846] bg-[#1B1E24] py-6 text-center text-xs text-[#454C5C] font-signage tracking-wider uppercase mt-12">
        <p>Roadstead Motors — Full-Stack Car Dealership Inventory System © 2026</p>
      </footer>

      {/* Modals & Toasts */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={() => {
          setIsVehicleModalOpen(false);
          setEditingVehicle(null);
        }}
        onSubmit={handleVehicleSubmit}
        initialData={editingVehicle}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <RestockModal
        vehicle={restockingVehicle}
        isOpen={isRestockModalOpen}
        onClose={() => {
          setIsRestockModalOpen(false);
          setRestockingVehicle(null);
        }}
        onRestock={handleRestockSubmit}
        isLoading={restockMutation.isPending}
      />

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
