import { Layout,
  Page,
  FooterHelp,
  Link,
  MediaCard } from "@shopify/polaris";
import {} from '@shopify/polaris'

export default function Index() {
  const primaryAction = {content: 'Settings', url: '/embedded/settings'};

  return (
    <Page
      title="NextJS Shopify App"
      primaryAction={primaryAction}
    >
      <Layout>
        <Layout.Section>
          <MediaCard
            title="Welcome to the Shopify NextJS App!"
            primaryAction={{
              content: 'Learn about getting started',
              url: 'https://shopify.dev/concepts/apps',
              external: true
            }}
            description="It looks like things are setup correctly and you should be able to start developing."
            popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
            />
          </MediaCard>
        </Layout.Section>

        <Layout.Section>
          <FooterHelp>
            For more details on Polaris, visit our{' '}
            <Link url="https://polaris.shopify.com" external={true}>style guide</Link>.
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
};