import { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Login: undefined;
  Protocols: undefined;
  FastingTimerCard: undefined;
  Meals: undefined;
  History: undefined;
  DayDetail: { dateKey: string };
  WeeklyChart: undefined;
}
