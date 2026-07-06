import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, List } from 'antd';

import type { User } from '../model/types';

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card style={{ width: 280 }}>
      <Card.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={user.name}
        description={`ID: ${user.id}`}
      />
      <List style={{ marginTop: 16 }}>
        <List.Item>
          <MailOutlined style={{ marginRight: 8 }} />
          {user.email}
        </List.Item>
      </List>
    </Card>
  );
};
