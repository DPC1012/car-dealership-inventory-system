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
import { HeroBanner } from './components/HeroBanner';
import { ShowcaseSections } from './components/ShowcaseSections';
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
  const queryClientInstance = useQueryClient();
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
      queryClientInstance.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Purchase failed.');
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: VehicleFormData) => vehicleApi.createVehicle(data),
    onSuccess: (newVehicle) => {
      addToast('success', `${newVehicle.make} ${newVehicle.model} added to inventory!`);
      queryClientInstance.invalidateQueries({ queryKey: ['vehicles'] });
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
      queryClientInstance.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Failed to update vehicle.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => vehicleApi.deleteVehicle(id),
    onSuccess: () => {
      addToast('info', 'Vehicle record deleted from inventory.');
      queryClientInstance.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: any) => {
      addToast('error', err.message || 'Failed to delete vehicle.');
    },
  });

  const restockMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      vehicleApi.restockVehicle(id, quantity),
    onSuccess: (updated, variables) => {
      addToast('success', `Restocked +${variables.quantity} units for ${updated.make} ${updated.model}!`);
      queryClientInstance.invalidateQueries({ queryKey: ['vehicles'] });
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
    <div className="min-h-screen bg-white text-[#18181B] flex flex-col font-sans">
      <Navbar
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAddVehicle={handleOpenAddVehicle}
      />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-6 pb-12 flex-1 w-full space-y-12">
        {/* Luxury Landing Hero Banner & Floating Search */}
        <HeroBanner
          onSearch={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
          onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
          activeCategory={filters.category}
        />

        {/* Showroom Inventory Headline & Filters */}
        <div id="showroom-inventory" className="space-y-1">
          <div className="flex items-center gap-2 text-[#6B7280] text-xs uppercase tracking-widest font-semibold">
            <Layers className="w-4 h-4 text-[#111111]" />
            <span>Showroom Inventory Management</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#18181B] uppercase">
            EXPLORE SHOWROOM INVENTORY
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl font-sans">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-3xl p-5 space-y-4 animate-shimmer shadow-sm">
                <div className="w-full aspect-[16/10] rounded-2xl bg-[#FAFAFA]" />
                <div className="h-6 w-3/4 bg-[#FAFAFA] rounded-md" />
                <div className="h-8 w-1/2 bg-[#FAFAFA] rounded-md" />
                <div className="h-12 w-full bg-[#FAFAFA] rounded-full mt-4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-6 text-center text-xs text-[#EF4444] my-8">
            <p className="font-semibold text-sm mb-1">Failed to load vehicle inventory</p>
            <p>{(error as any)?.message || 'Please check backend server connection.'}</p>
            <button
              onClick={() => refetch()}
              className="btn-ghost mt-4 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#18181B]"
            >
              Retry Connection
            </button>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-3xl p-12 text-center my-8 shadow-sm">
            <Car className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold uppercase text-[#18181B] mb-1">
              No Vehicles Found
            </h3>
            <p className="text-xs text-[#6B7280] font-sans mb-4">
              No vehicle matches your active filter criteria. Try adjusting or clearing search parameters.
            </p>
            <button
              onClick={() => setFilters({})}
              className="btn-ghost px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#111111] border-[#111111]"
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
                isPurchasing={purchaseMutation.isPending}
              />
            ))}
          </div>
        )}

        {/* Reference Image Inspired Showcase Sections & Rich Footer */}
        <ShowcaseSections
          onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
          onSearch={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      </main>

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
