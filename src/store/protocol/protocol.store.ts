import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FastingProtocol, ProtocolState } from './types';

const DEFAULTS: FastingProtocol[] = [
  {
    id: 'p_12_12',
    name: '12:12',
    fastingHours: 12,
    eatingHours: 12,
    isCustom: false,
  },
  {
    id: 'p_16_8',
    name: '16:8',
    fastingHours: 16,
    eatingHours: 8,
    isCustom: false,
  },
  {
    id: 'p_18_6',
    name: '18:6',
    fastingHours: 18,
    eatingHours: 6,
    isCustom: false,
  },
];

function uid(prefix = 'p_custom_') {
  return `${prefix}${Math.random().toString(16).slice(2)}_${Date.now().toString(
    16,
  )}`;
}

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.floor(n)));
}

export const useProtocolStore = create<ProtocolState>()(
  persist(
    (set, get) => ({
      protocols: [],
      selectedProtocolId: 'p_16_8',

      seedDefaults() {
        if (get().protocols.length > 0) return;
        set({ protocols: DEFAULTS, selectedProtocolId: 'p_16_8' });
      },

      selectProtocol(id) {
        const exists = get().protocols.some(p => p.id === id);
        if (!exists) throw new Error('Protocolo não encontrado');
        set({ selectedProtocolId: id });
      },

      createCustomProtocol(fastingHours, eatingHours) {
        const f = clampInt(fastingHours, 1, 23);
        const e = clampInt(eatingHours, 1, 23);
        if (f + e !== 24) throw new Error('Jejum + janela deve somar 24h');

        const protocol: FastingProtocol = {
          id: uid(),
          name: `Custom ${f}:${e}`,
          fastingHours: f,
          eatingHours: e,
          isCustom: true,
        };

        set(state => ({
          protocols: [protocol, ...state.protocols],
          selectedProtocolId: protocol.id,
        }));
      },

      deleteCustomProtocol(id) {
        const state = get();
        const target = state.protocols.find(p => p.id === id);
        if (!target) return;
        if (!target.isCustom)
          throw new Error('Não pode excluir protocolo padrão');

        const nextProtocols = state.protocols.filter(p => p.id !== id);

        const nextSelected =
          state.selectedProtocolId === id ? 'p_16_8' : state.selectedProtocolId;

        set({ protocols: nextProtocols, selectedProtocolId: nextSelected });
      },
    }),
    {
      name: 'mamba-protocols',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => state => {
        state?.seedDefaults();
      },
    },
  ),
);
