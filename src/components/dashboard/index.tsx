import React, { FunctionComponent } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import logo from "../../static/logo.png";
import "./index.css";
import { House, People, Book } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { LogOutButton } from "../logout";
import { CenteredRow } from "../styled";
import { CopyrightNotice } from "../copyright";

export type SidebarItemProps = {
  href: string;
};

export const SidebarItem: FunctionComponent<SidebarItemProps> = (props) => {
  const location = useLocation();

  const selected = props.href === location.pathname;

  return (
    <Nav.Item>
      <Nav.Link
        className={selected ? "sidebar-item-selected" : "sidebar-item"}
        href={selected ? undefined : props.href}
      >
        {props.children}
      </Nav.Link>
    </Nav.Item>
  );
};

export const Sidebar: FunctionComponent = (props) => {
  return (
    <Nav className="d-none d-md-block sidebar" defaultActiveKey="/">
      <div className="sidebar-sticky"></div>
      <Image id="sidebar-logo" src={logo} />

      <SidebarItem href="/">
        <House className="sidebar-icon" size={24} />
        <b>Home</b>
      </SidebarItem>

      <SidebarItem href="/players">
        <People className="sidebar-icon" size={24} />
        <b>Players</b>
      </SidebarItem>

      <SidebarItem href="/punishments">
        <Book className="sidebar-icon" size={24} />
        <b>Punishments</b>
      </SidebarItem>

      <div id="sidebar-footer">
        <CenteredRow>
          <LogOutButton />
        </CenteredRow>

        <CenteredRow>
          <CopyrightNotice />
        </CenteredRow>
      </div>
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
    <Container id="page-container" fluid>
      <Row xs={12}>
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
