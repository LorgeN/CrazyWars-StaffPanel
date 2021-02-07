import React, { FunctionComponent } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import logo from "../../static/logo.png";
import "./index.css";
import { House } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

export type SidebarItemProps = {
  href: string;
  selected?: boolean;
};

export const SidebarItem: FunctionComponent<SidebarItemProps> = (props) => {
  const history = useHistory();

  const onClick = () => {
    if (props.selected) {
      return;
    }

    history.push(props.href);
  };

  return (
    <Nav.Item>
      <Nav.Link
        className={props.selected ? "sidebar-item-selected" : "sidebar-item"}
        onSelect={onClick}
      >
        {props.children}
      </Nav.Link>
    </Nav.Item>
  );
};

export const Sidebar: FunctionComponent = (props) => {
  return (
    <Nav
      className="d-none d-md-block sidebar"
      defaultActiveKey="/"
      onSelect={(selectedKey) => console.log(`selected ${selectedKey}`)}
    >
      <div className="sidebar-sticky"></div>
      <Image id="sidebar-logo" src={logo} />

      <SidebarItem href="/" selected>
        <House className="sidebar-icon" size={24} />
        <b>Home</b>
      </SidebarItem>
    </Nav>
  );
};

export type DashboardProps = {
  children: React.ReactNode;
};

export const Dashboard: FunctionComponent<DashboardProps> = ({
  children,
}: DashboardProps) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          {children}
        </Col>
      </Row>
    </Container>
  );
};
