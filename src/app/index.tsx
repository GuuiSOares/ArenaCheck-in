import { Redirect } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { token, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (token) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/login" />;
}
