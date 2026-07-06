import { ClimateAutomations, ClimateHistoryEntry, ClimateModeState } from '../types';

export const initialClimateState = {
  temperature: 23,
  targetTemperature: 23,
  outsideTemperature: 29,
  humidity: 48,
  airQuality: 'Excellent',
  status: 'Cooling Active',
  minTemp: 16,
  maxTemp: 30,
};

export const initialModeState: ClimateModeState = {
  cooling: true,
  heating: false,
  fanSpeed: 'Medium',
  sleepMode: false,
};

export const initialAutomations: ClimateAutomations = {
  autoCool: true,
  autoHeat: false,
  autoFan: true,
  nightAdjustment: false,
  vacationMode: false,
};

export const energyUsage = {
  todayUsage: 18,
  efficiency: 'Excellent',
  ecoScore: 'A+',
  graph: [12, 18, 15, 22, 19, 25, 18],
};

export const initialClimateHistory: ClimateHistoryEntry[] = [
  {
    id: 'h1',
    time: '10:30 AM',
    icon: '🌡️',
    title: 'Temperature changed',
    detail: '22° → 23°C',
  },
  {
    id: 'h2',
    time: '11:15 AM',
    icon: '🌀',
    title: 'Fan changed',
    detail: 'Medium',
  },
  {
    id: 'h3',
    time: '12:20 PM',
    icon: '🌙',
    title: 'Sleep Mode Enabled',
    detail: 'Quiet hours activated',
  },
];
