import React from 'react';

import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="sepans.com" />
    <Title>Sepand Ansari</Title>
    <Links>
      <Link target="_blank" href="https://purplebulldozer.com">
        work
      </Link>
      <Link
        target="_blank"
        href="https://www.goodreads.com/user/show/22717-sepand"
      >
        books
      </Link>
      <Link href="content/diy">diy (under construction)</Link>
      <Link target="_blank" href="https://github.com/sepans/">
        code
      </Link>
      <Link target="_blank" href="https://www.strava.com/athletes/14784454">
        rides
      </Link>
      <Link target="_blank" href="https://www.linkedin.com/in/sepans/">
        jobs
      </Link>
    </Links>
  </Layout>
);

const Links = styled.div`
  font-family: Inter;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const Link = styled.a`
  color: #333;
  display: inline-block;
  &:visited {
    color: #353535;
  }
  &:hover {
    color: #000;
  }
  padding-bottom: 20px;

  @media (min-width: 768px) {
    padding-bottom: 10px;
  }
`;

const Title = styled.h1`
  font-family: Inter;
  font-size: 24px;
  color: black;
`;

// const Description = styled.p`
//   font-family: Inter;
//   font-size: 24px;
//   font-weight: 400;
//   line-height: 1.4em;
//   color: black;
//   margin-top: 40px;
// `;

// const Footnote = styled.p`
//   font-family: Inter;
//   font-size:16px;
//   padding: 10px 0;
//   line-height:1.6em;
//   color:black;
// `;

// const FootnoteArea = styled.div`
//   margin-top: 30vh;
//   /*overflow-y: scroll;
//   max-height: 600px;*/
// `;

// const FootnoteLink = styled.a`
// color:black;
// &:visited {
//   color:black;
// }
// &:hover {
//   color:red;
//   cursor: s-resize;
// }

// `;

export default IndexPage;
