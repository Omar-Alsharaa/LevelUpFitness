import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 2fr;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
`;

const UserCard = styled(Card)`
  text-align: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background.darker};
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  border: 3px solid ${props => props.theme.colors.primary};
`;

const Username = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const RankBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.rank[props.rank]};
  color: ${props => props.rank === 'e' || props.rank === 'd' || props.rank === 'a' ? 
    props.theme.colors.background.dark : props.theme.colors.text.primary};
  font-weight: 700;
  font-size: ${props => props.theme.fontSizes.sm};
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
`;

const StatItem = styled.div`
  .label {
    color: ${props => props.theme.colors.text.secondary};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: 0.25rem;
  }
  
  .value {
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 700;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.background.darker};
  border-radius: ${props => props.theme.borderRadius.full};
  margin: 1rem 0;
  overflow: hidden;
  
  .fill {
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.text.primary : props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.md};
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const Achievement = styled.div`
  background-color: ${props => props.theme.colors.background.darker};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
  
  .title {
    color: ${props => props.theme.colors.text.primary};
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .description {
    color: ${props => props.theme.colors.text.secondary};
    font-size: ${props => props.theme.fontSizes.sm};
  }
  
  .progress {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-top: 0.5rem;
  }
`;

const SystemMessage = styled.div`
  font-family: ${props => props.theme.fonts.system};
  color: ${props => props.theme.colors.text.accent};
  text-shadow: ${props => props.theme.shadows.glow};
  margin-top: 2rem;
  text-align: center;
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('achievements');
  
  // Mock user data
  const userData = {
    username: 'CyberHunter',
    rank: 'a',
    level: 42,
    experience: 8750,
    nextLevelXP: 10000,
    stats: {
      strength: 75,
      agility: 68,
      endurance: 82
    },
    achievements: [
      {
        id: 1,
        title: 'First Victory',
        description: 'Win your first boss fight',
        progress: 100,
        completed: true
      },
      {
        id: 2,
        title: 'Quest Master',
        description: 'Complete 100 quests',
        progress: 45,
        completed: false
      },
      {
        id: 3,
        title: 'Peak Performance',
        description: 'Reach level 50',
        progress: 84,
        completed: false
      }
    ]
  };

  return (
    <ProfileContainer>
      <UserCard>
        <Avatar>{userData.username[0]}</Avatar>
        <Username>{userData.username}</Username>
        <RankBadge rank={userData.rank}>Rank {userData.rank.toUpperCase()}</RankBadge>
        
        <div>
          <div className="level">Level {userData.level}</div>
          <ProgressBar progress={(userData.experience / userData.nextLevelXP) * 100}>
            <div className="fill" />
          </ProgressBar>
          <div className="xp">{userData.experience} / {userData.nextLevelXP} XP</div>
        </div>
        
        <Stats>
          <StatItem>
            <div className="label">STR</div>
            <div className="value">{userData.stats.strength}</div>
          </StatItem>
          <StatItem>
            <div className="label">AGI</div>
            <div className="value">{userData.stats.agility}</div>
          </StatItem>
          <StatItem>
            <div className="label">END</div>
            <div className="value">{userData.stats.endurance}</div>
          </StatItem>
        </Stats>
      </UserCard>
      
      <Card>
        <TabContainer>
          <Tab
            active={activeTab === 'achievements'}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </Tab>
          <Tab
            active={activeTab === 'statistics'}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </Tab>
          <Tab
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Tab>
        </TabContainer>
        
        {activeTab === 'achievements' && (
          <AchievementGrid>
            {userData.achievements.map(achievement => (
              <Achievement key={achievement.id}>
                <div className="title">{achievement.title}</div>
                <div className="description">{achievement.description}</div>
                <div className="progress">
                  {achievement.completed ? 'Completed' : `${achievement.progress}%`}
                </div>
              </Achievement>
            ))}
          </AchievementGrid>
        )}
        
        {activeTab === 'statistics' && (
          <div>Statistics content coming soon...</div>
        )}
        
        {activeTab === 'settings' && (
          <div>Settings content coming soon...</div>
        )}
      </Card>
      
      <SystemMessage>
        "The System" is analyzing your performance metrics...
      </SystemMessage>
    </ProfileContainer>
  );
};

export default Profile;