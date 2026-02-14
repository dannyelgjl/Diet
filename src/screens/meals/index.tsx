import React from 'react';
import * as S from './styles';
import { Header } from '../../components/Header';
import { IMealsProps } from './types';
import { useContainer } from './useContainer';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import { formatDateKeyToBR } from '../../utils/format';
import { ThemeToggle } from '../../components/ThemeToggle';
import Button from '../../components/Button';
import { Meal } from '../../store/meals/types';

export function MealsScreen(props: IMealsProps) {
  const {
    calories,
    editCalories,
    editName,
    editing,
    meals,
    name,
    onAdd,
    onDelete,
    onSaveEdit,
    openEdit,
    setCalories,
    setEditCalories,
    setEditName,
    setName,
    todayKey,
    total,
    formatTime,
    setEditing,
  } = useContainer(props);

  return (
    <S.Container>
      <Header title="Refeições" showBack />
      <S.TitleContainer>
        <S.Wrapper>
          <S.Title>Refeições ({formatDateKeyToBR(todayKey)})</S.Title>

          <ThemeToggle />
        </S.Wrapper>

        <S.Subtitle>Total do dia: {total} kcal</S.Subtitle>
      </S.TitleContainer>

      <S.Card>
        <S.CardTitle>Adicionar</S.CardTitle>

        <Input
          placeholder="Nome (ex: Almoço)"
          value={name}
          onChangeText={setName}
        />

        <Input
          placeholder="Calorias (ex: 650)"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />

        <Button onPress={onAdd} title="Salvar" />
      </S.Card>

      <S.List
        data={meals}
        keyExtractor={(item: Meal) => item.id}
        ItemSeparatorComponent={S.ListSeparator}
        renderItem={({ item }: { item: Meal }) => (
          <S.MealRow>
            <S.MealInfo>
              <S.MealName>{item.name}</S.MealName>
              <S.MealMeta>
                {item.calories} kcal • {formatTime(item.createdAt)}
              </S.MealMeta>
            </S.MealInfo>

            <S.Actions>
              <S.ActionButton onPress={() => openEdit(item)}>
                <S.ActionText>Editar</S.ActionText>
              </S.ActionButton>

              <S.ActionButton onPress={() => onDelete(item.id)}>
                <S.DeleteText>Excluir</S.DeleteText>
              </S.ActionButton>
            </S.Actions>
          </S.MealRow>
        )}
      />

      <Modal
        visible={!!editing}
        onClose={() => setEditing(null)}
        nameValue={editName}
        onChangeName={setEditName}
        caloriesValue={editCalories}
        onChangeCalories={setEditCalories}
        onSave={onSaveEdit}
      />
    </S.Container>
  );
}
