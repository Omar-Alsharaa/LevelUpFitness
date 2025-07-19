import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components for Dashboard
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const StatsCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  
  h2 {
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const StatRow = styled.div`
  margin-bottom: 1.25rem;
  
  .stat-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    span {
      font-weight: 600;
    }
    
    .stat-value {
      color: ${props => props.color || props.theme.colors.primary};
    }
    
    .stat-increase {
      color: ${props => props.theme.colors.status.success};
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }
`;

const QuestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuestCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.25rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.neonBlue};
  }
  
  .quest-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    
    h3 {
      font-size: ${props => props.theme.fontSizes.lg};
      color: ${props => props.theme.colors.text.primary};
      margin: 0;
    }
    
    .quest-rank {
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }
  
  .quest-description {
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: 1rem;
    font-size: ${props => props.theme.fontSizes.md};
  }
  
  .quest-rewards {
    display: flex;
    gap: 1rem;
    
    .reward {
      display: flex;
      align-items: center;
      font-size: ${props => props.theme.fontSizes.sm};
      color: ${props => props.theme.colors.text.primary};
      
      svg {
        margin-right: 0.25rem;
        color: ${props => props.theme.colors.accent};
      }
    }
  }
`;

const ProfileSection = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background.darker};
  border: 2px solid ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.neonBlue};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-rank {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.rank[props.rank]};
    color: ${props => props.rank === 'e' || props.rank === 'd' || props.rank === 'a' ? 
      props.theme.colors.background.dark : props.theme.colors.text.primary};
    padding: 0.25rem;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.xs};
    text-transform: uppercase;
  }
`;

const LevelInfo = styled.div`
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin-bottom: 0.25rem;
  }
  
  .level-subtitle {
    color: ${props => props.theme.colors.text.secondary};
    font-size: ${props => props.theme.fontSizes.md};
    margin-bottom: 1rem;
  }
  
  .xp-text {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.text.secondary};
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
`;

const SystemMessage = styled.div`
  font-family: ${props => props.theme.fonts.system};
  color: ${props => props.theme.colors.text.accent};
  text-shadow: ${props => props.theme.shadows.glow};
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.text.accent};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: rgba(0, 245, 255, 0.05);
  margin-top: 1rem;
  font-size: ${props => props.theme.fontSizes.md};
  text-align: center;
`;

const Dashboard = () => {
  // Mock user data - in a real app, this would come from context/API
  const [userData, setUserData] = useState({
    name: 'Hunter',
    rank: 'e',
    level: 5,
    xp: 450,
    xpToNextLevel: 1000,
    stats: {
      str: { value: 75, increase: 5 },
      agi: { value: 60, increase: 0 },
      end: { value: 80, increase: 3 },
    },
    skills: [
      { id: 1, name: 'Double XP', description: 'Double XP for 1 hour', cooldown: '24h' },
      { id: 2, name: 'Stamina Boost', description: '+20% Endurance for next workout', cooldown: '12h' },
    ],
  });
  
  // Mock quests data
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: 'Morning Awakening',
      description: 'Complete 50 push-ups',
      rank: 'e',
      rewards: { xp: 100, str: 5 },
      completed: false,
    },
    {
      id: 2,
      title: 'Cardio Hunter',
      description: 'Run 5km under 30 minutes',
      rank: 'd',
      rewards: { xp: 300, agi: 8 },
      completed: false,
    },
    {
      id: 3,
      title: 'Iron Will',
      description: 'Complete a 30-minute HIIT workout',
      rank: 'e',
      rewards: { xp: 200, end: 7 },
      completed: false,
    },
  ]);
  
  // Show system message
  const [systemMessage, setSystemMessage] = useState('');
  
  useEffect(() => {
    // Simulate "The System" sending a message
    setTimeout(() => {
      setSystemMessage('Hunter, your daily quests have been updated. Complete them to grow stronger.');
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setSystemMessage('');
      }, 5000);
    }, 1000);
  }, []);
  
  // Calculate XP percentage
  const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100;
  
  return (
    <div>
      <h1>Hunter Dashboard</h1>
      
      {systemMessage && (
        <SystemMessage>
          {systemMessage}
        </SystemMessage>
      )}
      
      <DashboardContainer>
        <div>
          <StatsCard>
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
              Hunter Stats
            </h2>
            
            <StatRow color={userData.stats.str.increase > 0 ? '#FF3864' : undefined}>
              <div className="stat-label">
                <span>STR (Strength)</span>
                <div>
                  <span className="stat-value">{userData.stats.str.value}</span>
                  {userData.stats.str.increase > 0 && (
                    <span className="stat-increase"> +{userData.stats.str.increase}</span>
                  )}
                </div>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill str" 
                  style={{ width: `${userData.stats.str.value}%` }}
                ></div>
              </div>
            </StatRow>
            
            <StatRow color={userData.stats.agi.increase > 0 ? '#36E2B4' : undefined}>
              <div className="stat-label">
                <span>AGI (Agility)</span>
                <div>
                  <span className="stat-value">{userData.stats.agi.value}</span>
                  {userData.stats.agi.increase > 0 && (
                    <span className="stat-increase"> +{userData.stats.agi.increase}</span>
                  )}
                </div>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill agi" 
                  style={{ width: `${userData.stats.agi.value}%` }}
                ></div>
              </div>
            </StatRow>
            
            <StatRow color={userData.stats.end.increase > 0 ? '#4361EE' : undefined}>
              <div className="stat-label">
                <span>END (Endurance)</span>
                <div>
                  <span className="stat-value">{userData.stats.end.value}</span>
                  {userData.stats.end.increase > 0 && (
                    <span className="stat-increase"> +{userData.stats.end.increase}</span>
                  )}
                </div>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill end" 
                  style={{ width: `${userData.stats.end.value}%` }}
                ></div>
              </div>
            </StatRow>
          </StatsCard>
          
          <StatsCard>
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Daily Quests
            </h2>
            
            <QuestsList>
              {quests.map(quest => (
                <QuestCard key={quest.id}>
                  <div className="quest-header">
                    <h3>{quest.title}</h3>
                    <span className={`rank-badge rank-${quest.rank}`}>{quest.rank}-Rank</span>
                  </div>
                  <p className="quest-description">{quest.description}</p>
                  <div className="quest-rewards">
                    <div className="reward">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                      {quest.rewards.xp} XP
                    </div>
                    {quest.rewards.str && (
                      <div className="reward">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3864" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                        </svg>
                        +{quest.rewards.str} STR
                      </div>
                    )}
                    {quest.rewards.agi && (
                      <div className="reward">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#36E2B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        +{quest.rewards.agi} AGI
                      </div>
                    )}
                    {quest.rewards.end && (
                      <div className="reward">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        +{quest.rewards.end} END
                      </div>
                    )}
                  </div>
                </QuestCard>
              ))}
            </QuestsList>
          </StatsCard>
        </div>
        
        <div>
          <ProfileSection>
            <AvatarContainer rank={userData.rank}>
              {/* Placeholder for avatar image */}
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2rem',
                color: '#4361EE'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="avatar-rank">{userData.rank}-rank</div>
            </AvatarContainer>
            
            <LevelInfo>
              <h2>Level {userData.level}</h2>
              <div className="level-subtitle">E-Rank Hunter</div>
              
              <div className="xp-bar">
                <div 
                  className="xp-fill" 
                  style={{ width: `${xpPercentage}%` }}
                ></div>
              </div>
              
              <div className="xp-text">
                <span>{userData.xp} XP</span>
                <span>{userData.xpToNextLevel} XP</span>
              </div>
            </LevelInfo>
            
            <button className="primary">
              Start Workout
            </button>
          </ProfileSection>
          
          <StatsCard>
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                <line x1="3" y1="22" x2="21" y2="22"></line>
              </svg>
              Unlocked Skills
            </h2>
            
            {userData.skills.map(skill => (
              <div key={skill.id} style={{ 
                padding: '0.75rem', 
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderRadius: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{skill.name}</span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: '#B4B4C7'
                  }}>Cooldown: {skill.cooldown}</span>
                </div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#B4B4C7',
                  margin: 0
                }}>{skill.description}</p>
              </div>
            ))}
            
            <div style={{ 
              textAlign: 'center', 
              color: '#B4B4C7',
              fontSize: '0.875rem',
              marginTop: '1rem'
            }}>
              Reach Level 10 to unlock more skills
            </div>
          </StatsCard>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;