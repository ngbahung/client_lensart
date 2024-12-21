
export const navItems = [
    { 
        name: 'Gọng kính', 
        path: '/gong-kinh',
        subItems: [
            { name: 'Gọng Kim Loại', filterType: 'material', filterValue: 'Kim loại' },
            { name: 'Gọng Không Viền', filterType: 'style', filterValue: 'Không viền' },
            { name: 'Gọng Mắt Mèo', filterType: 'style', filterValue: 'Mắt mèo' },
            { name: 'Gọng Oval', filterType: 'style', filterValue: 'Oval' },
            { name: 'Gọng Kính Nhựa', filterType: 'material', filterValue: 'Nhựa' }
        ]
    },
    { 
        name: 'Kính mát', 
        path: '/kinh-mat',
        subItems: [
            { name: 'Kính Mát Nam', filterType: 'gender', filterValue: 'Nam' },
            { name: 'Kính Mát Nữ', filterType: 'gender', filterValue: 'Nữ' }
        ]
    },
    { 
        name: 'Tròng kính', 
        path: '/trong-kinh',
        subItems: [
            { name: 'Tròng Cận', filterType: 'type', filterValue: 'Cận' },
            { name: 'Tròng Chống Ánh Sáng Xanh', filterType: 'type', filterValue: 'Chống Ánh Sáng Xanh' },
            { name: 'Tròng Đổi Màu', filterType: 'type', filterValue: 'Đổi Màu' }
        ]
    },
];

export const additionalLinks = [
    { name: 'Về LensArt', path: '/ve-lensart' },
    { name: 'Blog', path: '/blog' },
    { name: 'Liên hệ', path: '/lien-he' },
    { name: 'Chính sách', path: '/chinh-sach' },
];