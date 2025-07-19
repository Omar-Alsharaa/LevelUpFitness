import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BossFightContainer = styled.div`
  padding: 1rem 0;
`;

const BossCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  ${props => props.active && `
    border-color: ${props.theme.colors.status.danger};
    box-shadow: 0 0 15px rgba(255, 56, 100, 0.3);
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.neonBlue};
  }
`;

const BossHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BossTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: ${props => props.theme.colors.status.danger};
  }
`;

const BossRank = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${props => props.theme.colors.rank[props.rank]};
  color: ${props => props.rank === 'e' || props.rank === 'd' || props.rank === 'a' ? 
    props.theme.colors.background.dark : props.theme.colors.text.primary};
`;

const BossDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
  font-size: ${props => props.theme.fontSizes.md};
`;

const BossRewards = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Reward = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: rgba(67, 97, 238, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.color || props.theme.colors.primary};
  }
`;

const BossButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.status.danger};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e62e59;
    box-shadow: 0 0 15px rgba(255, 56, 100, 0.5);
  }
`;

const ActiveBossFight = styled.div`
  background-color: ${props => props.theme.colors.background.darker};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  border: 2px solid ${props => props.theme.colors.status.danger};
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 56, 100, 0.3);
`;

const BossHealthBar = styled.div`
  height: 20px;
  background-color: rgba(255, 56, 100, 0.2);
  border-radius: ${props => props.theme.borderRadius.full};
  margin: 1.5rem 0;
  position: relative;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.status.danger};
  
  .health-fill {
    height: 100%;
    background-color: ${props => props.theme.colors.status.danger};
    transition: width 0.5s ease-out;
    border-radius: ${props => props.theme.borderRadius.full};
    box-shadow: 0 0 10px rgba(255, 56, 100, 0.7);
  }
  
  .health-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes.xs};
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
`;

const TimerDisplay = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes['3xl']};
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text.primary};
`;

const ProgressCounter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  .progress-label {
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
  }
  
  .progress-count {
    font-family: ${props => props.theme.fonts.heading};
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const SystemMessage = styled.div`
  font-family: ${props => props.theme.fonts.system};
  color: ${props => props.theme.colors.text.accent};
  text-shadow: ${props => props.theme.shadows.glow};
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.text.accent};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: rgba(0, 245, 255, 0.05);
  margin-bottom: 2rem;
  font-size: ${props => props.theme.fontSizes.md};
  text-align: center;
`;

const VictoryScreen = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 2px solid ${props => props.theme.colors.status.success};
  box-shadow: 0 0 20px rgba(54, 226, 180, 0.3);
  
  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.status.success};
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: 2rem;
  }
  
  .rewards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const BossFight = () => {
  // State for active boss fight
  const [activeBoss, setActiveBoss] = useState(null);
  const [bossHealth, setBossHealth] = useState(100);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  
  // Mock boss data
  const bosses = [
    {
      id: 1,
      name: 'Push-Up Demon King',
      description: 'Complete 100 push-ups within 10 minutes to defeat this boss.',
      rank: 'd',
      target: 100,
      timeLimit: 600, // 10 minutes in seconds
      rewards: { xp: 500, str: 15 },
      skill: { name: 'Arm Breaker', description: '+10% Strength for 24 hours' },
    },
    {
      id: 2,
      name: 'Burpee Monarch',
      description: 'Survive 50 burpees in 5 minutes to claim victory over this fearsome boss.',
      rank: 'c',
      target: 50,
      timeLimit: 300, // 5 minutes in seconds
      rewards: { xp: 750, agi: 10, end: 10 },
      skill: { name: 'Second Wind', description: '+15% Endurance for 24 hours' },
    },
    {
      id: 3,
      name: 'Plank Overlord',
      description: 'Hold a plank position for a total of 5 minutes to defeat this endurance boss.',
      rank: 'b',
      target: 300, // 5 minutes in seconds
      timeLimit: 600, // 10 minutes in seconds (with rest periods)
      rewards: { xp: 1000, end: 20 },
      skill: { name: 'Iron Core', description: '+20% Core Strength for 24 hours' },
    },
  ];
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start boss fight
  const startBossFight = (boss) => {
    setActiveBoss(boss);
    setBossHealth(100);
    setTimer(boss.timeLimit);
    setProgress(0);
    setShowVictory(false);
    
    // Scroll to active boss fight
    setTimeout(() => {
      document.getElementById('active-boss-fight')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Increment progress
  const incrementProgress = () => {
    if (!activeBoss) return;
    
    const newProgress = progress + 1;
    setProgress(newProgress);
    
    // Calculate health percentage
    const healthPercentage = 100 - (newProgress / activeBoss.target * 100);
    setBossHealth(Math.max(0, healthPercentage));
    
    // Check if boss is defeated
    if (newProgress >= activeBoss.target) {
      setShowVictory(true);
      setActiveBoss(null);
    }
  };
  
  // Abandon boss fight
  const abandonBossFight = () => {
    setActiveBoss(null);
    setBossHealth(100);
    setTimer(0);
    setProgress(0);
    setShowVictory(false);
  };
  
  // Timer effect
  useEffect(() => {
    let interval;
    
    if (activeBoss && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            // Time's up, boss fight failed
            setActiveBoss(null);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [activeBoss, timer]);
  
  return (
    <BossFightContainer>
      <h1>Boss Fight Arena</h1>
      
      <SystemMessage>
        "The System" has summoned powerful bosses. Defeat them to earn rare rewards.
      </SystemMessage>
      
      {activeBoss && !showVictory && (
        <ActiveBossFight id="active-boss-fight">
          <BossHeader>
            <BossTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
              {activeBoss.name}
            </BossTitle>
            <BossRank rank={activeBoss.rank}>{activeBoss.rank}-Rank</BossRank>
          </BossHeader>
          
          <TimerDisplay>
            {formatTime(timer)}
          </TimerDisplay>
          
          <BossHealthBar>
            <div className="health-fill" style={{ width: `${bossHealth}%` }}></div>
            <div className="health-text">{Math.round(bossHealth)}% HP</div>
          </BossHealthBar>
          
          <ProgressCounter>
            <span className="progress-label">Progress:</span>
            <span className="progress-count">{progress} / {activeBoss.target}</span>
          </ProgressCounter>
          
          <BossDescription>
            {activeBoss.description}
          </BossDescription>
          
          <ActionButtons>
            <button className="primary" onClick={incrementProgress}>
              Record Rep
            </button>
            <button className="outline" onClick={abandonBossFight}>
              Abandon Fight
            </button>
          </ActionButtons>
        </ActiveBossFight>
      )}
      
      {showVictory && (
        <VictoryScreen>
          <h2>Boss Defeated!</h2>
          <p>You have successfully defeated the boss and earned valuable rewards!</p>
          
          <div className="rewards-container">
            <Reward>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              {bosses[0].rewards.xp} XP
            </Reward>
            
            {bosses[0].rewards.str && (
              <Reward color="#FF3864">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                </svg>
                +{bosses[0].rewards.str} STR
              </Reward>
            )}
            
            <Reward color="#B643FF">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
              </svg>
              New Skill: {bosses[0].skill.name}
            </Reward>
          </div>
          
          <button className="primary" onClick={() => setShowVictory(false)}>
            Return to Arena
          </button>
        </VictoryScreen>
      )}
      
      <h2>Available Boss Challenges</h2>
      
      {bosses.map(boss => (
        <BossCard key={boss.id} active={activeBoss?.id === boss.id}>
          <BossHeader>
            <BossTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
              {boss.name}
            </BossTitle>
            <BossRank rank={boss.rank}>{boss.rank}-Rank</BossRank>
          </BossHeader>
          
          <BossDescription>{boss.description}</BossDescription>
          
          <BossRewards>
            <Reward>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              {boss.rewards.xp} XP
            </Reward>
            
            {boss.rewards.str && (
              <Reward color="#FF3864">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                </svg>
                +{boss.rewards.str} STR
              </Reward>
            )}
            
            {boss.rewards.agi && (
              <Reward color="#36E2B4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                +{boss.rewards.agi} AGI
              </Reward>
            )}
            
            {boss.rewards.end && (
              <Reward color="#4361EE">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                +{boss.rewards.end} END
              </Reward>
            )}
            
            <Reward color="#B643FF">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
              </svg>
              Skill: {boss.skill.name}
            </Reward>
          </BossRewards>
          
          <BossButton 
            onClick={() => startBossFight(boss)}
            disabled={activeBoss !== null}
          >
            Challenge Boss
          </BossButton>
        </BossCard>
      ))}
    </BossFightContainer>
  );
};

export default BossFight;