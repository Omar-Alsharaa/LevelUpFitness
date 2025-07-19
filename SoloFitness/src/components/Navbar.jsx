import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: ${props => props.theme.colors.background.darker};
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(67, 97, 238, 0.3);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.background.darker};
    padding: 1rem;
    border-bottom: 1px solid rgba(67, 97, 238, 0.3);
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.md};
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
  
  ${props => props.isActive && `
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0.75rem;
      right: 0.75rem;
      height: 2px;
      background-color: ${props.theme.colors.primary};
      box-shadow: ${props.theme.shadows.neonBlue};
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RankBadge = styled.div`
  background-color: ${props => props.theme.colors.rank[props.rank]};
  color: ${props => props.rank === 'e' || props.rank === 'd' || props.rank === 'a' ? 
    props.theme.colors.background.dark : props.theme.colors.text.primary};
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
`;

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock user data - in a real app, this would come from auth context
  const user = {
    rank: 'e', // e, d, c, b, a, s
    level: 5,
  };
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <NavbarContainer>
      <NavContent>
        <Logo>
          Level<span>Up</span> Fitness
        </Logo>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" isActive={isActive('/')}>
            Dashboard
          </NavLink>
          <NavLink to="/quests" isActive={isActive('/quests')}>
            Quests
          </NavLink>
          <NavLink to="/boss-fight" isActive={isActive('/boss-fight')}>
            Boss Fight
          </NavLink>
          <NavLink to="/leaderboard" isActive={isActive('/leaderboard')}>
            Leaderboard
          </NavLink>
        </NavLinks>
        
        <UserSection>
          <RankBadge rank={user.rank}>{user.rank}-Rank</RankBadge>
          <NavLink to="/profile" isActive={isActive('/profile')}>
            Profile
          </NavLink>
        </UserSection>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;