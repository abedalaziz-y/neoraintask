import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Spin, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { GETALLACTIVITY } from '../../../functions/auth';
import { useSelector } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const { Option } = Select;

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activityTypeFilter, setActivityTypeFilter] = useState(null);
  const [emailFilter, setEmailFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [mostActiveUser, setMostActiveUser] = useState(null);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    const socket = io('https://user-analytics-system-825467496328.us-central1.run.app'); 

    socket.on('newActivityrecord', (activity) => {
      setActivities((prevActivities) => {
        const updatedActivities = [...prevActivities, activity];
        setFilteredActivities(updatedActivities);
        toast.success(`New activity recorded: ${activity.activity}`);
        return updatedActivities;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await GETALLACTIVITY(user.token);
        if (response && response.data) {
          const formattedActivities = response.data.map((item) => {
            const action = item.action;
            let activity = '';
            let email = '';
            let timestamp = '';

            if (typeof action === 'string') {
              activity = action;
            } else if (typeof action === 'object') {
              activity = action.activity || 'Unknown Activity';
              email = action.email || '';
              timestamp = action.timestamp || '';
            }

            return {
              id: item.id,
              activity,
              email,
              timestamp,
            };
          });

          setActivities(formattedActivities);
          setFilteredActivities(formattedActivities);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user.token]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterActivities(e.target.value, activityTypeFilter, emailFilter, dateFilter, mostActiveUser);
  };

  const handleActivityFilterChange = (value) => {
    setActivityTypeFilter(value);
    filterActivities(searchText, value, emailFilter, dateFilter, mostActiveUser);
  };

  const handleEmailFilterChange = (e) => {
    const value = e.target.value;
    setEmailFilter(value);
    filterActivities(searchText, activityTypeFilter, value, dateFilter, mostActiveUser);
  };

  const handleDateFilterChange = (date, dateString) => {
    setDateFilter(dateString);
    filterActivities(searchText, activityTypeFilter, emailFilter, dateString, mostActiveUser);
  };

  const handleMostActiveUserFilter = () => {
    const activityCounts = activities.reduce((counts, activity) => {
      counts[activity.email] = (counts[activity.email] || 0) + 1;
      return counts;
    }, {});
    const mostActive = Object.entries(activityCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    setMostActiveUser(mostActive);
    filterActivities(searchText, activityTypeFilter, emailFilter, dateFilter, mostActive);
  };

  const handleResetFilters = () => {
    setActivityTypeFilter(null);
    setEmailFilter('');
    setDateFilter(null);
    setSearchText('');
    setMostActiveUser(null);
    setFilteredActivities(activities);
  };

  const filterActivities = (search = '', activityType = null, email = '', date = null, mostActive = null) => {
    let filtered = activities.filter((activity) => {
      return (
        activity.activity.toLowerCase().includes(search.toLowerCase()) &&
        (activityType ? activity.activity.includes(activityType) : true) &&
        (email ? activity.email.includes(email) : true) &&
        (date ? moment(activity.timestamp).isSame(date, 'day') : true) &&
        (mostActive ? activity.email === mostActive : true)
      );
    });
    setFilteredActivities(filtered);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          autoFocus
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
              handleSearch({ target: { value: selectedKeys[0] } });
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && clearFilters();
              handleResetFilters();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  });

  const uniqueActivities = [...new Set(activities.map((item) => item.activity))]; // Get unique activities

  const columns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      ...getColumnSearchProps('activity'),
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <Select
            placeholder="Filter by Activity"
            style={{ width: 200 }}
            onChange={handleActivityFilterChange}
            value={activityTypeFilter}
          >
            {uniqueActivities.map((activity, index) => (
              <Option key={index} value={activity}>
                {activity}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Filter by Email"
            value={emailFilter}
            onChange={handleEmailFilterChange}
          />
        </div>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => new Date(timestamp).toLocaleString(),
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <DatePicker onChange={handleDateFilterChange} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center text-danger">User Activities</h1>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handleMostActiveUserFilter} type="primary">
          Most Active User
        </Button>
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </Space>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredActivities}
          rowKey="id"
          pagination={false}
        />
      )}
    </div>
  );
};

export default ActivityPage;
