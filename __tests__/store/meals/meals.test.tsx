import { act } from '@testing-library/react-native';
import { useMealsStore } from '../../../src/store/meals/meals.store';

describe('useMealsStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-02-13T10:00:00.000Z'));

    // ✅ reset sem apagar actions
    useMealsStore.setState({ mealsByDate: {} });

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('addMeal(): adiciona refeição no dia atual, normaliza nome e arredonda calorias', () => {
    act(() => {
      useMealsStore.getState().addMeal('  Almoço  ', 650.9);
    });

    const dateKey = '2026-02-13';
    const list = useMealsStore.getState().getMeals(dateKey);

    expect(list).toHaveLength(1);
    expect(list[0].dateKey).toBe(dateKey);
    expect(list[0].name).toBe('Almoço'); // trim
    expect(list[0].calories).toBe(650); // floor
    expect(list[0].createdAt).toBeTruthy();
    expect(list[0].id).toMatch(/^m_/);
  });

  it('addMeal(): permite informar uma data específica (date param)', () => {
    act(() => {
      useMealsStore
        .getState()
        .addMeal('Jantar', 800, new Date('2026-02-10T12:00:00.000Z'));
    });

    const list = useMealsStore.getState().getMeals('2026-02-10');
    expect(list).toHaveLength(1);
    expect(list[0].dateKey).toBe('2026-02-10');
  });

  it('addMeal(): falha se nome vazio', () => {
    expect(() => useMealsStore.getState().addMeal('   ', 100)).toThrow(
      'Nome é obrigatório',
    );
  });

  it('addMeal(): falha se calorias inválidas (<= 0, NaN)', () => {
    expect(() => useMealsStore.getState().addMeal('Almoço', 0)).toThrow(
      'Calorias inválidas',
    );
    expect(() =>
      useMealsStore.getState().addMeal('Almoço', Number('x')),
    ).toThrow('Calorias inválidas');
  });

  it('getTodayKey(): retorna a chave do dia atual (YYYY-MM-DD)', () => {
    const key = useMealsStore.getState().getTodayKey();
    expect(key).toBe('2026-02-13');
  });

  it('editMeal(): edita name e calories do item (por dateKey explícito)', () => {
    act(() => {
      useMealsStore.getState().addMeal('Almoço', 650);
    });

    const dateKey = '2026-02-13';
    const mealId = useMealsStore.getState().getMeals(dateKey)[0].id;

    act(() => {
      useMealsStore
        .getState()
        .editMeal(mealId, { name: '  Jantar  ', calories: 901.7 }, dateKey);
    });

    const edited = useMealsStore.getState().getMeals(dateKey)[0];
    expect(edited.name).toBe('Jantar');
    expect(edited.calories).toBe(901);
  });

  it('editMeal(): se não passar dateKey, usa o dia atual', () => {
    act(() => {
      useMealsStore.getState().addMeal('Café', 100);
    });

    const today = '2026-02-13';
    const mealId = useMealsStore.getState().getMeals(today)[0].id;

    act(() => {
      useMealsStore.getState().editMeal(mealId, { calories: 200 });
    });

    const edited = useMealsStore.getState().getMeals(today)[0];
    expect(edited.calories).toBe(200);
  });

  it('editMeal(): se id não existir, não altera a lista', () => {
    act(() => {
      useMealsStore.getState().addMeal('Almoço', 650);
    });

    const today = '2026-02-13';
    const before = useMealsStore.getState().getMeals(today);

    act(() => {
      useMealsStore.getState().editMeal('nao-existe', { calories: 999 }, today);
    });

    const after = useMealsStore.getState().getMeals(today);
    expect(after).toEqual(before);
  });

  it('deleteMeal(): remove a refeição (por dateKey explícito)', () => {
    act(() => {
      useMealsStore.getState().addMeal('Almoço', 650);
      useMealsStore.getState().addMeal('Jantar', 800);
    });

    const today = '2026-02-13';
    const list = useMealsStore.getState().getMeals(today);
    expect(list).toHaveLength(2);

    const toDelete = list[0].id; // lembra que add insere no começo

    act(() => {
      useMealsStore.getState().deleteMeal(toDelete, today);
    });

    const after = useMealsStore.getState().getMeals(today);
    expect(after).toHaveLength(1);
    expect(after.find(m => m.id === toDelete)).toBeUndefined();
  });

  it('deleteMeal(): se não passar dateKey, usa o dia atual', () => {
    act(() => {
      useMealsStore.getState().addMeal('Almoço', 650);
    });

    const today = '2026-02-13';
    const id = useMealsStore.getState().getMeals(today)[0].id;

    act(() => {
      useMealsStore.getState().deleteMeal(id);
    });

    expect(useMealsStore.getState().getMeals(today)).toHaveLength(0);
  });
});
