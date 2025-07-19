import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: ${props => props.theme.colors.background.darker};
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(67, 97, 238, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  transform: translateY(${props => props.hide ? '-100%' : '0'});

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.75rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
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
    margin-left: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.background.darker};
    padding: 0;
    border-bottom: 1px solid rgba(67, 97, 238, 0.3);
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: -1;
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
    background-color: rgba(67, 97, 238, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(67, 97, 238, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
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
      
      @media (max-width: ${props.theme.breakpoints.md}) {
        bottom: -1px;
        left: 0;
        right: 0;
      }
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
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(67, 97, 238, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
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
  box-shadow: 0 0 10px ${props => props.theme.colors.rank[props.rank]}80;
`;

const MobileUserSection = styled(UserSection)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 1rem;
    background-color: ${props => props.theme.colors.background.card};
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  
  // Mock user data - in a real app, this would come from auth context
  const user = {
    rank: 'e', // e, d, c, b, a, s
    level: 5,
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <NavbarContainer hide={!visible}>
      <NavContent>
        <Logo>
          Level<span>Up</span>
        </Logo>
        
        <MobileMenuButton 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
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
          <MobileUserSection>
            <RankBadge rank={user.rank}>{user.rank}-Rank</RankBadge>
            <NavLink to="/profile" isActive={isActive('/profile')}>
              Profile
            </NavLink>
          </MobileUserSection>
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