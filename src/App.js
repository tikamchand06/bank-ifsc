import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Affix, Typography, Avatar, Row, Col, Icon, Button, Card } from 'antd';
import Home from './components/home';
import Banks from './components/banks';
import SearchByIfsc from './components/byIfsc';
import NotFound from './components/notFound';

import ifscLogo from './images/ifsc.png';
import currencyConverter from './images/currency-converter.png';
import tcmhack from './images/tcmhack.png';
import youtubeClone from './images/youtube-clone.png';
import bookmarkManagement from './images/bookmark-management.png';
import ytAutoSkip from './images/auto-skip.png';

const App = () => {
  const { Header, Footer, Content } = Layout;
  const { Paragraph, Title, Text } = Typography;

  const projects = [
    { title: 'TCMHACK', desc: 'Web Development Blog & Tutorials.', image: tcmhack, href: 'http://tcmhack.in' },
    {
      title: 'Currency Converter',
      desc: 'Converts the currecnies from one to another.',
      image: currencyConverter,
      href: 'https://chrome.google.com/webstore/detail/djijpkidiloakhgopmijjdcancpfekma'
    },
    {
      title: 'YouTube Auto Skip',
      desc: 'Automatically skip ads from videos on Youtube.',
      image: ytAutoSkip,
      href: 'https://chrome.google.com/webstore/detail/gngacemkofalidlfggfppjnhlfkidcda'
    },
    {
      title: 'Bookmark Management',
      desc: 'Simple extension to manage all of your bookmarks.',
      image: bookmarkManagement,
      href: 'https://chrome.google.com/webstore/detail/djdlkoihbhgbjfabpgpclknhjoalmkjk'
    },
    {
      title: 'Youtube Clone',
      desc: 'YouTube Clone with video download feature.',
      image: youtubeClone,
      href: 'https://tcmytclone.web.app'
    }
  ];

  return (
    <Router>
      <Layout>
        <Affix offsetTop>
          <Header className="navbar">
            <Link to="/">
              <Text strong style={{ textShadow: '0px 2px 2px rgba(0, 0, 0, 0.9)', fontSize: '1.2rem' }}>
                BANK IFSC CODES
              </Text>
            </Link>
            <div className="right-navs">
              <Link className="ant-btn ant-btn-link" to="/">
                <Icon type="home" /> Home
              </Link>
              <Link className="ant-btn ant-btn-link" to="/banks">
                <Icon type="bank" /> List of Banks
              </Link>
              <Link className="ant-btn ant-btn-link" to="/ifsc">
                <Icon type="search" /> Search By IFSC
              </Link>
              <Button type="link" icon="info-circle" href="http://tcmhack.in/about-us/" target="_blank">
                About Us
              </Button>
              <Button type="link" icon="mail" href="http://tcmhack.in/contact-us/" target="_blank">
                Contact Us
              </Button>
            </div>
          </Header>
        </Affix>
        <Content>
          <Row>
            <Col span={6}>
              <Typography>
                <Avatar shape="square" size="large" src={ifscLogo} className="mb-2" />
                <Paragraph>
                  <Text strong>IFSC</Text> is an acronym for Indian Financial System Code. IFSC code is a unique eleven-digit number
                  which is a combination of alphabets and numerals.
                </Paragraph>
                <Paragraph>
                  It is used to transfer funds online for NEFT, IMPS and RTGS transactions. Usually, the IFSC code can be found on the
                  cheque-book provided by the bank.
                </Paragraph>
              </Typography>
            </Col>

            <Col span={12}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/banks" component={Banks} />
                <Route exact path="/ifsc" component={SearchByIfsc} />
                <Route exact path="/ifsc/:ifsc" component={SearchByIfsc} />
                <Route exact path="/:bankName" component={Home} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Col>

            <Col span={6}>
              <Title level={4}>Our Other Projects</Title>
              {projects.map((project, key) => (
                <Card className="mb-1 project-card" key={key}>
                  <Avatar src={project.image} size={64} />
                  <Typography>
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      <Text strong>{project.title}</Text>
                    </a>
                    <Text>{project.desc}</Text>
                  </Typography>
                </Card>
              ))}
            </Col>
          </Row>
        </Content>
        <Footer>
          <Paragraph>
            <Text strong>Disclaimer:-</Text> We have tried our best to keep the latest information updated as available from RBI, users
            are requested to confirm information with the respective bank before using the information provided. The author reserves
            the right not to be responsible for the topicality, correctness, completeness or quality of the information provided.
            Liability claims regarding damage caused by the use of any information provided, including any kind of information which is
            incomplete or incorrect, will therefore be rejected.
          </Paragraph>
          <Paragraph>
            <Text strong>
              All details has been taken from the{' '}
              <a href="https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=2009" target="_blank" rel="noopener noreferrer">
                RBI's website.
              </a>{' '}
              Last updated on: 20th Oct 2019.
            </Text>
          </Paragraph>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
