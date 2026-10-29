"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-primary);
`;

const LoginCard = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  box-shadow: var(--glow-primary);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(46, 235, 170, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const Button = styled.button`
  background: var(--accent-gradient);
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1.5rem;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow-intense);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: -1rem;
`;

const FooterLinks = styled.div`
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  
  a {
    color: var(--accent-primary);
    &:hover { text-decoration: underline; }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in sessionStorage
        sessionStorage.setItem('admin_token', data.token);
        router.push('/adminaccess/dashboard');
      } else {
        setError(data.error || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Admin Access</Title>
        <Subtitle>Entre com suas credenciais para acessar o painel</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
        <FooterLinks>
          <Link href="/adminaccess/forgot-password">Esqueci minha senha</Link>
        </FooterLinks>
      </LoginCard>
    </LoginContainer>
  );
}
