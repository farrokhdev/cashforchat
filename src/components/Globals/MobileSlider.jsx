import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { Drawer } from "react";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  DropboxOutlined,
  TransactionOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

export const MobileSlider = () => {
  return (
    <Drawer>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>

        <Menu
          theme="dark"
          mode="inline"

          // defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            className={
              location?.pathname === "/" ? "ant-menu-item-selected" : ""
            }
            key="1"
            icon={<DashboardOutlined />}
          >
            <Link to="/">داشبرد</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/users" ? "ant-menu-item-selected" : ""
            }
            key="2"
            icon={<UsergroupAddOutlined />}
          >
            <Link to="/users">مدیریت کاربران</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/user-categories"
                ? "ant-menu-item-selected"
                : ""
            }
            key="3"
            icon={<DropboxOutlined />}
          >
            <Link to="/user-categories">دسته بندی کاربران</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/payments" ? "ant-menu-item-selected" : ""
            }
            key="4"
            icon={<TransactionOutlined />}
          >
            <Link to="/payments">تراکنش ها</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/user-calls"
                ? "ant-menu-item-selected"
                : ""
            }
            key="5"
            icon={<PhoneOutlined />}
          >
            <Link to="/user-calls">تماس های کاربران</Link>
          </Menu.Item>
          {/* <Menu.Item key="6" icon={<PhoneOutlined />}>
            <Link to="/settlement-requests">درخواست تسویه</Link>
          </Menu.Item> */}
          <Menu.Item
            className={
              location?.pathname === "/admins" ? "ant-menu-item-selected" : ""
            }
            key="7"
            icon={<UsergroupAddOutlined />}
          >
            <Link to="/admins">مدیران</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Drawer>
  );
};
