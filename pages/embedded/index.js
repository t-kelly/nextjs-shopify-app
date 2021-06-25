import { Layout,
  Page,
  FooterHelp,
  Link,
  MediaCard,
  Card,
  ResourceList,
  Thumbnail,
  ResourceItem,
  TextStyle,
  TextContainer,
  Heading,
} from "@shopify/polaris";
import {} from '@shopify/polaris'
import { useEffect, useState } from "react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function Index() {
  const primaryAction = {content: 'Settings', url: '/embedded/settings'};
  const [products, setProducts] = useState([]);
  const app = useAppBridge();

  useEffect(async () => {
    const response = await authenticatedFetch(app)('/api/products');
    const {body} = await response.json();
    setProducts(body.products);
  }, [])

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
              src="https://burst.shopifycdn.com/photos/coding-on-laptop.jpg?width=1850"
            />
          </MediaCard>
        </Layout.Section>

        <Layout.Section>
          <TextContainer>
            <Heading>A Simple Products List</Heading>
            <p>
              This list of products is generated with a request made to the Shopify GraphQL API!
            </p>
          </TextContainer>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <ResourceList
              title="List of Products"
              resourceName={{singular: 'product', plural: 'products'}}
              items={products}
              renderItem={(item) => {
                const {id, onlineStoreUrl, title, featuredImage, vendor} = item;
                const media = <Thumbnail source={featuredImage ? featuredImage.src : ''} alt={featuredImage ? featuredImage.alt : ''} />;

                return (
                  <ResourceItem
                    id={id}
                    url={onlineStoreUrl}
                    media={media}
                    accessibilityLabel={`View details for ${title}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                    <div>{vendor}</div>
                  </ResourceItem>
                );
              }}
            />
          </Card>
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
