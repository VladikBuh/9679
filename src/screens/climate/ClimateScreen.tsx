import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chip } from '../../components/common/Chip';
import { GlassCard } from '../../components/common/GlassCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import {
  energyUsage,
  initialAutomations,
  initialClimateHistory,
  initialClimateState,
  initialModeState,
} from '../../data/climate';
import { Colors, Layout, Spacing, Typography } from '../../theme';
import {
  ClimateAutomations,
  ClimateHistoryEntry,
  ClimateModeState,
} from '../../types';
import { EnergyUsageCard } from './EnergyUsageCard';
import { ModeCard } from './ModeCard';
import { SpinningFan } from './SpinningFan';
import { TemperatureDial } from './TemperatureDial';
import { TwinklingStars } from './TwinklingStars';

const FAN_SPEEDS: ClimateModeState['fanSpeed'][] = [
  'Low',
  'Medium',
  'High',
  'Turbo',
];

const AUTOMATION_LABELS: Array<{
  key: keyof ClimateAutomations;
  label: string;
}> = [
  { key: 'autoCool', label: 'Automatically Cool Room' },
  { key: 'autoHeat', label: 'Automatically Heat Room' },
  { key: 'autoFan', label: 'Auto Fan Speed' },
  { key: 'nightAdjustment', label: 'Night Temperature Adjustment' },
  { key: 'vacationMode', label: 'Vacation Mode' },
];

function nowLabel() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ClimateScreen() {
  const insets = useSafeAreaInsets();
  const [temperature, setTemperature] = useState(
    initialClimateState.temperature,
  );
  const [modes, setModes] = useState<ClimateModeState>(initialModeState);
  const [automations, setAutomations] =
    useState<ClimateAutomations>(initialAutomations);
  const [history, setHistory] = useState<ClimateHistoryEntry[]>(
    initialClimateHistory,
  );

  const pushHistory = (icon: string, title: string, detail: string) => {
    setHistory(prev => [
      { id: `${Date.now()}`, time: nowLabel(), icon, title, detail },
      ...prev,
    ]);
  };

  const status = modes.cooling
    ? 'Cooling Active'
    : modes.heating
    ? 'Heating Active'
    : 'Idle';

  const handleCooling = (value: boolean) => {
    setModes(prev => ({
      ...prev,
      cooling: value,
      heating: value ? false : prev.heating,
    }));
  };

  const handleHeating = (value: boolean) => {
    setModes(prev => ({
      ...prev,
      heating: value,
      cooling: value ? false : prev.cooling,
    }));
  };

  const handleFanSpeed = (speed: ClimateModeState['fanSpeed']) => {
    setModes(prev => ({ ...prev, fanSpeed: speed }));
    pushHistory('🌀', 'Fan changed', speed);
  };

  const handleSleep = (value: boolean) => {
    setModes(prev => ({ ...prev, sleepMode: value }));
    pushHistory(
      '🌙',
      value ? 'Sleep Mode Enabled' : 'Sleep Mode Disabled',
      value ? 'Quiet hours activated' : 'Quiet hours ended',
    );
  };

  const toggleAutomation = (key: keyof ClimateAutomations) => {
    setAutomations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView
      style={styles.ClimateScreenRoot}
      contentContainerStyle={[
        styles.ClimateScreenContent,
        {
          paddingTop: insets.top + Spacing.lg,
          paddingBottom: 88 + Spacing.xxl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInUp.duration(400)}>
        <Text style={styles.ClimateScreenTitle}>Climate</Text>
        <Text style={styles.ClimateScreenSubtitle}>
          Control your suite's comfort with precision.
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(80)}
        style={styles.ClimateScreenSection}
      >
        <GlassCard>
          <TemperatureDial
            temperature={temperature}
            minTemp={initialClimateState.minTemp}
            maxTemp={initialClimateState.maxTemp}
            onChange={setTemperature}
          />
          <View style={styles.ClimateScreenStatusGrid}>
            <View style={styles.ClimateScreenStatusItem}>
              <Text style={styles.ClimateScreenStatusLabel}>
                Current Status
              </Text>
              <Text style={styles.ClimateScreenStatusValue}>{status}</Text>
            </View>
            <View style={styles.ClimateScreenStatusItem}>
              <Text style={styles.ClimateScreenStatusLabel}>Humidity</Text>
              <Text style={styles.ClimateScreenStatusValue}>
                {initialClimateState.humidity}%
              </Text>
            </View>
            <View style={styles.ClimateScreenStatusItem}>
              <Text style={styles.ClimateScreenStatusLabel}>Air Quality</Text>
              <Text style={styles.ClimateScreenStatusValue}>
                {initialClimateState.airQuality}
              </Text>
            </View>
            <View style={styles.ClimateScreenStatusItem}>
              <Text style={styles.ClimateScreenStatusLabel}>Outside Temp</Text>
              <Text style={styles.ClimateScreenStatusValue}>
                {initialClimateState.outsideTemperature}°C
              </Text>
            </View>
          </View>
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(140)}
        style={styles.ClimateScreenSection}
      >
        <SectionHeader title="Quick Climate Modes" />
        <View style={styles.ClimateScreenModesGrid}>
          <ModeCard
            icon="🌡️"
            title="Temperature Control"
            description="Adjust room temperature."
          />
          <ModeCard
            icon="❄️"
            title="Cooling Mode"
            description="Maintain refreshing cool air."
            toggled={modes.cooling}
            onToggle={handleCooling}
          />
          <ModeCard
            icon="🔥"
            title="Heating Mode"
            description="Warm the suite comfortably."
            toggled={modes.heating}
            onToggle={handleHeating}
          />
          <ModeCard
            icon="🌀"
            title="Fan Speed"
            description="Select airflow intensity."
            footer={
              <View style={styles.ClimateScreenFanChipRow}>
                {FAN_SPEEDS.map(speed => (
                  <Chip
                    key={speed}
                    label={speed}
                    selected={modes.fanSpeed === speed}
                    onPress={() => handleFanSpeed(speed)}
                    style={styles.ClimateScreenFanChip}
                  />
                ))}
              </View>
            }
          />
          <ModeCard
            icon="🌙"
            title="Sleep Mode"
            description="Reduce noise and optimize sleeping comfort."
            toggled={modes.sleepMode}
            onToggle={handleSleep}
            footer={modes.sleepMode ? <TwinklingStars /> : null}
          />
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(200)}
        style={styles.ClimateScreenSection}
      >
        <GlassCard>
          <SectionHeader title="Room Airflow" />
          <View style={styles.ClimateScreenVisualizationRow}>
            <View style={styles.ClimateScreenVisualizationItem}>
              <SpinningFan
                speed={modes.cooling || modes.heating ? modes.fanSpeed : 'Low'}
                size={30}
              />
              <Text style={styles.ClimateScreenVisualizationLabel}>
                Airflow
              </Text>
            </View>
            <View style={styles.ClimateScreenVisualizationItem}>
              <Text style={styles.ClimateScreenVisualizationIcon}>🌡️</Text>
              <Text style={styles.ClimateScreenVisualizationLabel}>
                {temperature}°C
              </Text>
            </View>
            <View style={styles.ClimateScreenVisualizationItem}>
              <Text style={styles.ClimateScreenVisualizationIcon}>💧</Text>
              <Text style={styles.ClimateScreenVisualizationLabel}>
                {initialClimateState.humidity}%
              </Text>
            </View>
          </View>
          <Text style={styles.ClimateScreenVisualizationCaption}>
            {modes.cooling
              ? 'Cool airflow circulating through the suite.'
              : modes.heating
              ? 'Warm airflow gently heating the suite.'
              : 'Airflow idle.'}
          </Text>
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(260)}
        style={styles.ClimateScreenSection}
      >
        <EnergyUsageCard
          todayUsage={energyUsage.todayUsage}
          efficiency={energyUsage.efficiency}
          ecoScore={energyUsage.ecoScore}
          graph={energyUsage.graph}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(320)}
        style={styles.ClimateScreenSection}
      >
        <GlassCard>
          <SectionHeader title="Smart Automation" />
          {AUTOMATION_LABELS.map((item, index) => (
            <View key={item.key}>
              <View style={styles.ClimateScreenAutomationRow}>
                <Text style={styles.ClimateScreenAutomationLabel}>
                  {item.label}
                </Text>
                <Switch
                  value={automations[item.key]}
                  onValueChange={() => toggleAutomation(item.key)}
                  trackColor={{
                    false: Colors.backgroundSecondary,
                    true: Colors.gold,
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>
              {index < AUTOMATION_LABELS.length - 1 ? (
                <View style={styles.ClimateScreenDivider} />
              ) : null}
            </View>
          ))}
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(380)}
        style={styles.ClimateScreenSection}
      >
        <GlassCard>
          <SectionHeader title="Climate History" />
          {history.map((entry, index) => (
            <View key={entry.id}>
              <View style={styles.ClimateScreenHistoryRow}>
                <Text style={styles.ClimateScreenHistoryIcon}>
                  {entry.icon}
                </Text>
                <View style={styles.ClimateScreenHistoryTextGroup}>
                  <Text style={styles.ClimateScreenHistoryTitle}>
                    {entry.title}
                  </Text>
                  <Text style={styles.ClimateScreenHistoryDetail}>
                    {entry.detail}
                  </Text>
                </View>
                <Text style={styles.ClimateScreenHistoryTime}>
                  {entry.time}
                </Text>
              </View>
              {index < history.length - 1 ? (
                <View style={styles.ClimateScreenDivider} />
              ) : null}
            </View>
          ))}
        </GlassCard>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(440)}
        style={styles.ClimateScreenSection}
      >
        <GlassCard>
          <SectionHeader title="System Overview" />
          <View style={styles.ClimateScreenFooterRow}>
            <Text style={styles.ClimateScreenFooterLabel}>
              Current Target Temperature
            </Text>
            <Text style={styles.ClimateScreenFooterValue}>{temperature}°C</Text>
          </View>
          <View style={styles.ClimateScreenDivider} />
          <View style={styles.ClimateScreenFooterRow}>
            <Text style={styles.ClimateScreenFooterLabel}>
              Current Room Temperature
            </Text>
            <Text style={styles.ClimateScreenFooterValue}>
              {initialClimateState.temperature}°C
            </Text>
          </View>
          <View style={styles.ClimateScreenDivider} />
          <View style={styles.ClimateScreenFooterRow}>
            <Text style={styles.ClimateScreenFooterLabel}>Humidity</Text>
            <Text style={styles.ClimateScreenFooterValue}>
              {initialClimateState.humidity}%
            </Text>
          </View>
          <View style={styles.ClimateScreenDivider} />
          <View style={styles.ClimateScreenFooterRow}>
            <Text style={styles.ClimateScreenFooterLabel}>Air Quality</Text>
            <Text style={styles.ClimateScreenFooterValue}>
              {initialClimateState.airQuality}
            </Text>
          </View>
          <View style={styles.ClimateScreenDivider} />
          <View style={styles.ClimateScreenFooterRow}>
            <Text style={styles.ClimateScreenFooterLabel}>System Status</Text>
            <Text style={styles.ClimateScreenFooterValue}>{status}</Text>
          </View>
        </GlassCard>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ClimateScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ClimateScreenContent: {
    paddingHorizontal: Layout.screenPadding,
  },
  ClimateScreenTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.xs,
  },
  ClimateScreenSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  ClimateScreenSection: {
    marginTop: Layout.cardGap,
  },

  ClimateScreenStatusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.xl,
  },

  ClimateScreenStatusItem: {
    width: '50%',
    marginBottom: Spacing.lg,
  },
  ClimateScreenStatusLabel: {
    ...Typography.smallLabel,
  },
  ClimateScreenStatusValue: {
    ...Typography.body,
    fontWeight: '600',
    marginTop: 2,
  },
  ClimateScreenModesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  ClimateScreenFanChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.sm,
  },
  ClimateScreenFanChip: {
    marginRight: Spacing.xs,
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  ClimateScreenVisualizationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  ClimateScreenVisualizationItem: {
    alignItems: 'center',
  },
  ClimateScreenVisualizationIcon: {
    fontSize: 30,
    marginBottom: Spacing.sm,
  },

  ClimateScreenVisualizationLabel: {
    ...Typography.smallLabel,
  },
  ClimateScreenVisualizationCaption: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  ClimateScreenAutomationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  ClimateScreenAutomationLabel: {
    ...Typography.body,
    flex: 1,
    marginRight: Spacing.md,
  },

  ClimateScreenDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  ClimateScreenHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  ClimateScreenHistoryIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
  },
  ClimateScreenHistoryTextGroup: {
    flex: 1,
  },
  ClimateScreenHistoryTitle: {
    ...Typography.body,
    fontWeight: '600',
  },
  ClimateScreenHistoryDetail: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  ClimateScreenHistoryTime: {
    ...Typography.smallLabel,
  },
  ClimateScreenFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  ClimateScreenFooterLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  ClimateScreenFooterValue: {
    ...Typography.body,
    fontWeight: '600',
  },
});
