import React from 'react';
import { useContainer } from './useContainer';
import { IHomeProps } from './types';

import { FastingTimerCard } from '../../components/Fasting';
import { DailySummaryCard } from '../../components/DailySummaryCard';
import { Header } from '../../components/Header';

import * as S from './styles';

const Home = (props: IHomeProps) => {
  const { navigation, handleLogout } = useContainer(props);

  return (
    <S.Container showsVerticalScrollIndicator={false}>
      <Header title="Diet" rightLabel="Sair" onRightPress={handleLogout} />

      <S.Content>
        <S.HeaderBlock>
          <S.DashboardTitle>Dashboard</S.DashboardTitle>
          <S.DashboardSubtitle>
            Acompanhe seu jejum e calorias do dia.
          </S.DashboardSubtitle>
        </S.HeaderBlock>

        <FastingTimerCard />
        <DailySummaryCard />

        <S.ActionsBlock>
          <S.ActionsTitle>Ações</S.ActionsTitle>

          <S.Row>
            <S.QuickButton onPress={() => navigation.navigate('Protocols')}>
              <S.QuickButtonTitle>Protocolos</S.QuickButtonTitle>
              <S.QuickButtonSubtitle>
                Escolher ou criar custom
              </S.QuickButtonSubtitle>
            </S.QuickButton>

            <S.QuickButton onPress={() => navigation.navigate('Meals')}>
              <S.QuickButtonTitle>Refeições</S.QuickButtonTitle>
              <S.QuickButtonSubtitle>Adicionar / editar</S.QuickButtonSubtitle>
            </S.QuickButton>
          </S.Row>

          <S.Row>
            <S.QuickButton onPress={() => navigation.navigate('History')}>
              <S.QuickButtonTitle>Histórico</S.QuickButtonTitle>
              <S.QuickButtonSubtitle>Dias anteriores</S.QuickButtonSubtitle>
            </S.QuickButton>

            <S.QuickButton onPress={() => navigation.navigate('WeeklyChart')}>
              <S.QuickButtonTitle>Gráfico semanal</S.QuickButtonTitle>
              <S.QuickButtonSubtitle>Calorias ou jejum</S.QuickButtonSubtitle>
            </S.QuickButton>
          </S.Row>
        </S.ActionsBlock>
      </S.Content>
    </S.Container>
  );
};

export default Home;
