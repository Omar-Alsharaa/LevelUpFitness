import React, { useState } from 'react';
import styled from 'styled-components';

// Import new components
import GuildLeaderboard from '../components/leaderboard/GuildLeaderboard';
import UserChallenges from '../components/leaderboard/UserChallenges';
import Pagination from '../components/leaderboard/Pagination';

const LeaderboardContainer = styled.div`
  padding: 1rem 0;
`;

const LeaderboardFilters = styled.div`
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

const LeaderboardTable = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid rgba(67, 97, 238, 0.3);
  margin-bottom: 2rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background.darker};
  border-bottom: 1px solid rgba(67, 97, 238, 0.3);
  font-weight: 600;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 0.5fr 2fr 1fr 1fr;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 0.5fr 2fr 1fr;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid rgba(67, 97, 238, 0.1);
  align-items: center;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(67, 97, 238, 0.05);
  }
  
  ${props => props.isCurrentUser && `
    background-color: rgba(67, 97, 238, 0.1);
    border-left: 3px solid ${props.theme.colors.primary};
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 0.5fr 2fr 1fr 1fr;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 0.5fr 2fr 1fr;
  }
`;

const RankCell = styled.div`
  font-weight: 700;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => {
    if (props.rank === 1) return props.theme.colors.rank.s;
    if (props.rank === 2) return props.theme.colors.rank.a;
    if (props.rank === 3) return props.theme.colors.rank.b;
    return props.theme.colors.text.primary;
  }};
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background.darker};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  border: 2px solid ${props => props.theme.colors.rank[props.rank]};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  .username {
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
  }
  
  .rank-badge {
    display: inline-block;
    font-size: ${props => props.theme.fontSizes.xs};
    padding: 0.1rem 0.5rem;
    border-radius: ${props => props.theme.borderRadius.full};
    background-color: ${props => props.theme.colors.rank[props.rank]};
    color: ${props => props.rank === 'e' || props.rank === 'd' || props.rank === 'a' ? 
      props.theme.colors.background.dark : props.theme.colors.text.primary};
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const LevelCell = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const XPCell = styled.div`
  font-weight: 600;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const StatsCell = styled.div`
  display: flex;
  gap: 0.5rem;
  
  .stat {
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.xs};
    padding: 0.25rem 0.5rem;
    border-radius: ${props => props.theme.borderRadius.md};
    background-color: rgba(67, 97, 238, 0.1);
    
    &.str {
      color: ${props => props.theme.colors.stats.str};
    }
    
    &.agi {
      color: ${props => props.theme.colors.stats.agi};
    }
    
    &.end {
      color: ${props => props.theme.colors.stats.end};
    }
    
    svg {
      margin-right: 0.25rem;
    }
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

const YourRankCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.neonBlue};
  
  .rank-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .rank-number {
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.heading};
  }
  
  .rank-text {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.text.secondary};
  }
  
  .rank-percentile {
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.text.accent};
    font-family: ${props => props.theme.fonts.system};
    text-shadow: ${props => props.theme.shadows.glow};
  }
`;

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(67, 97, 238, 0.3);
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 600;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text.secondary};
  cursor: pointer;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Leaderboard = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('hunters');
  
  // Filter states
  const [activeFilter, setActiveFilter] = useState('global');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Mock leaderboard data
  const allLeaderboardData = [
    {
      id: 1,
      username: 'ShadowMonarch',
      rank: 's',
      level: 50,
      xp: 75000,
      stats: { str: 95, agi: 90, end: 98 },
      isCurrentUser: false,
    },
    {
      id: 2,
      username: 'IronHunter',
      rank: 'a',
      level: 45,
      xp: 65000,
      stats: { str: 99, agi: 80, end: 85 },
      isCurrentUser: false,
    },
    {
      id: 3,
      username: 'SpeedDemon',
      rank: 'b',
      level: 40,
      xp: 55000,
      stats: { str: 75, agi: 99, end: 80 },
      isCurrentUser: false,
    },
    {
      id: 4,
      username: 'EnduranceKing',
      rank: 'b',
      level: 38,
      xp: 50000,
      stats: { str: 80, agi: 75, end: 95 },
      isCurrentUser: false,
    },
    {
      id: 5,
      username: 'FitWarrior',
      rank: 'c',
      level: 30,
      xp: 35000,
      stats: { str: 85, agi: 70, end: 75 },
      isCurrentUser: false,
    },
    {
      id: 6,
      username: 'GymBeast',
      rank: 'c',
      level: 28,
      xp: 30000,
      stats: { str: 80, agi: 65, end: 70 },
      isCurrentUser: false,
    },
    {
      id: 7,
      username: 'Hunter',
      rank: 'e',
      level: 5,
      xp: 450,
      stats: { str: 75, agi: 60, end: 80 },
      isCurrentUser: true,
    },
    {
      id: 8,
      username: 'FitnessFanatic',
      rank: 'd',
      level: 15,
      xp: 10000,
      stats: { str: 65, agi: 70, end: 60 },
      isCurrentUser: false,
    },
    {
      id: 9,
      username: 'MuscleWizard',
      rank: 'c',
      level: 25,
      xp: 25000,
      stats: { str: 90, agi: 50, end: 65 },
      isCurrentUser: false,
    },
    {
      id: 10,
      username: 'CardioQueen',
      rank: 'c',
      level: 27,
      xp: 28000,
      stats: { str: 60, agi: 95, end: 75 },
      isCurrentUser: false,
    },
  ];
  
  // Mock guild data
  const guildData = [
    {
      id: 1,
      name: 'Iron Legion',
      rank: 's',
      level: 30,
      power: 150000,
      memberCount: 50,
      achievements: [
        { name: 'Boss Slayers', count: 25 },
        { name: 'Fitness Champions', count: 15 },
      ],
    },
    {
      id: 2,
      name: 'Fitness Fanatics',
      rank: 'a',
      level: 25,
      power: 120000,
      memberCount: 45,
      achievements: [
        { name: 'Marathon Masters', count: 30 },
        { name: 'Strength Squad', count: 10 },
      ],
    },
    {
      id: 3,
      name: 'Muscle Maniacs',
      rank: 'b',
      level: 20,
      power: 90000,
      memberCount: 40,
      achievements: [
        { name: 'Powerlifting Pros', count: 20 },
      ],
    },
    {
      id: 4,
      name: 'Cardio Crushers',
      rank: 'c',
      level: 15,
      power: 70000,
      memberCount: 35,
      achievements: [
        { name: 'Endurance Elite', count: 15 },
      ],
    },
    {
      id: 5,
      name: 'Workout Warriors',
      rank: 'd',
      level: 10,
      power: 50000,
      memberCount: 25,
      achievements: [],
    },
  ];
  
  // Mock challenge data
  const challengeData = [
    {
      id: 1,
      challenger: {
        username: 'IronHunter',
        rank: 'a',
      },
      type: 'Strength',
      status: 'pending',
    },
    {
      id: 2,
      challenger: {
        username: 'SpeedDemon',
        rank: 'b',
      },
      type: 'Agility',
      status: 'active',
    },
    {
      id: 3,
      challenger: {
        username: 'FitWarrior',
        rank: 'c',
      },
      type: 'Endurance',
      status: 'completed',
    },
  ];
  
  // Filter leaderboard data based on active filter
  const getFilteredData = () => {
    let filtered = [...allLeaderboardData];
    
    if (activeFilter === 'strength') {
      filtered.sort((a, b) => b.stats.str - a.stats.str);
    } else if (activeFilter === 'agility') {
      filtered.sort((a, b) => b.stats.agi - a.stats.agi);
    } else if (activeFilter === 'endurance') {
      filtered.sort((a, b) => b.stats.end - a.stats.end);
    } else if (activeFilter === 'friends') {
      // In a real app, this would filter to show only friends
      filtered = filtered.slice(0, 5);
    }
    
    return filtered;
  };
  
  // Get paginated data
  const getPaginatedData = () => {
    const filtered = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };
  
  // Calculate total pages
  const totalPages = Math.ceil(getFilteredData().length / itemsPerPage);
  
  // Get current user rank
  const currentUserRank = allLeaderboardData.findIndex(user => user.isCurrentUser) + 1;
  
  // Calculate percentile (mock calculation)
  const percentile = Math.round((1 - (currentUserRank / 1000)) * 100);
  
  // Mock user's guild ID
  const userGuildId = 2; // Fitness Fanatics
  
  // Challenge handlers
  const handleCreateChallenge = () => {
    alert('Challenge creation modal would open here');
  };
  
  const handleAcceptChallenge = (id) => {
    alert(`Accepted challenge ${id}`);
  };
  
  const handleDeclineChallenge = (id) => {
    alert(`Declined challenge ${id}`);
  };
  
  return (
    <LeaderboardContainer>
      <h1>Global Hunter Rankings</h1>
      
      <SystemMessage>
        "The System" is monitoring all hunters. Rise through the ranks to become the strongest.
      </SystemMessage>
      
      <YourRankCard>
        <div className="rank-info">
          <div className="rank-number">{currentUserRank}</div>
          <div>
            <div className="rank-text">Your Current Rank</div>
            <div className="rank-percentile">Top {percentile}% of all Hunters</div>
          </div>
        </div>
        
        <button className="primary">
          Improve Rank
        </button>
      </YourRankCard>
      
      <TabContainer>
        <TabButtons>
          <TabButton 
            active={activeTab === 'hunters'}
            onClick={() => setActiveTab('hunters')}
          >
            Hunters
          </TabButton>
          <TabButton 
            active={activeTab === 'guilds'}
            onClick={() => setActiveTab('guilds')}
          >
            Guilds
          </TabButton>
          <TabButton 
            active={activeTab === 'challenges'}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </TabButton>
        </TabButtons>
        
        {activeTab === 'hunters' && (
          <>
            <LeaderboardFilters>
              <FilterButton 
                active={activeFilter === 'global'}
                onClick={() => setActiveFilter('global')}
              >
                Global
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'friends'}
                onClick={() => setActiveFilter('friends')}
              >
                Friends
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'strength'}
                onClick={() => setActiveFilter('strength')}
              >
                Strength
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'agility'}
                onClick={() => setActiveFilter('agility')}
              >
                Agility
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'endurance'}
                onClick={() => setActiveFilter('endurance')}
              >
                Endurance
              </FilterButton>
            </LeaderboardFilters>
            
            <LeaderboardTable>
              <TableHeader>
                <div>Rank</div>
                <div>Hunter</div>
                <div>Level</div>
                <div>XP</div>
                <div>Stats</div>
              </TableHeader>
              
              {getPaginatedData().map((user, index) => {
                const globalRank = (currentPage - 1) * itemsPerPage + index + 1;
                return (
                  <TableRow key={user.id} isCurrentUser={user.isCurrentUser}>
                    <RankCell rank={globalRank}>{globalRank}</RankCell>
                    
                    <UserCell>
                      <Avatar rank={user.rank}>
                        {user.username.charAt(0)}
                      </Avatar>
                      <UserInfo rank={user.rank}>
                        <span className="username">{user.username}</span>
                        <span className="rank-badge">{user.rank}-rank</span>
                      </UserInfo>
                    </UserCell>
                    
                    <LevelCell>Level {user.level}</LevelCell>
                    
                    <XPCell>{user.xp.toLocaleString()} XP</XPCell>
                    
                    <StatsCell>
                      <div className="stat str">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                        </svg>
                        {user.stats.str}
                      </div>
                      
                      <div className="stat agi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        {user.stats.agi}
                      </div>
                      
                      <div className="stat end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        {user.stats.end}
                      </div>
                    </StatsCell>
                  </TableRow>
                );
              })}
            </LeaderboardTable>
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
        
        {activeTab === 'guilds' && (
          <GuildLeaderboard 
            guilds={guildData}
            userGuildId={userGuildId}
          />
        )}
        
        {activeTab === 'challenges' && (
          <UserChallenges 
            challenges={challengeData}
            onAcceptChallenge={handleAcceptChallenge}
            onDeclineChallenge={handleDeclineChallenge}
            onCreateChallenge={handleCreateChallenge}
          />
        )}
      </TabContainer>
    </LeaderboardContainer>
  );
};

export default Leaderboard;