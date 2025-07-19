import React, { useState } from 'react';
import styled from 'styled-components';

const QuestsContainer = styled.div`
  padding: 1rem 0;
`;

const QuestFilters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.secondary};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : 'rgba(67, 97, 238, 0.3)'};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : 'rgba(67, 97, 238, 0.1)'};
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
  }
`;

const QuestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const QuestCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.neonBlue};
  }
  
  ${props => props.completed && `
    border-color: ${props.theme.colors.status.success};
    
    &:after {
      content: 'COMPLETED';
      position: absolute;
      top: 1rem;
      right: -2rem;
      background-color: ${props.theme.colors.status.success};
      color: ${props.theme.colors.background.dark};
      padding: 0.25rem 2rem;
      font-size: 0.75rem;
      font-weight: bold;
      transform: rotate(45deg);
    }
  `}
`;

const QuestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const QuestTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
`;

const QuestRank = styled.span`
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

const QuestDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
  font-size: ${props => props.theme.fontSizes.md};
`;

const QuestRewards = styled.div`
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

const QuestButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.completed ? props.theme.colors.status.success : props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: ${props => props.completed ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.completed ? props.theme.colors.status.success : '#3651d8'};
    box-shadow: ${props => props.completed ? 'none' : props.theme.shadows.neonBlue};
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
  margin-bottom: 2rem;
  font-size: ${props => props.theme.fontSizes.md};
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.text.secondary};
  
  svg {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const Quests = () => {
  // Filter states
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock quests data
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: 'Morning Awakening',
      description: 'Complete 50 push-ups to start your day with energy and strength.',
      rank: 'e',
      type: 'daily',
      rewards: { xp: 100, str: 5 },
      completed: false,
    },
    {
      id: 2,
      title: 'Cardio Hunter',
      description: 'Run 5km under 30 minutes to improve your agility and endurance.',
      rank: 'd',
      type: 'daily',
      rewards: { xp: 300, agi: 8 },
      completed: true,
    },
    {
      id: 3,
      title: 'Iron Will',
      description: 'Complete a 30-minute HIIT workout to forge your body and mind.',
      rank: 'e',
      type: 'daily',
      rewards: { xp: 200, end: 7 },
      completed: false,
    },
    {
      id: 4,
      title: 'Weekly Challenge: Mountain Climber',
      description: 'Complete 500 mountain climbers over the course of this week.',
      rank: 'c',
      type: 'weekly',
      rewards: { xp: 500, agi: 10, end: 10 },
      completed: false,
    },
    {
      id: 5,
      title: 'Strength Builder',
      description: 'Perform 5 sets of 5 reps of deadlifts at 80% of your 1RM.',
      rank: 'd',
      type: 'daily',
      rewards: { xp: 250, str: 12 },
      completed: false,
    },
    {
      id: 6,
      title: 'Monthly Challenge: Iron Body',
      description: 'Complete 20 workouts this month to transform your body.',
      rank: 'b',
      type: 'monthly',
      rewards: { xp: 1000, str: 15, agi: 15, end: 15 },
      completed: false,
    },
  ]);
  
  // Filter quests based on active filter
  const filteredQuests = quests.filter(quest => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return quest.completed;
    if (activeFilter === 'daily') return quest.type === 'daily';
    if (activeFilter === 'weekly') return quest.type === 'weekly';
    if (activeFilter === 'monthly') return quest.type === 'monthly';
    if (activeFilter === 'story') return quest.type === 'story';
    if (activeFilter === 'guild') return quest.type === 'guild';
    return true;
  });
  
  // Toggle quest completion
  const toggleQuestCompletion = (id) => {
    setQuests(quests.map(quest => 
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    ));
  };
  
  return (
    <QuestsContainer>
      <h1>Available Quests</h1>
      
      <SystemMessage>
        "The System" has assigned you new quests. Complete them to grow stronger.
      </SystemMessage>
      
      <QuestFilters>
        <FilterButton 
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'daily'}
          onClick={() => setActiveFilter('daily')}
        >
          Daily
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'weekly'}
          onClick={() => setActiveFilter('weekly')}
        >
          Weekly
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'story'}
          onClick={() => setActiveFilter('story')}
        >
          Story
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'guild'}
          onClick={() => setActiveFilter('guild')}
        >
          Guild
        </FilterButton>
      </QuestFilters>
      
      {filteredQuests.length > 0 ? (
        <QuestGrid>
          {filteredQuests.map(quest => (
            <QuestCard key={quest.id} completed={quest.completed}>
              <QuestHeader>
                <QuestTitle>{quest.title}</QuestTitle>
                <QuestRank rank={quest.rank}>{quest.rank}-Rank</QuestRank>
              </QuestHeader>
              
              <QuestDescription>{quest.description}</QuestDescription>
              
              <QuestRewards>
                <Reward>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  {quest.rewards.xp} XP
                </Reward>
                
                {quest.rewards.str && (
                  <Reward color="#FF3864">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    </svg>
                    +{quest.rewards.str} STR
                  </Reward>
                )}
                
                {quest.rewards.agi && (
                  <Reward color="#36E2B4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                    +{quest.rewards.agi} AGI
                  </Reward>
                )}
                
                {quest.rewards.end && (
                  <Reward color="#4361EE">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    +{quest.rewards.end} END
                  </Reward>
                )}
              </QuestRewards>
              
              <QuestButton 
                completed={quest.completed}
                onClick={() => !quest.completed && toggleQuestCompletion(quest.id)}
              >
                {quest.completed ? 'Completed' : 'Start Quest'}
              </QuestButton>
            </QuestCard>
          ))}
        </QuestGrid>
      ) : (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 15h8"></path>
            <path d="M9 9h.01"></path>
            <path d="M15 9h.01"></path>
          </svg>
          <h3>No Quests Found</h3>
          <p>There are no quests matching your current filter.</p>
          <button className="primary" onClick={() => setActiveFilter('all')}>View All Quests</button>
        </EmptyState>
      )}
    </QuestsContainer>
  );
};

export default Quests;