import { AppProvider } from "@shopify/polaris";
import Link from 'next/link'
import translations from "@shopify/polaris/locales/en.json";

const CustomLinkComponent = ({
  as,
  children,
  url,
  external,
  role,
  ...rest
}) => {
  if (external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={url}>
      <button {...rest}>{children}</button>
    </Link>
  );
};

export default function PolarisProvider({children}) {
  return <AppProvider i18n={translations} linkComponent={CustomLinkComponent}>{children}</AppProvider>
}