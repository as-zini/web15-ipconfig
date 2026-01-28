import { create } from 'zustand';
import type { UserState } from '../types/yjsawareness';

export interface WidgetInteraction {
  widgetId: string;
  user: UserState;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface WidgetInteractionStore {
  // widgetId -> interaction
  interactions: Record<string, WidgetInteraction>;
  setInteractions: (interactions: WidgetInteraction[]) => void;
  getInteraction: (widgetId: string) => WidgetInteraction | undefined;
}

export const useWidgetInteractionStore = create<WidgetInteractionStore>(
  (set, get) => ({
    interactions: {},
    setInteractions: (interactionList) => {
      const nextInteractions: Record<string, WidgetInteraction> = {};
      interactionList.forEach((interaction) => {
        nextInteractions[interaction.widgetId] = interaction;
      });
      set({ interactions: nextInteractions });
    },
    getInteraction: (widgetId) => get().interactions[widgetId],
  }),
);
