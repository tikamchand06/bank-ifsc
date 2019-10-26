import React, { useState, useEffect } from 'react';
import { Layout, Typography, Icon, List, Input, Alert } from 'antd';
import bank from '../bank';

const SearchByIfsc = ({ match: { params } }) => {
  const ifscCode = params.ifsc;
  const { Title, Paragraph, Text } = Typography;
  const { Search } = Input;

  const [state, setState] = useState({ bankDetail: null, isLoading: false, errorMsg: null });
  const { bankDetail, isLoading, errorMsg } = state;

  const getBank = async ifscCode => {
    try {
      setState({ ...state, isLoading: true });
      const result = await bank.get(`/v1/ifsc/${ifscCode}`);
      if (result.data.data) setState({ ...state, bankDetail: result.data.data, isLoading: false });
      else setState({ ...state, isLoading: false, errorMsg: 'No Bank found with this IFSC code.' });
    } catch (error) {
      console.log(error);
    }
  };

  // Get Inital Data
  useEffect(() => {
    if (ifscCode) getBank(ifscCode);
  }, [ifscCode]);

  return (
    <Layout.Content>
      <Title level={3} className="text-center">
        Get Bank Details via IFSC Code
      </Title>
      <Paragraph className="p-2">
        {errorMsg && <Alert message={errorMsg} type="error" showIcon closable className="mb-2" />}

        {!ifscCode && (
          <Search
            placeholder="Enter IFSC Code here..."
            enterButton="Search"
            size="large"
            onSearch={value => getBank(value)}
            className="mb-2"
          />
        )}

        {bankDetail && (
          <List bordered header={<Text strong>{bankDetail.BANK}</Text>}>
            {Object.keys(bankDetail).map(
              key =>
                key !== '_id' && (
                  <List.Item className="m-auto bank-data d-flex" key={key}>
                    <Text strong>{key}:</Text>
                    <Text>{bankDetail[key]}</Text>
                  </List.Item>
                )
            )}
          </List>
        )}

        {isLoading && <Icon type="loading" />}
      </Paragraph>
    </Layout.Content>
  );
};

export default SearchByIfsc;
