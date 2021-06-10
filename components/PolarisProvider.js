import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

export default function PolarisProvider({children}) {
  return <AppProvider i18n={translations}>{children}</AppProvider>
}