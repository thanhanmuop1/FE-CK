import { EDinhDangFile } from '@/services/base/constant';
import { message, type FormInstance } from 'antd';
import { type AxiosResponse } from 'axios';
import type { Moment } from 'moment';
import moment from 'moment';
import * as XLSX from 'xlsx';

export const BASE_URL = 'https://be-ck.onrender.com';
export const urlRegex =
	/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.,~#?&//=]*)$/;

const charMap: any = {
	a: '[aàáâãăăạảấầẩẫậắằẳẵặ]',
	e: '[eèéẹẻẽêềềểễệế]',
	i: '[iìíĩỉị]',
	o: '[oòóọỏõôốồổỗộơớờởỡợ]',
	u: '[uùúũụủưứừửữự]',
	y: '[yỳỵỷỹý]',
	d: '[dđ]',
	' ': ' ',
};

export const isUrl = (path: string): boolean => urlRegex.test(path);

export const isAntDesignPro = (): boolean => {
	if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
		return true;
	}
	return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
	const { NODE_ENV } = process.env;
	if (NODE_ENV === 'development') {
		return true;
	}
	return isAntDesignPro();
};

export function toHexa(str: string) {
	// render rgb color from a string
	if (!str) return '';
	const maxBase = 1000000007;
	const base = 16777216;
	let sum = 1;
	for (let i = 0; i < str.length; i += 1) {
		sum = (sum * str.charCodeAt(i)) % maxBase;
	}
	sum %= base;
	// return `#${sum.toString(16)}`;
	const colors = [
		'rgba(26, 94, 18, 0.7)',
		'rgba(84, 106, 47, 0.7)',
		'rgba(107, 143, 36, 0.7)',
		'rgba(45, 77, 0, 0.7)',
		'rgba(0, 100, 0, 0.7)',
		'rgba(47, 79, 79, 0.7)',
		'rgba(0, 128, 128, 0.7)',
		'rgba(0, 139, 139, 0.7)',
		'rgba(100, 149, 237, 0.7)',
	];
	return colors[sum % colors.length];
}

function render(value: string) {
	// phục vụ hàm toRegex bên dưới
	let result = '';
	[...value].forEach((char: any) => (result += charMap[char] || char));
	return result;
}

export function Format(str: string) {
	// xóa hết dấu + đưa về chữ thường
	if (!str) return '';
	return str
		.toString()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/đ/g, 'd');
}

export function toRegex(value: any) {
	if (!value) return undefined;
	// convert từ string sang dạng regex.
	return { $regex: `.*${render(Format(value))}.*`, $options: 'i' };
}

export function Object2Regex(obj: Record<string, any>) {
	// convert từ string sang dạng regex.
	return Object.keys(obj).map((key) => ({
		[key]: { $regex: `.*${render(Format(obj[key]))}.*`, $options: 'i' },
	}));
}

export function isValue(val: string | number | any[]) {
	// check xem nếu bị undefined, null, xâu rỗng -> false
	if (!val && val !== 0) return false; // undefined, null
	if (val && Array.isArray(val) && val?.length === 0) return false; // ""
	return true;
}

export function trim(str: string) {
	// nếu là moment thì cho sang string
	if (moment.isMoment(str)) return str?.toISOString() ?? '';
	// xóa tất cả dấu cách thừa
	if (typeof str === 'string') return str.replace(/[ ]{2,}/g, ' ').trim();
	return str;
}

export function currencyFormat(num?: number) {
	if (!num) return '0';
	return num?.toFixed(0)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') ?? '0';
}

export function formatPhoneNumber(num: any) {
	// Remove any non-digit characters
	const phoneNumber = num.replace(/\D/g, '');

	// Check if the number starts with 0 and is either 10 or 11 digits
	if (/^0\d{9,10}$/.test(phoneNumber)) {
		// Format the number according to the standard format
		if (phoneNumber.length === 10) {
			return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
		} else if (phoneNumber.length === 11) {
			return phoneNumber.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
		}
	}

	// If the number doesn't match the standard format, return as it is
	return phoneNumber;
}

export function chuanHoaTen(ten: any) {
	return trim(ten)
		.split(' ')
		.map((t: string) => t.charAt(0).toUpperCase() + t.slice(1))
		.join(' ');
}

/**
 * Lấy tên file từ đường dẫn
 * @param {any} url:string Đường dẫn
 * @returns {any} Tên file
 */
export function getNameFile(url: string): string {
	if (typeof url !== 'string') return 'Đường dẫn không đúng';
	return decodeURI(url.split('/')?.at(-1) ?? '');
}

export function renderFileListUrl(url: string) {
	if (!url) return { fileList: [] };
	return {
		fileList: [
			{
				name: getNameFile(url),
				url,
				status: 'done',
				size: 0,
				type: 'img/png',
				remote: true,
			},
		],
	};
}

/**
 * Get file type
 * @param mimeType Mime type or extension of file
 * @returns
 */
export function getFileType(mimeType: string) {
	if (!mimeType) return EDinhDangFile.UNKNOWN;

	const mimeGroups: Record<string, string[]> = {
		[EDinhDangFile.WORD]: [
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
			'application/vnd.ms-word.document.macroEnabled.12',
			'application/vnd.ms-word.template.macroEnabled.12',
			'application/msword',

			'doc',
			'docx',
		],
		[EDinhDangFile.EXCEL]: [
			'application/vnd.ms-excel',
			'application/vnd.ms-excel',
			'application/vnd.ms-excel',

			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
			'application/vnd.ms-excel.sheet.macroEnabled.12',
			'application/vnd.ms-excel.template.macroEnabled.12',
			'application/vnd.ms-excel.addin.macroEnabled.12',
			'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
			'application/vnd.ms-excel',

			'xls',
			'xlsx',
		],
		[EDinhDangFile.POWERPOINT]: [
			'application/vnd.ms-powerpoint',
			'application/vnd.ms-powerpoint',
			'application/vnd.ms-powerpoint',
			'application/vnd.ms-powerpoint',

			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'application/vnd.openxmlformats-officedocument.presentationml.template',
			'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
			'application/vnd.ms-powerpoint.addin.macroEnabled.12',
			'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
			'application/vnd.ms-powerpoint.template.macroEnabled.12',
			'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',

			'ppt',
			'pptx',
		],
		[EDinhDangFile.PDF]: ['application/pdf'],
		[EDinhDangFile.IMAGE]: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
		[EDinhDangFile.VIDEO]: ['video/mp4', 'video/avi', 'video/mpeg'],
		[EDinhDangFile.AUDIO]: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
		[EDinhDangFile.TEXT]: ['text/plain', 'text/csv', 'text/html'],
	};

	let result: EDinhDangFile = EDinhDangFile.UNKNOWN;
	for (const [fileType, mimeList] of Object.entries(mimeGroups)) {
		if (mimeList.some((mime) => mime.includes(mimeType))) {
			result = fileType as EDinhDangFile;
			break;
		}
	}

	return result;
}

export function renderFileListUrlWithName(url: string, fileName?: string) {
	if (!url) return { fileList: [] };
	return {
		fileList: [
			{
				name: fileName || getNameFile(url),
				remote: true,
				url,
				status: 'done',
				size: 0,
				type: 'img/png',
			},
		],
	};
}

export function renderFileList(arr: string[]) {
	if (!arr || !Array.isArray(arr)) return { fileList: [] };
	return {
		fileList: arr.map((url, index) => ({
			remote: true, // file đã có trên server, ko phải là upload file mới
			name: getNameFile(url) || `File ${index + 1}`,
			url,
			status: 'done',
			size: 0,
			type: 'img/png',
		})),
	};
}

export const checkFileSize = (arrFile: any[], fileSize?: number) => {
	let check = true;
	const size = fileSize ?? 8;
	arrFile
		?.filter((item) => item?.remote !== true)
		?.forEach((item) => {
			if (item?.size / 1024 / 1024 > size) {
				check = false;
				message.error(`file ${item?.name} có dung lượng > ${size}Mb`);
			}
		});
	return check;
};

/** TO REMOVED */
export const convert4NumberScoreToAlphabet = (score: string | number): string => {
	const scoreValue = Number(score);
	if (scoreValue === 4) return 'A+';
	else if (scoreValue >= 3.7) return 'A';
	else if (scoreValue >= 3.5) return 'B+';
	else if (scoreValue >= 3) return 'B';
	else if (scoreValue >= 2.5) return 'C+';
	else if (scoreValue >= 2) return 'C';
	else if (scoreValue >= 1.5) return 'D+';
	else if (scoreValue >= 1) return 'D';
	else if (scoreValue >= 0) return 'F';
	else return '';
};

/**
 * TO REMOVED
 * Convert điểm hệ 10 sang hệ 4 và dạng chữ
 * @param  {string|number} score Điểm hệ 10
 * @returns [điểm dạng chữ, điểm hệ 4]
 */
export const convertNumberScoreToAlphabet = (score: string | number): [string, string] => {
	if (!score) return ['', ''];
	const scoreValue = Math.round(Number(score) * 10) / 10;
	let numberScore = -1;
	if (scoreValue >= 9.0 && scoreValue <= 10) numberScore = 4;
	else if (scoreValue >= 8.5) numberScore = 3.7;
	else if (scoreValue >= 8.0) numberScore = 3.5;
	else if (scoreValue >= 7.0) numberScore = 3;
	else if (scoreValue >= 6.5) numberScore = 2.5;
	else if (scoreValue >= 5.5) numberScore = 2;
	else if (scoreValue >= 5.0) numberScore = 1.5;
	else if (scoreValue >= 4.0) numberScore = 1;
	else if (scoreValue >= 0) numberScore = 0;

	return [convert4NumberScoreToAlphabet(numberScore), numberScore.toString()];
};

export const buildFormData = (payload: any) => {
	const form = new FormData();
	Object.keys(payload).map((key) => {
		if (isValue(payload[key])) {
			if (Array.isArray(payload[key])) {
				for (let i = 0; i < payload[key].length; i += 1) {
					form.append(key, payload[key][i]);
				}
				return;
			}
			form.set(key, trim(payload[key]));
		}
	});
	return form;
};

/** TO REMOVED, INSTEAD NANOID */
export const makeId = (length: number) => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};

export const range = (start: number, end: number) => {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
};

export const disabledRangeTime = (current: Moment, type: 'start' | 'end', hour: string, minute: string) => {
	return current && current.format('DDMMYYYY') === moment().format('DDMMYYYY')
		? {
				disabledHours: () => range(0, Number(hour)),
				disabledMinutes: () => range(0, hour === current.format('HH') ? Number(minute) : 0),
				disabledSeconds: () => [55, 56],
		  }
		: {};
};

export const tienVietNam = (number: number) => {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export const b64toBlob = (b64Data?: string, contentType = '', sliceSize = 512) => {
	if (!b64Data) return undefined;
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
};

export const blobToBase64 = (file: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const ellipse = (text: string | any[], length: number = 20) => {
	let s = '';
	if (text?.length < length) return text;
	for (let i = 0; i < length; i++) {
		s += text[i];
	}
	s += '...';
	return s;
};

export const removeHtmlTags = (html: string) =>
	html
		?.replace(/<\/?[^>]+(>|$)/g, '')
		?.replace(/&nbsp;/g, '')
		?.trim();

/**
 * Chuyển HTML Entities thành text
 * @returns {any}
 */
export const decodeHtmlEntities = (str: string): string => {
	if (str && typeof str === 'string') {
		const element = document.createElement('div');
		// strip script/html tags
		let s = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
		s = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
		element.innerHTML = s;
		s = element.textContent || '';
		element.textContent = '';
		return s;
	}
	return '';
};

/**
 * Number to currency format
 * @param number value
 */
export const inputFormat = (value?: number): string => `${value}`.replace(/(?=(\d{3})+(?!\d))\B/g, ',');

/**
 * Input value to number
 * @param string value
 */
export const inputParse = (value?: string): number => +(value?.replace(/\₫\s?|(,*)[^\d]/g, '') ?? 0);

/**
 * Chuẩn hóa Object trước khi lưu
 * trim string
 */
export const chuanHoaObject = (obj: any) => {
	if (!obj) return obj; // undefined or null
	if (typeof obj !== 'object') return trim(obj);
	Object.keys(obj).forEach((key) => (obj[key] = chuanHoaObject(obj[key])));
	return obj;
};

/**
 * Tạo và tài về file dữ liệu Excel
 * @param data Mảng của mảng dữ liệu. Ví dụ: [ ["Mã", "Tên"] , ["M01", "T01"] , ["M02", "T02"] ]
 * @param fileName File name bao gồm cả .xlsx
 * @param sheetName Mặc định Sheet1
 */
export const genExcelFile = (data: (string | number | null | undefined)[][], fileName: string, sheetName?: string) => {
	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.aoa_to_sheet(data);
	XLSX.utils.book_append_sheet(workbook, worksheet, sheetName ?? 'Sheet1');

	XLSX.writeFile(workbook, fileName || 'Danh sách.xlsx');
};

/**
 * Clear values of component in Form
 * @param form
 */
export const resetFieldsForm = (form: FormInstance<any>, formDefaultValues?: Record<string, any>) => {
	const values = form.getFieldsValue();
	Object.keys(values).map((k) => (values[k] = undefined));
	form.setFieldsValue({ ...values, ...(formDefaultValues ?? {}) });
	form.setFields(form.getFieldsError().map((item) => ({ name: item.name, errors: undefined, warnings: undefined })));
};

/**
 * Get file name from response's header
 * @param response Response from Export API
 * @returns
 */
export const getFilenameHeader = (response: AxiosResponse<any>) => {
	const token = String(response.headers['content-disposition'])
		.split(';')
		.find((a) => a.startsWith('filename='));
	if (!token) {
		return 'Tài liệu';
	} else {
		return decodeURIComponent(token.substring(10).slice(0, -1));
	}
};

/**
 * So sánh họ tên tiếng Việt
 * @param a
 * @param b
 * @returns
 */
export const compareFullname = (a: any, b: any): number => {
	if (typeof a !== 'string' || typeof b !== 'string') return 0;
	const tenA = a.split(' ').pop()?.toLocaleLowerCase() ?? '';
	const tenB = b.split(' ').pop()?.toLocaleLowerCase() ?? '';
	const compareTen = tenA.localeCompare(tenB, 'vi');

	return compareTen === 0 ? a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase(), 'vi') : compareTen;
};

/**
 * Xóa tiếng Việt
 * @param str
 * @returns
 */
export function removeVietnameseTones(str: string, removeSpecial: boolean = false) {
	let strTemp = str;
	strTemp = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	strTemp = strTemp.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	strTemp = strTemp.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	strTemp = strTemp.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	strTemp = strTemp.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	strTemp = strTemp.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	strTemp = strTemp.replace(/đ/g, 'd');
	strTemp = strTemp.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	strTemp = strTemp.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	strTemp = strTemp.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	strTemp = strTemp.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	strTemp = strTemp.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	strTemp = strTemp.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	strTemp = strTemp.replace(/Đ/g, 'D');
	// Some system encode vietnamese combining accent as individual utf-8 characters
	// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
	strTemp = strTemp.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); //       huyền, sắc, ngã, hỏi, nặng
	strTemp = strTemp.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ    Â, Ê, Ă, Ơ, Ư

	// Remove punctuations
	// Bỏ dấu câu, kí tự đặc biệt
	if (removeSpecial)
		strTemp = strTemp.replace(
			/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
			' ',
		);

	// Remove extra spaces
	// Bỏ các khoảng trắng liền nhau
	strTemp = strTemp.replace(/ + /g, ' ');
	strTemp = strTemp.trim();

	return strTemp;
}

/**
 * Scroll to div element
 * @param id
 * @param delay
 */
export const handleScrollToDivElementById = (id: string, delay?: number) => {
	if (delay) {
		setTimeout(() => {
			const targetDiv = document.getElementById(id);
			// Scroll to the target div
			if (targetDiv) {
				targetDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}, delay);
	} else {
		const targetDiv = document.getElementById(id);
		// Scroll to the target div
		if (targetDiv) {
			targetDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
};

/**
 * Copy text to clipboard
 * @param text
 * @param callBack
 */
export const copyToClipboard = (text: string, callBack?: () => void) => {
	navigator.clipboard
		.writeText(text)
		.then(function () {
			if (callBack) callBack();
		})
		.catch(function (err) {
			console.error('Could not copy text: ', err);
		});
};

/**
 * Convert plain text to HTML contains Link tags
 * @param text Plain text
 * @param targetBlank
 * @returns HTML contains a tag
 */
export const createTextLinks = (text: string, targetBlank: boolean = true) => {
	return removeHtmlTags(text || '').replace(
		/((https?:\/\/(www\.)?)|(www\.))(\S+)/gi,
		function (match, temp, protocol, www1, www2, url) {
			const hyperlink = (protocol ?? 'https://') + url;
			return `<a href="${hyperlink}"${targetBlank ? 'target="_blank" rel="noreferrer"' : ''}>${url}</a>`;
		},
	);
};

// Các phương thức xét tuyển
export const admissionMethods = [
	{
		id: 'hoc_ba',
		name: 'Xét tuyển học bạ',
		description: 'Xét tuyển dựa trên kết quả học tập THPT (điểm trung bình các môn học)',
		icon: '📚',
	},
	{
		id: 'tot_nghiep',
		name: 'Điểm thi THPT Quốc gia',
		description: 'Xét tuyển dựa trên kết quả kỳ thi THPT Quốc gia',
		icon: '📝',
	},
	{
		id: 'dgnl',
		name: 'Đánh giá năng lực',
		description: 'Xét tuyển dựa trên kết quả bài thi đánh giá năng lực của các trường đại học',
		icon: '🎯',
	},
	{
		id: 'tu_duy',
		name: 'Đánh giá tư duy',
		description: 'Xét tuyển dựa trên kết quả bài thi đánh giá tư duy logic và sáng tạo',
		icon: '🧠',
	},
];

export const statusMap = {
	cho_duyet: { color: 'processing', text: 'Chờ duyệt' },
	da_duyet: { color: 'success', text: 'Đã duyệt' },
	tu_choi: { color: 'error', text: 'Từ chối' },
};

export const graduationYears = ['2025', '2024', '2023', '2022'];

export const priorityAreas = [
	{ value: 'kv1', label: 'KV1' },
	{ value: 'kv2', label: 'KV2' },
	{ value: 'kv2-nt', label: 'KV2-NT' },
	{ value: 'kv3', label: 'KV3' },
];

export const priorityGroups = [
	{ value: '01', label: '01' },
	{ value: '02', label: '02' },
	{ value: '03', label: '03' },
	{ value: '04', label: '04' },
	{ value: '05', label: '05' },
	{ value: '06', label: '06' },
	{ value: '07', label: '07' },
	{ value: 'none', label: 'Không thuộc đối tượng ưu tiên' },
];

export const admissionMethodNames: Record<string, string> = {
	hoc_ba: 'Xét tuyển học bạ',
	tot_nghiep: 'Điểm thi THPT Quốc gia',
	dgnl: 'Đánh giá năng lực',
	tu_duy: 'Đánh giá tư duy',
};

export function getAdmissionMethodLabel(method: string | string[]): string | string[] {
	if (Array.isArray(method)) {
		return method.map((m) => admissionMethodNames[m] || m).join(', ');
	}
	return admissionMethodNames[method] || method;
}

export const requiredDocumentsByMethod: Record<string, Array<{ type: string; label: string; required: boolean }>> = {
	hoc_ba: [
		{ type: 'cccd_front', label: 'CCCD mặt trước', required: true },
		{ type: 'cccd_back', label: 'CCCD mặt sau', required: true },
		{ type: 'hoc_ba', label: 'Học bạ THPT', required: true },
	],
	tot_nghiep: [
		{ type: 'cccd_front', label: 'CCCD mặt trước', required: true },
		{ type: 'cccd_back', label: 'CCCD mặt sau', required: true },
		{ type: 'tot_nghiep', label: 'Giấy chứng nhận tốt nghiệp', required: true },
	],
	dgnl: [
		{ type: 'cccd_front', label: 'CCCD mặt trước', required: true },
		{ type: 'cccd_back', label: 'CCCD mặt sau', required: true },
		{ type: 'dgnl', label: 'Kết quả ĐGNL', required: true },
	],
	tu_duy: [
		{ type: 'cccd_front', label: 'CCCD mặt trước', required: true },
		{ type: 'cccd_back', label: 'CCCD mặt sau', required: true },
		{ type: 'tu_duy', label: 'Kết quả Đánh giá tư duy', required: true },
	],
};

export const areaMap: Record<string, string> = {
	kv1: 'Khu vực 1',
	'kv2-nt': 'Khu vực 2 nông thôn',
	kv2: 'Khu vực 2',
	kv3: 'Khu vực 3',
};

export const groupMap: Record<string, string> = {
	'01': 'Đối tượng 1',
	'02': 'Đối tượng 2',
	'03': 'Đối tượng 3',
	'04': 'Đối tượng 4',
	'05': 'Đối tượng 5',
	'06': 'Đối tượng 6',
	'07': 'Đối tượng 7',
	none: 'Không thuộc đối tượng ưu tiên',
};

export const documentTypes: Record<string, string> = {
	cccd_front: 'CCCD mặt trước',
	cccd_back: 'CCCD mặt sau',
	hoc_ba: 'Học bạ THPT',
	tot_nghiep: 'Giấy chứng nhận tốt nghiệp',
	dgnl: 'Kết quả ĐGNL',
	tu_duy: 'Kết quả Đánh giá tư duy',
};

export function getDocumentTypeLabel(type: string): string {
	return documentTypes[type] || type;
}
