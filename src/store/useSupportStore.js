import { create } from 'zustand';

export const useSupportStore = create((set) => ({
  isChatOpen: false,
  isCallModalOpen: false,
  legalModal: {
    isOpen: false,
    activeTab: 'privacy', // 'privacy' | 'risk' | 'terms'
  },

  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  openCallModal: () => set({ isCallModalOpen: true }),
  closeCallModal: () => set({ isCallModalOpen: false }),

  openLegalModal: (tab = 'privacy') =>
    set({
      legalModal: {
        isOpen: true,
        activeTab: tab,
      },
    }),
  closeLegalModal: () =>
    set((state) => ({
      legalModal: {
        ...state.legalModal,
        isOpen: false,
      },
    })),
  setLegalTab: (tab) =>
    set((state) => ({
      legalModal: {
        ...state.legalModal,
        activeTab: tab,
      },
    })),
}));

export default useSupportStore;
