import { Heading, Page } from "@shopify/polaris";
import Link from 'next/link'

export default function Index() {
  return (
      <Page>
        <Heading>Shopify app with Node and React 🎉</Heading>
        <Link href={`/embedded/page1`}><a>Go to another page</a></Link>
      </Page>
  )
};