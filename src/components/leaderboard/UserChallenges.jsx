import React, { useState } from 'react';
import styled from 'styled-components';

const ChallengesContainer = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  border: 1px solid rgba(67, 97, 238, 0.3);
  margin-bottom: 2rem;
`;

const ChallengeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    margin: 0;
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const ChallengeButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3651d8;
    box-shadow: ${props => props.theme.shadows.neonBlue};
  }
`;

const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChallengeCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background.darker};
  border: 1px solid rgba(67, 97, 238, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.neonBlue};
  }
`;

const ChallengeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChallengeAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background.card};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  border: 2px solid ${props => props.theme.colors.rank[props.rank]};
`;

const ChallengeDetails = styled.div`
  .challenger-name {
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 0.25rem;
  }
  
  .challenge-type {
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const ChallengeStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: ${props => props.theme.borderRadius.full};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 600;
    
    &.pending {
      background-color: rgba(255, 193, 7, 0.2);
      color: #ffc107;
    }
    
    &.active {
      background-color: rgba(54, 226, 180, 0.2);
      color: #36e2b4;
    }
    
    &.completed {
      background-color: rgba(67, 97, 238, 0.2);
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const ChallengeActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: ${props => props.accept ? 'rgba(54, 226, 180, 0.2)' : 'rgba(255, 56, 100, 0.2)'};
  color: ${props => props.accept ? '#36e2b4' : props.theme.colors.status.danger};
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.accept ? 'rgba(54, 226, 180, 0.4)' : 'rgba(255, 56, 100, 0.4)'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.text.secondary};
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const UserChallenges = ({ challenges, onAcceptChallenge, onDeclineChallenge, onCreateChallenge }) => {
  return (
    <ChallengesContainer>
      <ChallengeHeader>
        <h3>Hunter Challenges</h3>
        <ChallengeButton onClick={onCreateChallenge}>Challenge Hunter</ChallengeButton>
      </ChallengeHeader>
      
      <ChallengeList>
        {challenges.length > 0 ? (
          challenges.map(challenge => (
            <ChallengeCard key={challenge.id}>
              <ChallengeInfo>
                <ChallengeAvatar rank={challenge.challenger.rank}>
                  {challenge.challenger.username.charAt(0)}
                </ChallengeAvatar>
                <ChallengeDetails>
                  <div className="challenger-name">{challenge.challenger.username}</div>
                  <div className="challenge-type">{challenge.type} Challenge</div>
                </ChallengeDetails>
              </ChallengeInfo>
              
              <ChallengeStatus>
                <span className={`status-badge ${challenge.status}`}>
                  {challenge.status === 'pending' ? 'Pending' : 
                   challenge.status === 'active' ? 'In Progress' : 'Completed'}
                </span>
                
                {challenge.status === 'pending' && (
                  <ChallengeActions>
                    <ActionButton 
                      accept 
                      onClick={() => onAcceptChallenge(challenge.id)}
                    >
                      Accept
                    </ActionButton>
                    <ActionButton 
                      onClick={() => onDeclineChallenge(challenge.id)}
                    >
                      Decline
                    </ActionButton>
                  </ChallengeActions>
                )}
              </ChallengeStatus>
            </ChallengeCard>
          ))
        ) : (
          <EmptyState>
            <p>No active challenges at the moment.</p>
            <ChallengeButton onClick={onCreateChallenge}>Challenge a Hunter</ChallengeButton>
          </EmptyState>
        )}
      </ChallengeList>
    </ChallengesContainer>
  );
};

export default UserChallenges;