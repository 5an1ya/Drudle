//Higher-Order Component which ensures only authenticated users can access wrapped components

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from './authCheck';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        if (!authenticated) { // If user is not authenticated, send to landing page
          router.replace('/landing');
        } else {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;