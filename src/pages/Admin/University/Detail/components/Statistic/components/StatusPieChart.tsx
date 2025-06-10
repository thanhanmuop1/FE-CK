import React, { useEffect, useMemo } from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import { useParams, useModel } from 'umi';

const COLORS = ['#FBC02D', '#43A047', '#E53935', '#1E88E5'];
const LABEL_COLORS = ['#FBC02D', '#43A047', '#E53935', '#1E88E5'];

const StatusPieChart: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const { applications, fetchApplicationsByUniversity } = useModel('Admin.Applications');

  useEffect(() => {
    if (universityId) {
      fetchApplicationsByUniversity(universityId);
    }
  }, [universityId]);

  const total = applications.length;
  const pieData = useMemo(() => [
    { name: 'Chờ duyệt', value: applications.filter(app => app.status === 'cho_duyet').length },
    { name: 'Đã duyệt', value: applications.filter(app => app.status === 'da_duyet').length },
    { name: 'Từ chối', value: applications.filter(app => app.status === 'tu_choi').length },
  ], [applications]);

  // tính %
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={LABEL_COLORS[index % LABEL_COLORS.length]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontWeight={600}
      >
        {pieData[index].name} {total ? `${Math.round((pieData[index].value / total) * 100)}%` : '0%'}
      </text>
    );
  };

  return (
    <Card title="Phân bố trạng thái" style={{ flex: 1 }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            formatter={(value, entry, index) => {
              const percent = total ? Math.round((pieData[index].value / total) * 100) : 0;
              return (
                <span style={{ color: COLORS[index % COLORS.length], fontWeight: 600 }}>
                  {value} {percent}%
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StatusPieChart;

