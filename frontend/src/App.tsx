import React, { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
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

  const manufacturers = useMemo(() => {
    return [...new Set(vehicles.map(v => v.make))];
  }, [vehicles]);

  const scrollToInventory = () => {
    setTimeout(() => {
      document.getElementById('showroom-inventory')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans theme-transition" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary-text)' }}>
      <Navbar
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAddVehicle={handleOpenAddVehicle}
      />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-6 pb-12 flex-1 w-full space-y-12">
        {/* Luxury Landing Hero Banner & Floating Search */}
        <HeroBanner
          onSearch={(newFilters) => {
            setFilters((prev) => ({ ...prev, ...newFilters }));
            scrollToInventory();
          }}
          activeCategory={filters.category}
          manufacturers={manufacturers}
        />

        {/* Showroom Inventory Headline & Filters */}
        <div id="showroom-inventory" className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
            <Layers className="w-4 h-4" style={{ color: 'var(--color-primary-dark)' }} />
            <span>Showroom Inventory Management</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight uppercase theme-transition" style={{ color: 'var(--color-primary-text)' }}>
            EXPLORE SHOWROOM INVENTORY
          </h2>
          <p className="text-xs sm:text-sm max-w-2xl font-sans theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
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
              <div key={i} className="border rounded-3xl p-5 space-y-4 animate-shimmer shadow-sm theme-transition" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                <div className="w-full aspect-[16/10] rounded-2xl theme-transition" style={{ backgroundColor: 'var(--color-surface)' }} />
                <div className="h-6 w-3/4 rounded-md theme-transition" style={{ backgroundColor: 'var(--color-surface)' }} />
                <div className="h-8 w-1/2 rounded-md theme-transition" style={{ backgroundColor: 'var(--color-surface)' }} />
                <div className="h-12 w-full rounded-full mt-4 theme-transition" style={{ backgroundColor: 'var(--color-surface)' }} />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="border rounded-2xl p-6 text-center text-xs my-8 theme-transition" style={{ backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, var(--color-card))', borderColor: 'color-mix(in srgb, var(--color-error) 30%, var(--color-border))', color: 'var(--color-error)' }}>
            <p className="font-semibold text-sm mb-1">Failed to load vehicle inventory</p>
            <p>{(error as any)?.message || 'Please check backend server connection.'}</p>
            <button
              onClick={() => refetch()}
              className="btn-ghost mt-4 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Retry Connection
            </button>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="border rounded-3xl p-12 text-center my-8 shadow-sm theme-transition" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <Car className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-muted-text)' }} />
            <h3 className="font-heading text-xl font-bold uppercase mb-1 theme-transition" style={{ color: 'var(--color-primary-text)' }}>
              No Vehicles Found
            </h3>
            <p className="text-xs font-sans mb-4 theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
              No vehicle matches your active filter criteria. Try adjusting or clearing search parameters.
            </p>
            <button
              onClick={() => setFilters({})}
              className="btn-ghost px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
                onPurchase={handlePurchase}
                onEdit={handleOpenEditVehicle}
                onDelete={(id) => deleteMutation.mutate(id)}
                onRestock={handleOpenRestock}
                isPurchasing={purchaseMutation.isPending && purchaseMutation.variables === vehicle.id}
              />
            ))}
          </div>
        )}

        {/* Reference Image Inspired Showcase Sections & Rich Footer */}
        <ShowcaseSections
          vehicles={vehicles}
          onSelectCategory={(cat) => {
            setFilters((prev) => ({ ...prev, category: cat }));
            scrollToInventory();
          }}
          onSearch={(newFilters) => {
            setFilters((prev) => ({ ...prev, ...newFilters }));
            scrollToInventory();
          }}
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
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
