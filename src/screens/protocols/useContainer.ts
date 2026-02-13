import { useMemo, useState } from 'react';
import { IProtocolsProps } from './types';
import { useProtocolStore } from '../../store/protocol/protocol.store';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/types';

export const useContainer = (_: IProtocolsProps) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const protocols = useProtocolStore(state => state.protocols);
  const selectedId = useProtocolStore(state => state.selectedProtocolId);
  const selectProtocol = useProtocolStore(state => state.selectProtocol);
  const createCustom = useProtocolStore(state => state.createCustomProtocol);
  const deleteCustom = useProtocolStore(state => state.deleteCustomProtocol);

  const [fastingHours, setFastingHours] = useState('14');
  const [eatingHours, setEatingHours] = useState('10');

  const selected = useMemo(
    () => protocols.find(p => p.id === selectedId) ?? null,
    [protocols, selectedId],
  );

  const handleNavigation = () => {
    navigate('Home');
  };

  const onCreate = () => {
    try {
      createCustom(Number(fastingHours), Number(eatingHours));
      Alert.alert('Ok', 'Protocolo custom criado e selecionado');
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Não foi possível criar');
    }
  };

  return {
    protocols,
    selectedId,
    selectProtocol,
    deleteCustom,
    selected,
    fastingHours,
    setFastingHours,
    eatingHours,
    setEatingHours,
    onCreate,
    handleNavigation,
  };
};
