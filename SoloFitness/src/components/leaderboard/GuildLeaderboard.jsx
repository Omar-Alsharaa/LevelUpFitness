import React, { useState } from 'react';
import styled from 'styled-components';

const GuildLeaderboardContainer = styled.div`
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
  
  ${props => props.isUserGuild && `
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

const GuildCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const GuildEmblem = styled.div`
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

const GuildInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  .guildname {
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
  }
  
  .member-count {
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const LevelCell = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const PowerCell = styled.div`
  font-weight: 600;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const AchievementsCell = styled.div`
  display: flex;
  gap: 0.5rem;
  
  .achievement {
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.xs};
    padding: 0.25rem 0.5rem;
    border-radius: ${props => props.theme.borderRadius.md};
    background-color: rgba(67, 97, 238, 0.1);
    
    svg {
      margin-right: 0.25rem;
    }
  }
`;

const GuildLeaderboard = ({ guilds, userGuildId }) => {
  return (
    <GuildLeaderboardContainer>
      <TableHeader>
        <div>Rank</div>
        <div>Guild</div>
        <div>Level</div>
        <div>Power</div>
        <div>Achievements</div>
      </TableHeader>
      
      {guilds.map((guild, index) => (
        <TableRow key={guild.id} isUserGuild={guild.id === userGuildId}>
          <RankCell rank={index + 1}>{index + 1}</RankCell>
          
          <GuildCell>
            <GuildEmblem rank={guild.rank}>
              {guild.name.charAt(0)}
            </GuildEmblem>
            <GuildInfo>
              <span className="guildname">{guild.name}</span>
              <span className="member-count">{guild.memberCount} members</span>
            </GuildInfo>
          </GuildCell>
          
          <LevelCell>Level {guild.level}</LevelCell>
          
          <PowerCell>{guild.power.toLocaleString()} Power</PowerCell>
          
          <AchievementsCell>
            {guild.achievements.map((achievement, i) => (
              <div key={i} className="achievement" title={achievement.name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                {achievement.count}
              </div>
            ))}
          </AchievementsCell>
        </TableRow>
      ))}
    </GuildLeaderboardContainer>
  );
};

export default GuildLeaderboard;