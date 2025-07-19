import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(67, 97, 238, 0.3);
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  background-color: ${props => props.theme.colors.background.darker};
  border: 1px solid rgba(67, 97, 238, 0.3);
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.primary};
  padding: 0.75rem 1rem;
  width: 100%;
  font-size: ${props => props.theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.neonBlue};
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem;
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: rgba(67, 97, 238, 0.5);
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.status.danger};
  font-size: ${props => props.theme.fontSizes.sm};
  text-align: center;
  margin-top: 1rem;
`;

const SystemMessage = styled.div`
  font-family: ${props => props.theme.fonts.system};
  color: ${props => props.theme.colors.text.accent};
  text-shadow: ${props => props.theme.shadows.glow};
  text-align: center;
  margin-top: 2rem;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock login - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.username && formData.password) {
        navigate('/');
      } else {
        throw new Error('Please fill in all fields');
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Hunter Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginCard>
      <SystemMessage>
        "The System" awaits your authentication...
      </SystemMessage>
    </LoginContainer>
  );
};

export default Login;