import { Heading, Page } from "@shopify/polaris";

export async function getServerSideProps({query}) {
  if(!query.host) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    }
  } else {
    return {
      props: {}
    }
  }
}

export default function Index() {
  return (
    <Page>
      <Heading>Shopify app with Node and React 🎉</Heading>
    </Page>
  )
};