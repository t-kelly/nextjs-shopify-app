import { Heading, Page } from "@shopify/polaris";
import Link from 'next/link'

export default function Page1() {
  return (
      <Page>
        <Heading>Another Embedded Page</Heading>
        <p>You should arrive on this page via NextJS's client side routing. The NextJS router is also integrated with App Bridge, so you should be able to use the browser's forward and back buttons to navigate through your page history.</p>
        <Link href={`/embedded`}><a>Go back the embedded home page</a></Link>
      </Page>
  )
};