export default [
	{
		path: '/',
		component: './LandingPage',
		layout: false,
	},
	{
		path: '/user',
		layout: false,
		routes: [
			// Routes không dùng layout (Auth pages)
			{
				path: '/user/register',
				component: './User/Auth/Register',
			},
			{
				path: '/user/login',
				component: './User/Auth/Login',
			},
			// Routes sử dụng UserLayout
			{
				path: '/user',
				component: '@/layouts/UserLayout',
				routes: [
					{
						path: '/user/dashboard',
						component: './User/Dashboard',
					},
					{
						path: '/user/profile',
						component: './User/ProfilePage',
					},
					{
						path: '/user/applications',
						name: 'applications',
						component: './User/ApplicationsPage',
					},
					// {
					// 	path: '/user/applications/:id',
					// 	name: 'applicationDetail',
					// 	component: './User/ApplicationDetailPage',
					// },
					{
						path: '/user/applications/new',
						name: 'newApplication',
						component: './User/NewApplication/Step1',
					},
					{
						path: '/user/applications/new/step2',
						name: 'newApplicationStep2',
						component: './User/NewApplication/Step2',
					},

					{
						path: '/user/applications/new/step3',
						name: 'newApplicationStep3',
						component: './User/NewApplication/Step3',
					},
					{
						path: '/user/applications/new/step4',
						name: 'newApplicationStep4',
						component: './User/NewApplication/Step4',
					},
					{
						path: '/user/applications/new/step5',
						name: 'newApplicationStep5',
						component: './User/NewApplication/Step5',
					},
					{
						path: '/user/applications/new/step6',
						name: 'newApplicationStep6',
						component: './User/NewApplication/Step6',
					},

					{
						path: '/user/applications/search',
						name: 'SearchApplicationsPage',
						component: './User/SearchApplicationsPage',
					},

					{
						path: '/user/applications/:id',
						name: 'detailApplication',
						component: './User/DetailApplications',
					},
					
					// {
					// 	path: '/user/settings',
					// 	component: './User/Settings', // Tạo component này sau
					// },
				],
			},
		],
	},
	{
		path: '/admin',
		layout: false,
		routes: [
			// Routes không dùng layout (Auth pages)
			{
				path: '/admin/login',
				component: './Admin/Auth/LoginPage',
			},
			// Routes sử dụng AdminLayout
			{
				path: '/admin',
				component: '@/layouts/AdminLayout',
				routes: [
					{
						path: '/admin/dashboard',
						component: './Admin/Dashboard',
					},
					{
						path: '/admin/statistics',
						component: './Admin/Statistics',
					},
					{
						path: '/admin/university',
						component: './Admin/University',
					},
					{
						path: '/admin/university/:universityId',
						component: './Admin/University/Detail',
					},
					{
						path: '/admin/subject-combinations',
						component: './Admin/SubjectCombinations',
					},
					{
						path: '/admin/applications/:id',
						component: './Admin/DetailApplications',
					}
					// {
					// 	path: '/admin/users',
					// 	component: './Admin/Users',
					// },
					// {
					// 	path: '/admin/settings',
					// 	component: './Admin/Settings',
					// },
				],
			},
		],
	},

	

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
