import React from 'react';
import { Layout, Typography } from 'antd';

const NotFound = () => {
  const { Title, Paragraph } = Typography;

  return (
    <Layout.Content>
      <Title level={3} className="text-center">
        404 not Fount
      </Title>
      <Paragraph className="p-2">The data you're lookig for doesn't found.</Paragraph>
    </Layout.Content>
  );
};

export default NotFound;
