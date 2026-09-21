import { Platform } from 'react-native';
import { Colors } from './colors';

const fontFamily = Platform.select({
  ios: 'System',
  default: 'sans-serif',
});

export const Typography = {
  largeTitle: {
    fontFamily,
    fontSize: 34,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontFamily,
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  cardTitle: {
    fontFamily,
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400' as const,
    color: Colors.textPrimary,
  },
  caption: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400' as const,
    color: Colors.textSecondary,
  },
  smallLabel: {
    fontFamily,
    fontSize: 12,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
  },
};
