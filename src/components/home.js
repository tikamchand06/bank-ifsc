import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Select, Input, Table, Alert } from 'antd';
import bank from '../bank';

const Home = ({ match: { params } }) => {
  const { Title, Paragraph } = Typography;
  const { Search } = Input;

  const [state, setState] = useState({ banks: null, branches: null, bankName: params.bankName, alertMsg: null });
  const { banks, branches, bankName, alertMsg } = state;

  const getBankNames = async () => {
    try {
      const result = await bank.get(`/listbanks`);
      setState({ ...state, banks: result.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const searchBank = async branchName => {
    if (!branchName) return;

    try {
      const result = await bank.post(`/bank/search/likeBranchName`, { bankName, branchName });
      setState({ ...state, branches: result.data.data, alertMsg: result.data.message });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { title: 'BRANCH', dataIndex: 'BRANCH' },
    { title: 'IFSC', dataIndex: 'IFSC' },
    { title: 'ADDRESS', dataIndex: 'ADDRESS' },
    {
      title: 'View',
      render: record => (
        <Link key={record._id} to={`/ifsc/${record.IFSC}`}>
          View
        </Link>
      )
    }
  ];

  // Get Inital Data
  useEffect(() => {
    getBankNames();
  }, []);

  return (
    <Layout.Content>
      <Title level={3} className="text-center">
        Search IFSC Code of any Bank
      </Title>
      <Paragraph className="p-2">
        <Select
          className="w-100 mb-2"
          placeholder="Select Bank Name"
          loading={!banks}
          disabled={!banks}
          showSearch
          onChange={bankName => setState({ ...state, bankName })}
          defaultValue={bankName}
        >
          {banks &&
            banks.map((bank, key) => (
              <Select.Option key={key} value={bank}>
                {bank}
              </Select.Option>
            ))}
        </Select>

        <Search placeholder="Enter Branch Name" onSearch={value => searchBank(value)} enterButton className="mb-2" />

        {alertMsg && <Alert message={alertMsg} type="success" showIcon />}

        {branches && <Table columns={columns} dataSource={branches} rowKey={record => record._id} ellipsis bordered />}
      </Paragraph>
    </Layout.Content>
  );
};

export default Home;
