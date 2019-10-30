import React, { useState } from 'react';
import { Layout, Typography, List } from 'antd';
import bank from '../bank';

import sitemap from '../sitemap/sitemap.txt';
import sitemap1 from '../sitemap/sitemap_1.txt';
import sitemap2 from '../sitemap/sitemap_2.txt';

const Sitemap = () => {
  const { Title, Paragraph } = Typography;

  const list = [
    { title: 'General + Bank Names', href: sitemap },
    { title: 'IFSC List 1', href: sitemap1 },
    { title: 'IFSC List 2', href: sitemap2 }
  ];

  const [data, updateData] = useState([
    { key: 'general', title: 'General + List of Banks', href: null },
    { key: 'ifsc', title: 'IFSC', href: null }
  ]);

  const generateSitemap = async key => {
    let baseUrl = 'https://bank-ifsc.tcmhack.in/';
    let sitemapArray = [];
    const result = await bank.get(`/listbanks`);
    const banks = result.data.data;

    if (key === 'general') {
      const dataArray = ['banks', 'ifsc', ...banks];
      sitemapArray = dataArray.map(link => baseUrl + link);
      sitemapArray.unshift(baseUrl);
    } else {
      const dataArray = [];
      for (let i = 60; i < 70; i++) {
        const bankName = banks[i];
        const result2 = await bank.get(`/listbranches/${bankName}`);
        console.log('Bank', i, result2, bankName);
        if (result2.status === 200 && result2.data.data && result2.data.data.length > 0) {
          for (let branchName of result2.data.data) {
            try {
              const result3 = await bank.get(`/getbank/${bankName}/${branchName}`);
              console.log('Branch', i, result3, bankName, '==>', branchName);
              if (result3.status === 200 && result3.data.data) dataArray.push(result3.data.data.IFSC);
            } catch (error) {
              console.log(error);
            }
          }
        }
        console.log(result2);
      }

      sitemapArray = dataArray.map(ifsCode => baseUrl + 'ifsc/' + ifsCode);
    }

    var textFile = new Blob([sitemapArray.join('\n')], { type: 'text/plain' });

    const d = data.find(item => item.key === key);
    d.href = window.URL.createObjectURL(textFile);
    updateData([...data]);
    console.log(sitemapArray, data);
  };

  console.log([...data]);

  return (
    <Layout.Content>
      <Title level={3} className="text-center">
        Generate Sitemaps
      </Title>
      <Paragraph className="p-2">
        <List
          dataSource={data}
          header="Generate Sitemaps"
          renderItem={item => (
            <List.Item
              actions={[
                <a key="generate" onClick={() => generateSitemap(item.key)} className="pr-2">
                  Generate
                </a>,
                <a key="download" href={item.href} download="sitemap.txt" disabled={!item.href} className="pr-2">
                  Download
                </a>
              ]}
            >
              {item.title}
            </List.Item>
          )}
          bordered
          className="sitemap-list mb-2"
        />

        <List
          dataSource={list}
          header="Available Sitemaps"
          renderItem={item => (
            <List.Item
              actions={[
                <a key="download" href={item.href} download={item.title} className="pr-2">
                  Download
                </a>
              ]}
            >
              {item.title}
            </List.Item>
          )}
          bordered
          className="sitemap-list"
        />
      </Paragraph>
    </Layout.Content>
  );
};

export default Sitemap;
