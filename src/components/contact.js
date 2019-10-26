import React from 'react';
import { Layout, Typography } from 'antd';

const Contact = () => {
  const { Title, Paragraph } = Typography;

  return (
    <Layout.Content>
      <Title level={3} className="text-center">
        Contact US
      </Title>
      <Paragraph className="p-2">Contact us</Paragraph>
    </Layout.Content>
  );
};

export default Contact;
