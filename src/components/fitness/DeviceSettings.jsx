import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 1.5rem;
`;

const DeviceList = styled.div`
  display: grid;
  gap: 1rem;
`;

const DeviceCard = styled.div`
  background-color: ${props => props.theme.colors.background.darker};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.connected ? props.theme.colors.status.success : 'transparent'};
`;

const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DeviceIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const DeviceDetails = styled.div`
  h3 {
    color: ${props => props.theme.colors.text.primary};
    margin: 0;
    font-size: ${props => props.theme.fontSizes.lg};
  }

  p {
    color: ${props => props.theme.colors.text.secondary};
    margin: 0;
    font-size: ${props => props.theme.fontSizes.sm};
  }
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

const DeviceSettings = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Apple Watch',
      type: '⌚',
      status: 'Available',
      connected: false
    },
    {
      id: 2,
      name: 'Samsung Galaxy Watch',
      type: '⌚',
      status: 'Available',
      connected: false
    },
    {
      id: 3,
      name: 'Huawei Watch',
      type: '⌚',
      status: 'Available',
      connected: false
    },
    {
      id: 4,
      name: 'Fitbit Versa',
      type: '⌚',
      status: 'Available',
      connected: false
    }
  ]);

  const handleDeviceConnection = (deviceId) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return {
          ...device,
          connected: !device.connected,
          status: !device.connected ? 'Connected' : 'Available'
        };
      }
      return device;
    }));
  };

  return (
    <SettingsContainer>
      <Title>Device Settings</Title>
      <DeviceList>
        {devices.map(device => (
          <DeviceCard key={device.id} connected={device.connected}>
            <DeviceInfo>
              <DeviceIcon>{device.type}</DeviceIcon>
              <DeviceDetails>
                <h3>{device.name}</h3>
                <p>{device.status}</p>
              </DeviceDetails>
            </DeviceInfo>
            <ConnectButton
              connected={device.connected}
              onClick={() => handleDeviceConnection(device.id)}
            >
              {device.connected ? 'Disconnect' : 'Connect'}
            </ConnectButton>
          </DeviceCard>
        ))}
      </DeviceList>
    </SettingsContainer>
  );
};

export default DeviceSettings;