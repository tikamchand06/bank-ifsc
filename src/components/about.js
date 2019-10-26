import React from 'react';
import { Layout, Typography } from 'antd';

const About = () => {
  const { Title, Paragraph } = Typography;

  return (
    <Layout.Content>
      <Title level={3} className="text-center">
        About US
      </Title>
      <Paragraph className="p-2">Aboutus</Paragraph>
    </Layout.Content>
  );
};

export default About;
