import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase?.auth?.getSession();
        if (error) {
          setError(error?.message);
          return;
        }
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session?.user?.id);
        }
      } catch (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('AuthRetryableFetchError')) {
          setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
          return;
        }
        setError('Something went wrong during authentication setup.');
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setError(null);
        
        if (session?.user) {
          fetchUserProfile(session?.user?.id);
        } else {
          setUserProfile(null);
        }
        
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          setLoading(false);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single();

      if (error) {
        if (error?.code !== 'PGRST116') {
          setError(`Profile error: ${error?.message}`);
        }
        return;
      }

      setUserProfile(data);
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        setError('Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.');
        return;
      }
      setError('Failed to load user profile');
      console.error('Profile fetch error:', error);
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      setError(null);
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name || '',
            role: userData?.role || 'buyer'
          }
        }
      });

      if (error) {
        setError(error?.message);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        return { data: null, error: { message: error?.message } };
      }
      setError('Something went wrong. Please try again.');
      console.error('Signup error:', error);
      return { data: null, error: { message: 'Signup failed' } };
    }
  };

  const signIn = async (email, password) => {
    try {
      setError(null);
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError(error?.message);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        return { data: null, error: { message: error?.message } };
      }
      setError('Something went wrong. Please try again.');
      console.error('Signin error:', error);
      return { data: null, error: { message: 'Signin failed' } };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase?.auth?.signOut();
      
      if (error) {
        setError(error?.message);
        return { error };
      }

      setUser(null);
      setUserProfile(null);
      return { error: null };
    } catch (error) {
      setError('Something went wrong during sign out.');
      console.error('Signout error:', error);
      return { error: { message: 'Signout failed' } };
    }
  };

  const updateProfile = async (updates) => {
    try {
      setError(null);
      
      if (!user?.id) {
        throw new Error('No user found');
      }

      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', user?.id)?.select()?.single();

      if (error) {
        setError(error?.message);
        return { data: null, error };
      }

      setUserProfile(data);
      return { data, error: null };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        setError('Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.');
        return { data: null, error: { message: error?.message } };
      }
      setError('Failed to update profile');
      console.error('Profile update error:', error);
      return { data: null, error: { message: 'Profile update failed' } };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};