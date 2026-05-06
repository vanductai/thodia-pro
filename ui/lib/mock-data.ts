// ─── Mock Data — Pro.Thodia.so ────────────────────────────────────────────────
// Source of truth cho toàn bộ demo data, aligned với z68-docs specs

// ─── Enums / Constants ────────────────────────────────────────────────────────
export const SERVICES = {
  bds: { label: "Bất động sản", schema: "RealEstateAgent", icon: "Building2" },
  "xe-co": { label: "Xe cộ", schema: "AutoDealer", icon: "Car" },
  "bao-hiem": { label: "Bảo hiểm", schema: "InsuranceAgency", icon: "Shield" },
} as const;

export const PROVINCES = {
  "tp-ho-chi-minh": "TP. Hồ Chí Minh",
  "ha-noi": "Hà Nội",
  "da-nang": "Đà Nẵng",
  "binh-duong": "Bình Dương",
  "dong-nai": "Đồng Nai",
  "can-tho": "Cần Thơ",
  "khanh-hoa": "Khánh Hòa",
  "long-an": "Long An",
};

// ─── Agents ───────────────────────────────────────────────────────────────────
export const AGENTS = [
  {
    slug: "nguyen-van-minh-bds-phuong-tan-thuan-tay",
    agent_type: "location-based" as const,
    name: "Nguyễn Văn Minh",
    title: "Môi giới BĐS Chuyên nghiệp",
    category: "bds",
    license: "CC-BĐS-HCM-2021-04782",
    years_experience: 8,
    phone: "+84903456789",
    email: "minh.nguyen@bds.vn",
    rating: 4.8,
    review_count: 47,
    verified: true,
    province: "tp-ho-chi-minh",
    ward: "phuong-tan-thuan-tay",
    ward_label: "P. Tân Thuận Tây",
    legacy_district: "Quận 7",
    office_address: "123 Nguyễn Hữu Thọ, P. Tân Thuận Tây, TP.HCM",
    lat: 10.7285,
    lng: 106.7179,
    primary_brand: null,
    brand_tier: null,
    services: ["Mua bán căn hộ", "Cho thuê văn phòng", "Đất nền", "Nhà phố"],
    bio: "Với 8 năm kinh nghiệm chuyên sâu tại khu vực Quận 7 cũ (nay là P. Tân Thuận Tây), anh Minh đã tư vấn thành công hơn 200 giao dịch BĐS. Chuyên gia về phân khúc căn hộ cao cấp và đất nền ven sông.",
    achievements: ["Top 10 Môi giới Q.7 2024", "Chứng chỉ Định giá BĐS", "200+ giao dịch thành công"],
    featured: true,
  },
  {
    slug: "tran-thi-lan-vinfast-freelance",
    agent_type: "freelance" as const,
    name: "Trần Thị Lan",
    title: "Tư vấn Bán hàng VinFast",
    category: "xe-co",
    license: null,
    years_experience: 5,
    phone: "+84912345678",
    email: "lan.tran@vinfast.vn",
    rating: 4.9,
    review_count: 82,
    verified: true,
    province: "tp-ho-chi-minh",
    ward: null,
    ward_label: null,
    legacy_district: null,
    office_address: null,
    lat: null,
    lng: null,
    primary_brand: "VinFast",
    brand_tier: "gold" as const,
    services: ["Tư vấn mua xe VinFast", "Hỗ trợ vay vốn", "Thủ tục đăng ký xe", "Bảo hiểm xe"],
    bio: "Chuyên gia tư vấn VinFast với 5 năm kinh nghiệm. Chị Lan phục vụ khách hàng trên toàn TP.HCM và các tỉnh lân cận, cam kết đồng hành từ khi tư vấn đến khi nhận xe.",
    achievements: ["Top Sales VinFast HCM 2024", "500+ xe đã bàn giao", "Đại lý Vàng VinFast"],
    featured: true,
  },
  {
    slug: "le-thi-thu-ha-bds-phuong-thu-thiem",
    agent_type: "location-based" as const,
    name: "Lê Thị Thu Hà",
    title: "Chuyên viên BĐS Cao cấp",
    category: "bds",
    license: "CC-BĐS-HCM-2019-02341",
    years_experience: 12,
    phone: "+84987654321",
    email: "thuha.le@bds.vn",
    rating: 4.9,
    review_count: 134,
    verified: true,
    province: "tp-ho-chi-minh",
    ward: "phuong-thu-thiem",
    ward_label: "P. Thủ Thiêm",
    legacy_district: "Quận 2",
    office_address: "45 Đỗ Quang, P. Thủ Thiêm, TP.HCM",
    lat: 10.7879,
    lng: 106.7321,
    primary_brand: null,
    brand_tier: null,
    services: ["BĐS khu Thủ Thiêm", "Căn hộ cao cấp", "Đầu tư BĐS", "Pháp lý BĐS"],
    bio: "12 năm kinh nghiệm tại khu vực Thủ Thiêm (Quận 2 cũ). Chuyên gia hàng đầu về phân khúc BĐS cao cấp khu Thủ Thiêm - Thành Thủ Đức.",
    achievements: ["Top Agent 2022-2024", "Chuyên gia BĐS Thủ Thiêm", "400+ giao dịch"],
    featured: true,
  },
  {
    slug: "pham-quoc-bao-bao-hiem-ha-noi",
    agent_type: "freelance" as const,
    name: "Phạm Quốc Bảo",
    title: "Tư vấn Bảo hiểm Manulife",
    category: "bao-hiem",
    license: "BH-HN-2020-00912",
    years_experience: 7,
    phone: "+84966123456",
    email: "bao.pham@manulife.com.vn",
    rating: 4.7,
    review_count: 56,
    verified: true,
    province: "ha-noi",
    ward: null,
    ward_label: null,
    legacy_district: null,
    office_address: null,
    lat: null,
    lng: null,
    primary_brand: "Manulife",
    brand_tier: "silver" as const,
    services: ["Bảo hiểm nhân thọ", "Bảo hiểm sức khỏe", "Bảo hiểm xe", "Đầu tư bảo hiểm"],
    bio: "7 năm kinh nghiệm tư vấn bảo hiểm Manulife tại Hà Nội. Anh Bảo đã giúp hơn 300 khách hàng lựa chọn sản phẩm bảo hiểm phù hợp nhất.",
    achievements: ["MDRT 2023", "Top Agent Manulife HN", "300+ hợp đồng"],
    featured: false,
  },
  {
    slug: "vo-minh-khoa-vinfast-da-nang",
    agent_type: "location-based" as const,
    name: "Võ Minh Khoa",
    title: "Trưởng phòng Kinh doanh VinFast Đà Nẵng",
    category: "xe-co",
    license: null,
    years_experience: 6,
    phone: "+84935678901",
    email: "khoa.vo@vinfast.vn",
    rating: 4.6,
    review_count: 38,
    verified: true,
    province: "da-nang",
    ward: "phuong-hai-chau-1",
    ward_label: "P. Hải Châu 1",
    legacy_district: "Q. Hải Châu",
    office_address: "200 Trần Phú, P. Hải Châu 1, Đà Nẵng",
    lat: 16.0544,
    lng: 108.2022,
    primary_brand: "VinFast",
    brand_tier: "silver" as const,
    services: ["Bán xe VinFast", "Xe trưng bày", "Hỗ trợ tài chính", "Dịch vụ sau bán"],
    bio: "Trưởng phòng kinh doanh VinFast Đà Nẵng với 6 năm kinh nghiệm. Anh Khoa chuyên phục vụ khách hàng miền Trung từ Quảng Nam đến Quảng Ngãi.",
    achievements: ["Best Showroom Miền Trung 2024", "150+ xe/năm", "Đại lý Bạc VinFast"],
    featured: false,
  },
];

// ─── Locations ────────────────────────────────────────────────────────────────
export const LOCATIONS = [
  {
    slug: "showroom-vinfast-nguyen-van-linh",
    name: "Showroom VinFast Nguyễn Văn Linh",
    image: "https://pro.thodia.so/images/showroom-vinfast-q7.jpg",
    category: "xe-co",
    schema_type: "AutoDealer",
    province: "tp-ho-chi-minh",
    phuong: "phuong-tan-thuan-tay",
    ward_label: "Phường Tân Thuận Tây",
    legacy_district: "Quận 7",
    // PostalAddress tách riêng (F3)
    street_address: "456 Nguyễn Văn Linh",
    address: "456 Nguyễn Văn Linh, Phường Tân Thuận Tây, TP. Hồ Chí Minh",
    postal_code: "700000",
    phone: "+84-28-3456-7890",
    email: "showroom.q7@vinfast.vn",
    rating: 4.7,
    review_count: 134,
    lat: 10.7285,
    lng: 106.7179,
    primary_brand: "VinFast",
    brand_tier: "gold" as const,
    is_authorized: true,
    // Display (text)
    opening_hours: [
      { day: "Thứ 2 – Thứ 6", hours: "08:00–18:00" },
      { day: "Thứ 7 – CN", hours: "08:00–17:00" },
    ],
    // Schema.org chuẩn OpeningHoursSpecification (F1)
    opening_hours_spec: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
      { dayOfWeek: ["Saturday","Sunday"], opens: "08:00", closes: "17:00" },
    ],
    services: ["Tư vấn & mua bán xe VinFast", "Hỗ trợ vay ngân hàng", "Bảo hiểm xe", "Lái thử miễn phí"],
    area_served: [
      { ward: "Phường Tân Thuận Tây", legacy: "Quận 7" },
      { ward: "Phường Tân Thuận Đông", legacy: "Quận 7" },
      { ward: "Phường Phú Thuận", legacy: "Quận 7" },
    ],
    // Reviews cho JSON-LD (F5)
    reviews: [
      { author: "Lê Hoàng Nam", rating: 5, date: "2024-04-10", text: "Showroom rộng rãi, nhân viên tư vấn nhiệt tình. Mua được VF3 giá tốt, thủ tục nhanh." },
      { author: "Phạm Thị Bích", rating: 5, date: "2024-03-22", text: "Dịch vụ chuyên nghiệp, hỗ trợ vay ngân hàng rất thuận tiện. Sẽ giới thiệu bạn bè." },
      { author: "Nguyễn Minh Tuấn", rating: 4, date: "2024-02-15", text: "Xe đẹp, giá minh bạch. Chờ giao xe hơi lâu một chút." },
    ],
    featured: true,
  },
  {
    slug: "van-phong-bds-nguyen-van-minh",
    name: "Văn phòng BĐS Nguyễn Văn Minh",
    image: "https://pro.thodia.so/images/vp-bds-tan-thuan.jpg",
    category: "bds",
    schema_type: "RealEstateAgent",
    province: "tp-ho-chi-minh",
    phuong: "phuong-tan-thuan-tay",
    ward_label: "Phường Tân Thuận Tây",
    legacy_district: "Quận 7",
    street_address: "123 Nguyễn Hữu Thọ",
    address: "123 Nguyễn Hữu Thọ, Phường Tân Thuận Tây, TP. Hồ Chí Minh",
    postal_code: "700000",
    phone: "+84903456789",
    email: "minh@bds-q7.vn",
    rating: 4.8,
    review_count: 47,
    lat: 10.728,
    lng: 106.717,
    primary_brand: null,
    brand_tier: null,
    is_authorized: false,
    opening_hours: [
      { day: "Thứ 2 – Thứ 7", hours: "08:00–18:00" },
    ],
    opening_hours_spec: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "18:00" },
    ],
    services: ["Mua bán căn hộ", "Cho thuê văn phòng", "Tư vấn đầu tư", "Pháp lý BĐS"],
    area_served: [
      { ward: "Phường Tân Thuận Tây", legacy: "Quận 7" },
      { ward: "Phường Tân Thuận Đông", legacy: "Quận 7" },
    ],
    reviews: [
      { author: "Trần Văn Hùng", rating: 5, date: "2024-05-01", text: "Anh Minh tư vấn rất chi tiết, hỗ trợ pháp lý toàn trình. Mua được căn hộ ưng ý." },
      { author: "Võ Thị Lan", rating: 5, date: "2024-03-18", text: "Chuyên nghiệp, thị trường khu Q.7 rất am hiểu. Sẽ tìm lại khi cần." },
      { author: "Lý Minh Châu", rating: 4, date: "2024-01-09", text: "Tư vấn tốt, thủ tục nhanh. Giá tư vấn hợp lý." },
    ],
    featured: true,
  },
  {
    slug: "showroom-honda-bach-dang-da-nang",
    name: "Honda Ô tô Bạch Đằng Đà Nẵng",
    image: "https://pro.thodia.so/images/showroom-honda-danang.jpg",
    category: "xe-co",
    schema_type: "AutoDealer",
    province: "da-nang",
    phuong: "phuong-hai-chau-1",
    ward_label: "Phường Hải Châu 1",
    legacy_district: "Quận Hải Châu",
    street_address: "125 Bạch Đằng",
    address: "125 Bạch Đằng, Phường Hải Châu 1, Đà Nẵng",
    postal_code: "550000",
    phone: "+842363456789",
    email: "showroom@honda-danang.vn",
    rating: 4.5,
    review_count: 89,
    lat: 16.0546,
    lng: 108.2025,
    primary_brand: "Honda",
    brand_tier: "gold" as const,
    is_authorized: true,
    opening_hours: [
      { day: "Thứ 2 – Thứ 7", hours: "07:30–18:00" },
      { day: "Chủ nhật", hours: "08:00–17:00" },
    ],
    opening_hours_spec: [
      { dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "07:30", closes: "18:00" },
      { dayOfWeek: ["Sunday"], opens: "08:00", closes: "17:00" },
    ],
    services: ["Bán xe Honda mới", "Xe cũ chính hãng", "Dịch vụ bảo dưỡng", "Phụ tùng chính hãng"],
    area_served: [
      { ward: "Phường Hải Châu 1", legacy: "Quận Hải Châu" },
      { ward: "Phường Hải Châu 2", legacy: "Quận Hải Châu" },
    ],
    reviews: [
      { author: "Đặng Văn Bình", rating: 5, date: "2024-04-05", text: "Dịch vụ bảo dưỡng Honda tốt, nhanh và giá chuẩn hãng." },
      { author: "Phan Thị Hoa", rating: 4, date: "2024-02-28", text: "Nhân viên nhiệt tình, showroom sạch đẹp. Mua HR-V giá tốt." },
    ],
    featured: false,
  },
];

// ─── Brands ───────────────────────────────────────────────────────────────────
export const BRANDS = [
  {
    slug: "vinfast",
    name: "VinFast",
    category: "xe-co",
    website: "https://vinfastauto.com",
    tagline: "Xe điện Việt Nam — Tiên phong & Đổi mới",
    description: "VinFast là thương hiệu xe ô tô điện của Việt Nam thuộc Vingroup. Thành lập 2017, đã xuất khẩu đến 14 quốc gia. Mạng lưới đại lý phủ 63 tỉnh thành.",
    stats: { dealers: 187, provinces: 34, agents: 412 },
    logo_initial: "VF",
  },
  {
    slug: "honda",
    name: "Honda",
    category: "xe-co",
    website: "https://hondaoto.com.vn",
    tagline: "The Power of Dreams",
    description: "Honda Ô tô Việt Nam với mạng lưới đại lý chính hãng trên toàn quốc. Chuyên các dòng xe phổ thông đến SUV cao cấp.",
    stats: { dealers: 143, provinces: 28, agents: 286 },
    logo_initial: "H",
  },
  {
    slug: "toyota",
    name: "Toyota",
    category: "xe-co",
    website: "https://toyota.com.vn",
    tagline: "Let's Go Places",
    description: "Toyota Việt Nam — thương hiệu xe Nhật Bản uy tín nhất tại Việt Nam với hơn 30 năm kinh doanh.",
    stats: { dealers: 98, provinces: 22, agents: 210 },
    logo_initial: "T",
  },
  {
    slug: "manulife",
    name: "Manulife",
    category: "bao-hiem",
    website: "https://manulife.com.vn",
    tagline: "Quyết định khôn ngoan. Sống tốt hơn.",
    description: "Manulife Việt Nam — công ty bảo hiểm nhân thọ Canada, hoạt động tại VN từ 1999. Mạng lưới 40.000+ đại lý toàn quốc.",
    stats: { dealers: 76, provinces: 63, agents: 40000 },
    logo_initial: "M",
  },
  {
    slug: "prudential",
    name: "Prudential",
    category: "bao-hiem",
    website: "https://prudential.com.vn",
    tagline: "Luôn luôn lắng nghe. Luôn luôn thấu hiểu.",
    description: "Prudential Việt Nam hoạt động từ 1999 với hơn 300 văn phòng đại lý. Chuyên bảo hiểm nhân thọ, sức khỏe và đầu tư.",
    stats: { dealers: 65, provinces: 63, agents: 35000 },
    logo_initial: "P",
  },
  {
    slug: "vinhomes",
    name: "Vinhomes",
    category: "bds",
    website: "https://vinhomes.vn",
    tagline: "Nơi đáng sống nhất Việt Nam",
    description: "Vinhomes — chủ đầu tư BĐS hàng đầu Việt Nam thuộc Vingroup. Các dự án tại Hà Nội, TP.HCM và nhiều tỉnh thành.",
    stats: { dealers: 54, provinces: 12, agents: 5000 },
    logo_initial: "VH",
  },
];

// ─── Geo Clusters (tên địa danh cũ → phường mới) ──────────────────────────────
export const GEO_CLUSTERS = [
  {
    province: "tp-ho-chi-minh",
    slug: "khu-vuc-quan-7",
    label: "Khu vực Quận 7",
    legacy_name: "Quận 7",
    wards: [
      { slug: "phuong-tan-thuan-tay", label: "P. Tân Thuận Tây", count: 18 },
      { slug: "phuong-tan-thuan-dong", label: "P. Tân Thuận Đông", count: 12 },
      { slug: "phuong-phu-thuan", label: "P. Phú Thuận", count: 8 },
      { slug: "phuong-binh-thuan", label: "P. Bình Thuận", count: 5 },
    ],
  },
  {
    province: "tp-ho-chi-minh",
    slug: "khu-vuc-quan-2",
    label: "Khu vực Quận 2",
    legacy_name: "Quận 2",
    wards: [
      { slug: "phuong-thu-thiem", label: "P. Thủ Thiêm", count: 15 },
      { slug: "phuong-an-phu", label: "P. An Phú", count: 11 },
      { slug: "phuong-binh-an", label: "P. Bình An", count: 7 },
    ],
  },
];

// ─── Homepage stats ───────────────────────────────────────────────────────────
export const SITE_STATS = {
  agents: 1847,
  locations: 423,
  brands: 28,
  provinces: 34,
  verified_pct: 94,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getFeaturedAgents() {
  return AGENTS.filter((a) => a.featured);
}

export function getFeaturedLocations() {
  return LOCATIONS.filter((l) => l.featured);
}

export function getAgentsByProvince(province: string) {
  return AGENTS.filter((a) => a.province === province);
}

export function getAgentsByService(service: string) {
  return AGENTS.filter((a) => a.category === service);
}

export function getLocationsByProvince(province: string) {
  return LOCATIONS.filter((l) => l.province === province);
}

export function getServiceLabel(service: string): string {
  return SERVICES[service as keyof typeof SERVICES]?.label ?? service;
}

export function getProvinceLabel(province: string): string {
  return PROVINCES[province as keyof typeof PROVINCES] ?? province;
}
