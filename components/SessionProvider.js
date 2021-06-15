
import { useEffect } from 'react';
import Router from "next/router"
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function SessionProvider({children}) {
  const app = useAppBridge();
  
  useEffect(async () => {
    const session = await getSessionToken(app);
    
    if (app && !session) {
      const params = (new URL(document.location)).searchParams;
      Router.push('/api/login?shop=' + params.get('shop'));
    }
  }, []);
  
  return <>{children}</>;
}

