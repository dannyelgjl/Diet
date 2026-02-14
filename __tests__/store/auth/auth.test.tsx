import { act } from '@testing-library/react-native';
import { useAuthStore } from '../../../src/store/auth/auth.simple.store';

describe('useAuthStore (local auth)', () => {
  beforeEach(() => {
    useAuthStore.setState({ isLoggedIn: false, email: null });
  });

  it('starts logged out', () => {
    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.email).toBeNull();
  });

  it('logs in with correct credentials (trim + lowercase)', async () => {
    await act(async () => {
      await useAuthStore
        .getState()
        .login('  EMAIL-TESTE@TESTE.COM  ', '123456');
    });

    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.email).toBe('email-teste@teste.com');
  });

  it('fails to log in with wrong email', async () => {
    await expect(
      useAuthStore.getState().login('x@x.com', '123456'),
    ).rejects.toThrow('Email ou senha inválidos');

    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.email).toBeNull();
  });

  it('fails to log in with wrong password', async () => {
    await expect(
      useAuthStore.getState().login('email-teste@teste.com', '999999'),
    ).rejects.toThrow('Email ou senha inválidos');

    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.email).toBeNull();
  });

  it('clears the session on logout', async () => {
    await act(async () => {
      await useAuthStore.getState().login('email-teste@teste.com', '123456');
    });

    expect(useAuthStore.getState().isLoggedIn).toBe(true);

    await act(async () => {
      await useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.email).toBeNull();
  });
});
