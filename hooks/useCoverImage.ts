import { create } from "zustand";

type CoverImageProps = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useCoverImage = create<CoverImageProps>((set, get) => ({
  url: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, url: undefined }),
  onOpen: () => set({ isOpen: true, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
