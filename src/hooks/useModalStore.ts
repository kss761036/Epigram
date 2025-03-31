import { create } from 'zustand';

interface ModalState {
  type: 'ProfileEdit' | null;
  isOpen: boolean;
  props: Record<string, unknown>;
  open: (type: ModalState['type'], props?: Record<string, unknown>) => void;
  close: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  type: null,
  isOpen: false,
  props: {},
  open: (type, props = {}) => {
    set({ type, isOpen: true, props });
  },
  close: () => {
    set({ type: null, isOpen: false, props: {} });
  },
}));

export default useModalStore;
