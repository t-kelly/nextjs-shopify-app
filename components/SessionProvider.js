
import { useEffect } from 'react';
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function SessionProvider({children}) {
  const app = useAppBridge();
  
  useEffect(async () => {
    const session = await getSessionToken(app);
    
    if (!session) {
      window.location.pathname = `/auth`;
    }
  }, []);
  
  return <>{children}</>;
}

