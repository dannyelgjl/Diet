import { act } from '@testing-library/react-native';
import { useProtocolStore } from '../../../src/store/protocol/protocol.store';

describe('useProtocolStore', () => {
  beforeEach(() => {
    useProtocolStore.setState({
      protocols: [],
      selectedProtocolId: 'p_16_8',
    });

    jest.clearAllMocks();
  });

  it('seedDefaults(): populates default protocols only when store is empty', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    const state = useProtocolStore.getState();

    expect(state.protocols).toHaveLength(3);
    expect(state.protocols.map(p => p.id)).toEqual([
      'p_12_12',
      'p_16_8',
      'p_18_6',
    ]);
    expect(state.selectedProtocolId).toBe('p_16_8');

    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    expect(useProtocolStore.getState().protocols).toHaveLength(3);
  });

  it('selectProtocol(): updates the selected protocol', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    act(() => {
      useProtocolStore.getState().selectProtocol('p_18_6');
    });

    expect(useProtocolStore.getState().selectedProtocolId).toBe('p_18_6');
  });

  it('selectProtocol(): throws if protocol does not exist', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    expect(() =>
      useProtocolStore.getState().selectProtocol('nao-existe'),
    ).toThrow('Protocolo não encontrado');
  });

  it('createCustomProtocol(): creates a valid custom protocol and auto-selects it', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    act(() => {
      useProtocolStore.getState().createCustomProtocol(14, 10);
    });

    const state = useProtocolStore.getState();

    expect(state.protocols[0].isCustom).toBe(true);
    expect(state.protocols[0].fastingHours).toBe(14);
    expect(state.protocols[0].eatingHours).toBe(10);
    expect(state.selectedProtocolId).toBe(state.protocols[0].id);
  });

  it('createCustomProtocol(): clamps values between 1 and 23', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    act(() => {
      useProtocolStore.getState().createCustomProtocol(0, 24);
    });

    const created = useProtocolStore.getState().protocols[0];

    expect(created.fastingHours).toBe(1);
    expect(created.eatingHours).toBe(23);
  });

  it('createCustomProtocol(): throws when fasting + eating does not equal 24', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    expect(() =>
      useProtocolStore.getState().createCustomProtocol(10, 10),
    ).toThrow('Jejum + janela deve somar 24h');
  });

  it('deleteCustomProtocol(): removes custom protocol and resets selection to 16:8 if it was selected', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    act(() => {
      useProtocolStore.getState().createCustomProtocol(14, 10);
    });

    const customId = useProtocolStore.getState().selectedProtocolId;

    act(() => {
      useProtocolStore.getState().deleteCustomProtocol(customId);
    });

    const state = useProtocolStore.getState();

    expect(state.protocols.find(p => p.id === customId)).toBeUndefined();
    expect(state.selectedProtocolId).toBe('p_16_8');
  });

  it('deleteCustomProtocol(): keeps selection if deleting a different custom protocol', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    act(() => {
      useProtocolStore.getState().createCustomProtocol(14, 10);
    });

    const firstCustom = useProtocolStore.getState().selectedProtocolId;

    act(() => {
      useProtocolStore.getState().createCustomProtocol(15, 9);
    });

    const secondCustom = useProtocolStore.getState().selectedProtocolId;

    act(() => {
      useProtocolStore.getState().deleteCustomProtocol(firstCustom);
    });

    expect(useProtocolStore.getState().selectedProtocolId).toBe(secondCustom);
  });

  it('deleteCustomProtocol(): throws when trying to delete a default protocol', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    expect(() =>
      useProtocolStore.getState().deleteCustomProtocol('p_16_8'),
    ).toThrow('Não pode excluir protocolo padrão');
  });

  it('deleteCustomProtocol(): does nothing when id does not exist', () => {
    act(() => {
      useProtocolStore.getState().seedDefaults();
    });

    act(() => {
      useProtocolStore.getState().deleteCustomProtocol('nao-existe');
    });

    expect(useProtocolStore.getState().protocols).toHaveLength(3);
  });
});
