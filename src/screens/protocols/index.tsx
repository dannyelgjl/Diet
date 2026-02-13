import React from 'react';
import { Header } from '../../components/Header';
import * as S from './styles';
import { IProtocolsProps } from './types';
import { useContainer } from './useContainer';
import Input from '../../components/Input';

const Protocols = (props: IProtocolsProps) => {
  const {
    deleteCustom,
    eatingHours,
    fastingHours,
    onCreate,
    protocols,
    selectProtocol,
    selected,
    selectedId,
    setEatingHours,
    setFastingHours,
    handleNavigation,
  } = useContainer(props);

  return (
    <S.Container>
      <Header title="Protocolo" showBack />

      <S.Content>
        <S.Title>Protocolos de Jejum</S.Title>

        <S.SelectedCard>
          <S.SelectedContent>
            <S.SelectedLabel>Selecionado</S.SelectedLabel>
            <S.SelectedValue>
              {selected
                ? `${selected.name} (Jejum ${selected.fastingHours}h / Janela ${selected.eatingHours}h)`
                : '-'}
            </S.SelectedValue>
          </S.SelectedContent>

          <S.ButtonProtocol onPress={handleNavigation} disabled={!selected}>
            <S.ButtonTextProtocol>Começar Protocolo</S.ButtonTextProtocol>
          </S.ButtonProtocol>
        </S.SelectedCard>

        <S.List
          data={protocols}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={S.Separator}
          renderItem={({ item }: any) => {
            const active = item.id === selectedId;

            return (
              <S.ProtocolCard
                onPress={() => selectProtocol(item.id)}
                $active={active}
              >
                <S.ProtocolInfo>
                  <S.ProtocolName $active={active}>{item.name}</S.ProtocolName>
                  <S.ProtocolMeta $active={active}>
                    Jejum {item.fastingHours}h • Janela {item.eatingHours}h
                  </S.ProtocolMeta>
                </S.ProtocolInfo>

                {item.isCustom && (
                  <S.DeleteButton
                    onPress={() => deleteCustom(item.id)}
                    $active={active}
                  >
                    <S.DeleteButtonText $active={active}>
                      Excluir
                    </S.DeleteButtonText>
                  </S.DeleteButton>
                )}
              </S.ProtocolCard>
            );
          }}
        />

        <S.CreateCard>
          <S.CreateTitle>Criar protocolo custom</S.CreateTitle>
          <S.CreateSubtitle>Jejum + janela devem somar 24h.</S.CreateSubtitle>

          <S.Row>
            <S.Field>
              <S.Label>Jejum (h)</S.Label>
              <Input
                value={fastingHours}
                onChangeText={setFastingHours}
                keyboardType="numeric"
              />
            </S.Field>

            <S.Field>
              <S.Label>Janela (h)</S.Label>
              <Input
                value={eatingHours}
                onChangeText={setEatingHours}
                keyboardType="numeric"
              />
            </S.Field>
          </S.Row>

          <S.PrimaryButton onPress={onCreate}>
            <S.PrimaryButtonText>Criar e selecionar</S.PrimaryButtonText>
          </S.PrimaryButton>
        </S.CreateCard>
      </S.Content>
    </S.Container>
  );
};

export default Protocols;
