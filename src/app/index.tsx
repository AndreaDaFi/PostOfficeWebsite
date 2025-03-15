import { Link } from "umi"
import { Button, Card, Input, Tabs, Layout, Typography, Row, Col, Space, Divider } from "antd"
import {
  MailOutlined,
  HomeOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  CarOutlined,
} from "@ant-design/icons"

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

export default function PostOfficeHome() {
  return (
    <Layout className="layout">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 50px",
        }}
      >
        <Row justify="space-between" align="middle" style={{ height: "100%" }}>
          <Col>
            <Space>
              <MailOutlined style={{ fontSize: "24px", color: "#dc2626" }} />
              <Typography.Title level={4} style={{ margin: 0, color: "#dc2626" }}>
                PostalService
              </Typography.Title>
            </Space>
          </Col>
          <Col className="menu-links" style={{ display: "flex", gap: "24px" }}>
            <Link to="/" style={{ color: "rgba(0, 0, 0, 0.88)", fontSize: "14px" }}>
              Send
            </Link>
            <Link to="/" style={{ color: "rgba(0, 0, 0, 0.88)", fontSize: "14px" }}>
              Receive
            </Link>
            <Link to="/" style={{ color: "rgba(0, 0, 0, 0.88)", fontSize: "14px" }}>
              Track
            </Link>
            <Link to="/" style={{ color: "rgba(0, 0, 0, 0.88)", fontSize: "14px" }}>
              Locations
            </Link>
            <Link to="/" style={{ color: "rgba(0, 0, 0, 0.88)", fontSize: "14px" }}>
              Services
            </Link>
          </Col>
          <Col>
            <Space>
              <Button type="default">Sign In</Button>
              <Button type="primary" style={{ background: "#dc2626", borderColor: "#dc2626" }}>
                Register
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content>
        {/* Hero Section */}
        <div style={{ background: "#dc2626", padding: "64px 50px" }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={1} style={{ color: "white", marginBottom: "16px" }}>
                Your Reliable Postal Service Partner
              </Title>
              <Paragraph style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "18px", marginBottom: "24px" }}>
                Fast, secure, and reliable postal services for all your shipping needs. Track packages, find locations,
                and more.
              </Paragraph>
              <Space>
                <Button size="large" style={{ background: "white", color: "#dc2626", borderColor: "white" }}>
                  Get Started
                </Button>
                <Button size="large" ghost style={{ color: "white", borderColor: "white" }}>
                  Learn More
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={12} style={{ textAlign: "center" }}>
              <img
                src="https://via.placeholder.com/400"
                alt="Post Office Services"
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            </Col>
          </Row>
        </div>

        {/* Services Section */}
        <div style={{ padding: "64px 50px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Title level={2}>Our Services</Title>
            <Paragraph style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
              Everything you need for your postal and shipping requirements
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card hoverable style={{ borderColor: "#fee2e2", height: "100%" }}>
                <InboxOutlined style={{ fontSize: "48px", color: "#dc2626", marginBottom: "16px" }} />
                <Title level={4}>Package Shipping</Title>
                <Paragraph style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                  Send packages domestically and internationally with our reliable shipping services.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable style={{ borderColor: "#fee2e2", height: "100%" }}>
                <MailOutlined style={{ fontSize: "48px", color: "#dc2626", marginBottom: "16px" }} />
                <Title level={4}>Mail Services</Title>
                <Paragraph style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                  From letters to postcards, we offer a variety of mail services to meet your needs.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable style={{ borderColor: "#fee2e2", height: "100%" }}>
                <EnvironmentOutlined style={{ fontSize: "48px", color: "#dc2626", marginBottom: "16px" }} />
                <Title level={4}>Post Office Locations</Title>
                <Paragraph style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                  Find the nearest post office location with our easy-to-use locator tool.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Track Package Section */}
        <div style={{ padding: "64px 50px", background: "#f5f5f5" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Title level={2}>Track Your Package</Title>
            <Paragraph style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
              Enter your tracking number to get real-time updates on your package's location and delivery status.
            </Paragraph>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Tabs defaultActiveKey="track" centered>
              <TabPane tab="Track Package" key="track">
                <Card>
                  <Space.Compact style={{ width: "100%" }}>
                    <Input placeholder="Enter tracking number" />
                    <Button type="primary" style={{ background: "#dc2626", borderColor: "#dc2626" }}>
                      <SearchOutlined /> Track
                    </Button>
                  </Space.Compact>
                </Card>
              </TabPane>
              <TabPane tab="Shipping Estimate" key="estimate">
                <Card>
                  <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Input placeholder="From ZIP code" />
                      </Col>
                      <Col span={12}>
                        <Input placeholder="To ZIP code" />
                      </Col>
                    </Row>
                    <Space.Compact style={{ width: "100%" }}>
                      <Input placeholder="Package weight (lbs)" />
                      <Button type="primary" style={{ background: "#dc2626", borderColor: "#dc2626" }}>
                        <CarOutlined /> Calculate
                      </Button>
                    </Space.Compact>
                  </Space>
                </Card>
              </TabPane>
            </Tabs>
          </div>
        </div>

        {/* Find Location Section */}
        <div style={{ padding: "64px 50px" }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2}>Find Your Nearest Post Office</Title>
              <Paragraph style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: "18px", marginBottom: "24px" }}>
                With thousands of locations nationwide, there's always a post office near you. Use our locator to find
                the closest one.
              </Paragraph>
              <Space.Compact style={{ width: "100%", maxWidth: "400px" }}>
                <Input placeholder="Enter ZIP code" />
                <Button type="primary" style={{ background: "#dc2626", borderColor: "#dc2626" }}>
                  <EnvironmentOutlined /> Find
                </Button>
              </Space.Compact>
            </Col>
            <Col xs={24} lg={12} style={{ textAlign: "center" }}>
              <img
                src="https://via.placeholder.com/500x300"
                alt="Post Office Map"
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            </Col>
          </Row>
        </div>
      </Content>

      <Footer style={{ background: "#f5f5f5", padding: "48px 50px" }}>
        <Row gutter={[48, 48]}>
          <Col xs={24} lg={6}>
            <Space>
              <MailOutlined style={{ fontSize: "24px", color: "#dc2626" }} />
              <Typography.Title level={4} style={{ margin: 0, color: "#dc2626" }}>
                PostalService
              </Typography.Title>
            </Space>
            <Paragraph style={{ color: "rgba(0, 0, 0, 0.45)", marginTop: "16px" }}>
              Your reliable postal service partner for all your shipping and mailing needs.
            </Paragraph>
          </Col>
          <Col xs={24} sm={8} lg={6}>
            <Title level={5}>Quick Links</Title>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">Track Package</Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">Find Locations</Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">Shipping Rates</Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">Schedule Pickup</Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={8} lg={6}>
            <Title level={5}>Services</Title>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">Domestic Shipping</Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">International Shipping</Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">Mail Services</Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link to="/">Business Solutions</Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={8} lg={6}>
            <Title level={5}>Contact Us</Title>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                <HomeOutlined style={{ marginRight: "8px" }} /> 123 Postal Ave, City, State 12345
              </li>
              <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                <MailOutlined style={{ marginRight: "8px" }} /> support@postalservice.com
              </li>
              <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                <ClockCircleOutlined style={{ marginRight: "8px" }} /> Mon-Fri: 8AM-6PM, Sat: 9AM-1PM
              </li>
            </ul>
          </Col>
        </Row>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <Text type="secondary">© {new Date().getFullYear()} PostalService. All rights reserved.</Text>
        </div>
      </Footer>
    </Layout>
  )
}

