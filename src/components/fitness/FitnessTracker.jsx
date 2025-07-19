import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TrackerContainer = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TrackerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.heading};
  margin: 0;
`;

const DeviceStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.connected ? props.theme.colors.status.success : props.theme.colors.status.danger};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MetricCard = styled.div`
  background-color: ${props => props.theme.colors.background.darker};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ConnectButton = styled.button`
  background-color: ${props => props.connected ? props.theme.colors.status.danger : props.theme.colors.status.success};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const FitnessTracker = () => {
  const [connected, setConnected] = useState(false);
  const [metrics, setMetrics] = useState({
    steps: 0,
    calories: 0,
    distance: 0,
    pushups: 0,
    heartRate: '--'
  });

  useEffect(() => {
    // Mock data updates - replace with actual smartwatch API integration
    if (connected) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          steps: prev.steps + Math.floor(Math.random() * 100),
          calories: prev.calories + Math.floor(Math.random() * 10),
          distance: +(prev.distance + Math.random() * 0.1).toFixed(2),
          pushups: prev.pushups,
          heartRate: Math.floor(60 + Math.random() * 40)
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [connected]);

  const handleDeviceConnection = () => {
    // Replace with actual smartwatch connection logic
    setConnected(!connected);
  };

  return (
    <TrackerContainer>
      <TrackerHeader>
        <Title>Fitness Tracker</Title>
        <div>
          <DeviceStatus connected={connected}>
            {connected ? '🟢 Device Connected' : '🔴 Device Disconnected'}
          </DeviceStatus>
          <ConnectButton
            connected={connected}
            onClick={handleDeviceConnection}
          >
            {connected ? 'Disconnect Device' : 'Connect Device'}
          </ConnectButton>
        </div>
      </TrackerHeader>

      <MetricsGrid>
        <MetricCard>
          <MetricValue>{metrics.steps.toLocaleString()}</MetricValue>
          <MetricLabel>Steps</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.calories}</MetricValue>
          <MetricLabel>Calories Burned</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.distance}km</MetricValue>
          <MetricLabel>Distance</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.pushups}</MetricValue>
          <MetricLabel>Push-ups</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.heartRate}</MetricValue>
          <MetricLabel>Heart Rate (BPM)</MetricLabel>
        </MetricCard>
      </MetricsGrid>
    </TrackerContainer>
  );
};

export default FitnessTracker;