import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Table } from 'antd';
import bank from '../bank';

const Banks = () => {
  const { Title, Paragraph } = Typography;

  const [banks, updateBanks] = useState(null);

  const getBankNames = async () => {
    try {
      const result = await bank.get(`/listbanks`);
      updateBanks(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Inital Data
  useEffect(() => {
    getBankNames();
  }, []);

  return (
    <Layout.Content>
      <Title level={3} className="text-center">
        List of Supported Banks in India
      </Title>
      <Paragraph className="p-2">
        <Table
          columns={[{ title: 'BANK NAME', render: bankName => <Link to={`/${bankName}`}>{bankName}</Link> }]}
          dataSource={banks}
          rowKey={(record, key) => key}
          ellipsis
          bordered
          loading={!banks}
          size="small"
        />
      </Paragraph>
    </Layout.Content>
  );
};

export default Banks;
