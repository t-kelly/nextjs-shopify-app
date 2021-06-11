import { Heading, Page } from "@shopify/polaris";
import EmbeddedApp from "@components/EmbeddedApp";

export async function getServerSideProps({query}) {
  const {host} = query;
  if(!host) {
    return {
      redirect: {
        destination: '/api/auth/shopify/login',
        permanent: false,
      },
    }
  } else {
    return {
      props: {host}
    }
  }
}

export default function Index({host}) {
  return (
    <EmbeddedApp {...{host}}>
      <Page>
        <Heading>Shopify app with Node and React 🎉</Heading>
      </Page>
    </EmbeddedApp>
  )
};