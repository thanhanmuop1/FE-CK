import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { areaMap, groupMap, statusMap } from '@/utils/utils';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateApplicationPDF = (application: any) => {
  const currentDate = new Date().toLocaleDateString('vi-VN');
  
  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    
    header: {
      columns: [
        {
          text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc',
          alignment: 'center',
          fontSize: 11,
          bold: true,
          margin: [0, 20, 0, 0]
        }
      ]
    },
    
    content: [
      { text: '\n\n' },
      
      // Tiêu đề chính
      { 
        text: 'HỒ SƠ ĐĂNG KÝ XÉT TUYỂN ĐẠI HỌC', 
        style: 'mainHeader',
        alignment: 'center'
      },
      { 
        text: `NĂM HỌC ${new Date().getFullYear()}`, 
        style: 'yearHeader',
        alignment: 'center'
      },
      
      { text: '\n\n' },
      
      // I. THÔNG TIN CÁ NHÂN
      {
        text: 'I. THÔNG TIN CÁ NHÂN',
        style: 'sectionHeader'
      },
      
      {
        table: {
          widths: ['25%', '75%'],
          body: [
            [
              { text: 'Họ và tên:', style: 'tableLabel' },
              { text: application.name?.toUpperCase() || '', style: 'tableValue' }
            ],
            [
              { text: 'Email:', style: 'tableLabel' },
              { text: application.email || '', style: 'tableValue' }
            ],
            [
              { text: 'Số điện thoại:', style: 'tableLabel' },
              { text: application.phone || '', style: 'tableValue' }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      { text: '\n' },
      
      // II. THÔNG TIN TUYỂN SINH
      {
        text: 'II. THÔNG TIN TUYỂN SINH',
        style: 'sectionHeader'
      },
      
      {
        table: {
          widths: ['25%', '75%'],
          body: [
            [
              { text: 'Trường đại học:', style: 'tableLabel' },
              { text: application.university || '', style: 'tableValue' }
            ],
            [
              { text: 'Ngành đăng ký:', style: 'tableLabel' },
              { text: application.major || '', style: 'tableValue' }
            ],
            [
              { text: 'Phương thức xét tuyển:', style: 'tableLabel' },
              { text: application.method || '', style: 'tableValue' }
            ],
            [
              { text: 'Đợt tuyển sinh:', style: 'tableLabel' },
              { text: application.admissionPeriod || '', style: 'tableValue' }
            ],
            ...(application.combination ? [
              [
                { text: 'Tổ hợp xét tuyển:', style: 'tableLabel' },
                { text: application.combination || '', style: 'tableValue' }
              ]
            ] : [])
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      { text: '\n' },
      
      // III. KẾT QUẢ HỌC TẬP
      {
        text: 'III. KẾT QUẢ HỌC TẬP',
        style: 'sectionHeader'
      },
      
      // Bảng điểm chi tiết
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            ...(application.method === 'Xét tuyển học bạ' ? [
              [
                { text: 'Điểm trung bình lớp 10:', style: 'tableLabel' },
                { text: application.scores['GPA 10']?.toFixed(2) || '0.00', style: 'tableValue' }
              ],
              [
                { text: 'Điểm trung bình lớp 11:', style: 'tableLabel' },
                { text: application.scores['GPA 11']?.toFixed(2) || '0.00', style: 'tableValue' }
              ],
              [
                { text: 'Điểm trung bình lớp 12:', style: 'tableLabel' },
                { text: application.scores['GPA 12']?.toFixed(2) || '0.00', style: 'tableValue' }
              ]
            ] : []),
            [
              { text: 'TỔNG ĐIỂM:', style: 'tableHeader', bold: true },
              { text: application.totalScore?.toFixed(2) || '0.00', style: 'tableHeader', alignment: 'center' }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      { text: '\n' },
      
      // IV. ĐIỂM ƯU TIÊN
      {
        text: 'IV. ĐIỂM ƯU TIÊN',
        style: 'sectionHeader'
      },
      
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            [
              { text: 'Khu vực ưu tiên:', style: 'tableLabel' },
              { text: `${areaMap[application.priority?.area] || 'Không có'}`, style: 'tableValue' }
            ],
            [
              { text: 'Đối tượng ưu tiên:', style: 'tableLabel' },
              { text: `${groupMap[application.priority?.group] || 'Không có'}`, style: 'tableValue' }
            ],
            [
              { text: 'Tổng điểm ưu tiên:', style: 'tableLabel' },
              { text: (application.priority?.score || 0).toFixed(2), style: 'tableValue', bold: true }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      // Tổng kết điểm
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            [
              { text: 'TỔNG ĐIỂM XÉT TUYỂN:', style: 'finalScoreLabel' },
              { 
                text: ((application.totalScore || 0) + (application.priority?.score || 0)).toFixed(2), 
                style: 'finalScoreValue' 
              }
            ]
          ]
        },
        layout: 'noBorders',
        margin: [0, 10, 0, 0]
      },
      
      { text: '\n' },
      
      // V. TRẠNG THÁI HỒ SƠ
      {
        text: 'V. TRẠNG THÁI HỒ SƠ',
        style: 'sectionHeader'
      },
      
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            [
              { text: 'Trạng thái:', style: 'tableLabel' },
              { text: statusMap[application.status]?.text || application.status, style: 'tableValue' }
            ],
            [
              { text: 'Ngày nộp hồ sơ:', style: 'tableLabel' },
              { text: application.dates?.submitted || '', style: 'tableValue' }
            ],
            [
              { text: 'Ngày cập nhật:', style: 'tableLabel' },
              { text: application.dates?.updated || '', style: 'tableValue' }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      { text: '\n\n' },
      
      // Chữ ký
      {
        columns: [
          {
            width: '50%',
            text: [
              { text: 'Người nộp hồ sơ\n', bold: true, alignment: 'center' },
              { text: '(Ký và ghi rõ họ tên)\n\n\n\n', alignment: 'center' },
              { text: `${application.name || ''}`, alignment: 'center', bold: true }
            ]
          },
          {
            width: '50%',
            text: [
              { text: `Ngày ${currentDate}\n`, alignment: 'center' },
              { text: 'Cán bộ tiếp nhận\n', bold: true, alignment: 'center' },
              { text: '(Ký và ghi rõ họ tên)\n\n\n\n', alignment: 'center' }
            ]
          }
        ]
      }
    ],
    
    footer: function(currentPage: number, pageCount: number) {
      return {
        text: `Trang ${currentPage}/${pageCount}`,
        alignment: 'center',
        fontSize: 10,
        margin: [0, 20, 0, 0]
      };
    },
    
    styles: {
      mainHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      yearHeader: {
        fontSize: 12,
        italics: true,
        margin: [0, 0, 0, 10]
      },
      sectionHeader: {
        fontSize: 13,
        bold: true,
        margin: [0, 15, 0, 10],
        decoration: 'underline'
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        alignment: 'center',
        margin: [5, 5, 5, 5]
      },
      tableLabel: {
        fontSize: 11,
        bold: true,
        margin: [5, 3, 5, 3]
      },
      tableValue: {
        fontSize: 11,
        margin: [5, 3, 5, 3]
      },
      finalScoreLabel: {
        fontSize: 12,
        bold: true,
        alignment: 'right',
        margin: [5, 5, 5, 5]
      },
      finalScoreValue: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
        color: 'red',
        margin: [5, 5, 5, 5]
      }
    },
    
    defaultStyle: {
      fontSize: 11,
      font: 'Roboto'
    }
  };

  return pdfMake.createPdf(docDefinition);
};