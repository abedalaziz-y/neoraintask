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
    const socket = io('http://localhost:5000'); 

    socket.on('newActivityrecord', (activity) => {
      setActivities((prevActivities) => {
        const updatedActivities = [...prevActivities, activity];
        setFilteredActivities(updatedActivities);
        calculateMostActiveUser(updatedActivities);
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
          calculateMostActiveUser(formattedActivities);
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

  const calculateMostActiveUser = (activities) => {
    const activityCount = activities.reduce((acc, activity) => {
      acc[activity.email] = (acc[activity.email] || 0) + 1;
      return acc;
    }, {});

    const mostActive = Object.entries(activityCount).reduce((max, [email, count]) => {
      return count > max.count ? { email, count } : max;
    }, { email: null, count: 0 });

    setMostActiveUser(mostActive.email);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterActivities(e.target.value, activityTypeFilter, emailFilter, dateFilter);
  };

  const handleActivityFilterChange = (value) => {
    setActivityTypeFilter(value);
    filterActivities(searchText, value, emailFilter, dateFilter);
  };

  const handleEmailFilterChange = (e) => {
    const value = e.target.value;
    setEmailFilter(value);
    filterActivities(searchText, activityTypeFilter, value, dateFilter);
  };

  const handleDateFilterChange = (date, dateString) => {
    setDateFilter(dateString);
    filterActivities(searchText, activityTypeFilter, emailFilter, dateString);
  };

  const handleMostActiveUserFilter = () => {
    filterActivities(searchText, activityTypeFilter, mostActiveUser, dateFilter);
  };

  const handleResetFilters = () => {
    setActivityTypeFilter(null);
    setEmailFilter('');
    setDateFilter(null);
    setSearchText('');
    setFilteredActivities(activities);
  };

  const filterActivities = (search = '', activityType = null, email = '', date = null) => {
    let filtered = activities.filter((activity) => {
      return (
        activity.activity.toLowerCase().includes(search.toLowerCase()) &&
        (activityType ? activity.activity.includes(activityType) : true) &&
        (email ? activity.email.includes(email) : true) &&
        (date ? moment(activity.timestamp).isSame(date, 'day') : true)
      );
    });
    setFilteredActivities(filtered);
  };

  const uniqueActivities = [...new Set(activities.map(item => item.activity))];

  const columns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => new Date(timestamp).toLocaleString(),
    },
  ];

  return (
    <div>
      <h1 className="text-center text-danger">User Activities</h1>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={handleMostActiveUserFilter} disabled={!mostActiveUser}>
          Filter Most Active User
        </Button>
        <Button onClick={handleResetFilters} style={{ marginLeft: 8 }}>
          Reset Filters
        </Button>
      </div>
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
