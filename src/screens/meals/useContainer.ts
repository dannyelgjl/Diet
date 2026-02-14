import { Alert } from 'react-native';
import { IMealsProps } from './types';
import { useMealsStore } from '../../store/meals/meals.store';
import { useMemo, useState } from 'react';
import { Meal } from '../../store/meals/types';

function formatTime(iso: string) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function getTodayKeyLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const EMPTY: Meal[] = [];

export const useContainer = (_: IMealsProps) => {
  const mealsByDate = useMealsStore(state => state.mealsByDate);

  const addMeal = useMealsStore(state => state.addMeal);
  const editMeal = useMealsStore(state => state.editMeal);
  const deleteMeal = useMealsStore(state => state.deleteMeal);

  const todayKey = useMemo(() => getTodayKeyLocal(), []);
  const meals = mealsByDate[todayKey] ?? EMPTY;

  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');

  const [editing, setEditing] = useState<Meal | null>(null);
  const [editName, setEditName] = useState('');
  const [editCalories, setEditCalories] = useState('');

  const total = useMemo(
    () => meals.reduce((sum, m) => sum + m.calories, 0),
    [meals],
  );

  const onAdd = () => {
    try {
      addMeal(name, Number(calories));
      setName('');
      setCalories('');
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Não foi possível adicionar');
    }
  };

  const openEdit = (meal: Meal) => {
    setEditing(meal);
    setEditName(meal.name);
    setEditCalories(String(meal.calories));
  };

  const onSaveEdit = () => {
    if (!editing) return;
    try {
      editMeal(
        editing.id,
        { name: editName, calories: Number(editCalories) },
        todayKey,
      );
      setEditing(null);
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Não foi possível editar');
    }
  };

  const onDelete = (mealId: string) => {
    Alert.alert('Excluir refeição', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => deleteMeal(mealId, todayKey),
      },
    ]);
  };

  return {
    total,
    mealsByDate,
    addMeal,
    editMeal,
    deleteMeal,
    todayKey,
    meals,
    name,
    setName,
    calories,
    setCalories,
    editing,
    editName,
    setEditName,
    editCalories,
    setEditCalories,
    onAdd,
    openEdit,
    onSaveEdit,
    onDelete,
    formatTime,
    setEditing,
  };
};
