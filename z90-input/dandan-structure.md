<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Phân tích kiến trúc chi tiết của các link microsite bên dưới để tìm hiểu xem các yếu tố nào của microsite này giúp tạo lợi thế ranking cho GBP của thương hiệu. Đặc biệt là cần phân tích sâu về cấu trúc schema của toàn bộ microsite này để hiểu rõ những điểm mạnh \& yếu của họ cũng như các yếu tố về SEO, GEO, AIO...

[https://store.dandanku.com/dan-dan-palmerah-utara-cosmetics-store-kec-palmerah-jakarta-barat-423750/Home](https://store.dandanku.com/dan-dan-palmerah-utara-cosmetics-store-kec-palmerah-jakarta-barat-423750/Home)
[https://store.dandanku.com/location/dki-jakarta/jakarta-barat](https://store.dandanku.com/location/dki-jakarta/jakarta-barat)
[https://store.dandanku.com/location/dki-jakarta](https://store.dandanku.com/location/dki-jakarta)
[https://store.dandanku.com/](https://store.dandanku.com/)
[https://store.dandanku.com/?lat=-6.203841\&long=106.796203](https://store.dandanku.com/?lat=-6.203841&long=106.796203)

Microsite store.dandanku.com đang được thiết kế khá chuẩn như một “local store locator” đa chi nhánh, tập trung mạnh vào GEO + local SEO, nên rất phù hợp để làm landing page cho từng GBP và chuỗi chi nhánh của thương hiệu. Dưới đây là phân tích chi tiết về kiến trúc, schema (suy luận từ cấu trúc dữ liệu hiển thị) và các tín hiệu SEO/GEO/AIO giúp họ có lợi thế ranking.[^1][^2][^3][^4]

***

## 1. Tổng quan kiến trúc microsite

- Trang root `https://store.dandanku.com/` đóng vai trò store locator: có bộ lọc theo “Provinsi / Kota / Area” và list toàn bộ cửa hàng DAN+DAN, mỗi cửa hàng có tên, địa chỉ chi tiết, quận (Kec), kota, mã bưu điện, số điện thoại, giờ mở cửa và các CTA như Call / Map / Website.[^1]
- Hệ thống chia lớp địa lý rõ ràng:
    - Cấp tỉnh: `/location/dki-jakarta` liệt kê các cửa hàng thuộc DKI Jakarta với thêm bộ lọc `Kota`.[^2]
    - Cấp kota/quận: `/location/dki-jakarta/jakarta-barat` liệt kê riêng các cửa hàng ở Jakarta Barat, với lọc theo `Locality` (Kec Cengkareng, Kec Grogol Petamburan, Kec Palmerah…).[^4]
    - Cấp chi nhánh: URL kiểu slug dài theo tên chi nhánh + ngành + địa điểm + ID, ví dụ trang DAN+DAN Palmerah Utara.[^3]

Kiến trúc 3–4 tầng như vậy trùng với best‑practice local landing pages: mỗi location có landing riêng, được “nhúng” trong cấu trúc tỉnh → kota → chi nhánh.[^5][^6]

***

## 2. Cấu trúc URL \& internal linking

### Cấu trúc URL

- Trang root: `https://store.dandanku.com/` với title “DAN+DAN Locator/Finder | Cosmetics Store” – chứa brand + từ khóa ngành.[^1]
- Trang “near me”: `/?lat=-6.203841&long=106.796203` với title “Locator/Finder Near Me | Cosmetics Store”.[^5]
- Tầng tỉnh/khu vực: `.../location/dki-jakarta` và `.../location/dki-jakarta/jakarta-barat` đều có từ “Locator” + tên khu vực + “Cosmetics Store” trong title.[^2][^4]
- Trang chi nhánh: slug chứa tên store + “cosmetics-store” + tên kec/kota + ID, title dạng “DAN+DAN Palmerah Utara, Kec Palmerah | Official toko”.[^3]

Đây là đúng guideline “localized URLs”: service + location xuất hiện rõ trong URL và title, giúp tăng relevance cho truy vấn kiểu “cosmetics store jakarta barat”, “toko kosmetik palmerah”.[^7][^6][^5]

### Internal linking

- Từ trang root và các trang tỉnh/kota, mỗi card cửa hàng đều có nút “Website” – rất nhiều khả năng trỏ đến landing page chi nhánh tương ứng (ví dụ card DAN+DAN Palmerah Utara → trang Palmerah Utara).[^4][^1][^2]
- Các trang danh sách đều có phân trang 1–2–3–Next–Last, tạo thêm nhiều hub page nội bộ liên kết qua lại quanh cùng một khu vực địa lý.[^5][^1][^2][^4]

Internal link dày giữa root → tỉnh → kota → chi nhánh giúp:

- Củng cố chủ đề “cosmetics store” + vùng Jakarta toàn site (topical \& geographic relevance).[^8]
- Tăng internal link tới từng landing được gắn vào GBP, điều mà các nghiên cứu local SEO đánh giá là một trong các on‑page signals quan trọng (GBP landing page title/URL/content).[^6][^8]

***

## 3. Tín hiệu GEO / Local hỗ trợ GBP

### Dữ liệu địa lý chi tiết

Trên hầu hết các lớp trang, mỗi cửa hàng đều có:

- Tên chi nhánh + brand (ví dụ “DAN+DAN Palmerah Utara”).[^1][^2][^4]
- Địa chỉ đầy đủ gồm: tên đường, số nhà, RT/RW, kelurahan, kecamatan, kota và mã bưu điện – ví dụ “Jl. Palmerah Utara 3, No 15, Rt. 03/06, Jakarta Barat, Kec Palmerah, Jakarta Barat, 11480”.[^3][^2][^4][^1]
- Số điện thoại riêng cho từng store, giờ mở cửa cụ thể (“Open until 10:00 PM” / “Buka Hingga 10:00 PM”).[^5][^2][^4][^1]

GBP ranking dựa trên 3 trụ: relevance, proximity, prominence; trong đó nội dung trên website (NAP, từ khóa, địa chỉ) là một trong các on‑page signals quan trọng để đánh giá relevance và xác nhận entity/local citation. Microsite này cung cấp NAP rất chi tiết và nhất quán, cực kỳ tốt để dùng làm landing page gắn vào từng GBP.[^8][^6]

### Trang “Near me” dùng lat/long

- URL `/?lat=-6.203841&long=106.796203` hiển thị danh sách “Toko DAN+DAN di Sekitar Anda” với khoảng cách theo km (0.0 KM, 3.4 KM, 3.9 KM…), kèm địa chỉ và CTA Call/Map/Website.[^5]
- Điều này cho phép tạo trải nghiệm “near me” thực sự (tự động lấy vị trí người dùng), đồng thời nội dung trang vẫn nhắc lại tên chi nhánh + địa chỉ + kota nhiều lần.[^5]

Về local SEO, Google ngày càng dùng dữ liệu hành vi và độ gần vị trí người dùng để xếp hạng GBP, nhưng một website có nội dung được tối ưu cho các truy vấn “near me” (title, nội dung, map) vẫn giúp tăng mức độ phù hợp và trải nghiệm cho người dùng click từ GBP sang website.[^9][^8]

***

## 4. Cấu trúc schema (suy luận từ dữ liệu hiển thị)

Ta không thấy trực tiếp JSON‑LD, nhưng có thể suy luận khá rõ vì giao diện lộ ra rất nhiều field trùng khớp với LocalBusiness schema:

### Các field gợi ý LocalBusiness/Store schema

Ở phần header/navigation của microsite có cả cụm “Rating and Reviews, Alternate business Name, Address, Landmark, Time, IFSC, Distance, W 3Words, About Plus Code, About Nearby Locality, About Parking Option, About Payment Method, About Business Hours, About Category, About Service…”.[^1]

Những field này map gần như 1‑1 với các thuộc tính LocalBusiness/Store:

- `address` (PostalAddress: streetAddress, addressLocality, addressRegion, postalCode).[^10][^11][^2]
- `geo` (kinh độ/vĩ độ, plus code, what3words).[^12][^10][^2]
- `openingHoursSpecification` (Time / Business Hours).[^12][^2]
- `paymentAccepted` / `hasOfferCatalog` (Payment Method, Service).[^11][^12]
- `aggregateRating` và `review` (Rating and Reviews + các review cụ thể ở trang chi nhánh).[^10][^3][^12]

Best practice cho brand đa chi nhánh là: mỗi landing của chi nhánh có LocalBusiness (hoặc subtype Store / HealthAndBeautyBusiness) riêng, với NAP, geo, giờ mở cửa, review… của đúng chi nhánh đó.[^2][^12][^10]
→ Với bộ field chi tiết như vậy trên mỗi trang store + sự phân tách URL rõ ràng, rất nhiều khả năng microsite đang implement đúng mô hình này (dù ta không nhìn được code).

### Cấu trúc multi‑location schema

Theo guideline cho multi‑location schema:

- Một entity Organization/Brand chính (DAN+DAN / PT Sumber Indah Lestari) làm parent.[^3][^12][^10][^2]
- Các chi nhánh là LocalBusiness (subtypes của Store/HealthAndBeautyBusiness) được liên kết qua subOrganization/parentOrganization.[^12][^2]

Trang chi nhánh Palmerah Utara có mô tả thương hiệu tổng “DAN+DAN (PT Sumber Indah Lestari) adalah perusahaan ritel kecantikan terkemuka di Indonesia dengan 300+ gerai sejak 2013…” rồi sau đó là câu tiếng Anh “The address of this toko is Jl. Palmerah Utara 3, No 15…”. Cách viết này rất giống pattern thường dùng trong JSON‑LD: một block Organization cấp brand + một block LocalBusiness cho chi nhánh; cả hai cùng xuất hiện trên cùng một trang.[^10][^2][^3]

### Kết nối schema với GBP

Các tài liệu về LocalBusiness schema cho biết:

- Mỗi landing trang chi nhánh có schema riêng sẽ giúp Google hiểu đây là các entity địa điểm riêng biệt, liên kết với từng GBP (qua NAP, URL, sameAs, toạ độ, review…).[^6][^10]
- Với retail bán hàng hóa, có thể kết hợp Product/Offer + LocalBusiness để gắn giá, tồn kho tại store – điều mà schema guide cho multi‑location local retailers khuyến nghị.[^12]

Vì trang Palmerah Utara liệt kê rất nhiều sản phẩm (Wardah, Maybelline, Somethinc, v.v.) kèm mô tả chi tiết và giá, đây là nền tảng tốt để cài thêm Product/Offer schema gắn với local store (nếu họ chưa làm thì là một “upgrade” mạnh).[^3][^12]

***

## 5. Nội dung \& tín hiệu AIO (AI Overviews / entity SEO)

### Nội dung chi nhánh rất “giàu thông tin”

Trang DAN+DAN Palmerah Utara:

- Chứa một đoạn mô tả thương hiệu/chains khá dài, nêu rõ lịch sử (từ 2013), quy mô hơn 300 gerai, lĩnh vực (makeup \& personal care) và tagline.[^3]
- Có câu “The address of this toko is …” dạng ngôn ngữ tự nhiên, giúp Google/AI dễ trích thông tin địa chỉ trong ngữ cảnh.[^3]
- Kèm theo nhiều review từ khách hàng được hiển thị nguyên văn (bao gồm bản dịch tiếng Anh và bản gốc tiếng Indonesia).[^3]

Các hướng dẫn mới về local landing pages nhấn mạnh:

- Trang location nên có nội dung mô tả chi tiết, review, thông tin đội ngũ/dịch vụ, nội dung thực sự hữu ích cho người dùng, chứ không phải vài câu generic.[^7][^4][^5]
- Nội dung giàu ngữ cảnh + review thực tế là tín hiệu tốt cả cho local SEO lẫn các hệ thống AI Overviews/SGE, vì chúng cần đoạn text tự nhiên để trích và tổng hợp.[^8][^10]


### Topical authority về “cosmetics / beauty”

Ngay trên trang chi nhánh họ đổ cả một “mini catalog” với hàng chục sản phẩm làm đẹp, mỗi sản phẩm có description chi tiết, công dụng, thành phần nổi bật và giá. Điều này giúp:[^3]

- Củng cố chủ đề chính của website là mỹ phẩm/beauty retail, hỗ trợ yếu tố “relevance” và “niche focus” trong local algorithm.[^8]
- Tạo thêm nhiều từ khóa dài liên quan đến brand sản phẩm + nhu cầu skincare/makeup tại khu vực, mà AI/Google có thể dùng để hiểu store này phục vụ nhu cầu gì cho khách địa phương.[^8][^5]

***

## 6. Các điểm mạnh chính giúp microsite hỗ trợ ranking GBP

Tổng hợp lại, những yếu tố nổi bật tạo lợi thế cho GBP của DAN+DAN khi dùng microsite này làm landing:

1. **Landing page riêng cho từng location**
    - Mỗi chi nhánh có URL riêng, title chứa tên store + khu vực + ngành (cosmetics store), nội dung \& NAP riêng biệt.[^3]
    - Đây là best practice hàng đầu cho multi‑location local SEO, giúp Google coi từng chi nhánh như một entity/location riêng khi xếp hạng GBP.[^6][^2][^10]
2. **Cấu trúc GEO rõ ràng (tỉnh → kota → locality → store)**
    - Bộ lọc theo “State / City / Locality” trên các trang location, cộng với tên kec/kota trong nội dung, tạo ra mạng lưới ngữ cảnh địa lý dày đặc quanh từng store.[^4][^2]
    - Điều này đi đúng hướng “geographic keyword relevance of content” – một yếu tố được ghi nhận trong nghiên cứu local ranking factors.[^8]
3. **NAP + giờ mở cửa + phone nhất quán trên toàn hệ thống**
    - Địa chỉ, mã bưu điện, số điện thoại, giờ mở cửa được nhắc lại trên mọi nơi có list store: root, province, city, near‑me.[^2][^4][^1][^5]
    - Sự nhất quán NAP và chi tiết giờ mở cửa là yếu tố nền tảng để Google tin tưởng và xếp hạng tốt hơn các GBP tương ứng.[^6][^8]
4. **Schema LocalBusiness đa chi nhánh (suy luận từ các field chuyên biệt)**
    - Số lượng field như Plus Code, W3Words, Payment, Parking, Rating \& Reviews, Business Hours cho thấy hệ thống này được thiết kế với mục đích feed structured data cho search engine.[^1]
    - Khi được mapping đúng vào LocalBusiness/Store schema riêng cho từng URL, đây là “cầu nối” chính thức giữa website và GBP (NAP, geo, review…), vốn được các tài liệu local schema coi là cực kỳ quan trọng.[^10][^2][^12]
5. **Nội dung dài + review thật trên trang chi nhánh**
    - Đoạn mô tả brand + địa chỉ dạng câu tự nhiên + review khách hàng tạo ra nội dung phong phú, giúp cả SEO truyền thống (on‑page content) lẫn các hệ thống AI Overviews dễ hiểu entity cửa hàng.[^4][^5][^8][^3]
6. **Trang “near me” dùng lat/long \& khoảng cách**
    - Về UX, đây là killer feature để phục vụ nhu cầu “toko dekat sini / near me”.[^5]
    - Về SEO, nội dung listing có nhắc lại đầy đủ tên, địa chỉ, khu vực cho các store gần vị trí người dùng, tăng coverage từ khóa “near me” nếu trang này index (hoặc ít nhất là hỗ trợ internal linking \& trải nghiệm khách đến từ GBP).[^9][^8]

***

## 7. Điểm yếu \& rủi ro / cơ hội tối ưu thêm

1. **Trang /location/ có xu hướng “mỏng” về nội dung text**
    - `/location/dki-jakarta` và `/location/dki-jakarta/jakarta-barat` chủ yếu là danh sách store + bộ lọc, gần như không có đoạn text mô tả riêng cho từng khu vực (không nói về đặc điểm khu vực, dịch vụ nổi bật…).[^2][^4]
    - Best practice khuyến nghị mỗi local landing nên có ít nhất 300–500 từ nội dung unique, mô tả rõ bối cảnh địa phương, dịch vụ, review, map… để tránh bị xem như “thin doorway pages”.[^13][^7][^4][^5]
→ Cơ hội: thêm section content riêng cho mỗi /location/ (ví dụ giới thiệu tổng quan DAN+DAN ở DKI Jakarta, Jakarta Barat, điểm mạnh, khu vực phục vụ, CTA đến blog/bài hướng dẫn làm đẹp địa phương…).
2. **Nguy cơ trùng lặp / over‑templated nếu scale quá mạnh**
    - Toàn bộ microsite dùng một template chung, field lặp lại nhiều, nếu số /location/ tăng quá lớn mà không thêm nội dung unique, có thể bị giảm chất lượng tổng thể của site theo khuyến cáo “đừng tạo quá nhiều trang location giống nhau >20% tổng số trang”.[^13][^4][^1][^2]
→ Cần kiểm soát số lượng location page và đảm bảo mỗi trang có yếu tố unique: nội dung text, review, hình ảnh thực tế, promo riêng.
3. **Chưa rõ subtype schema có đang dùng chuẩn nhất không**
    - Với ngành beauty/cosmetics, Schema.org khuyến nghị dùng subtype như HealthAndBeautyBusiness (BeautySalon, HealthClub, NailSalon) hoặc Store/HealthAndBeautyBusiness tùy hoạt động chính.[^14][^11][^2]
    - Nếu họ chỉ dùng generic LocalBusiness/Organization cho tất cả, vẫn tốt nhưng chưa khai thác hết độ chính xác về ngành.
→ Cơ hội: mapping chuẩn hơn sang `Store` + `HealthAndBeautyBusiness` để giúp Google hiểu rõ đây là chuỗi cửa hàng mỹ phẩm/beauty retail, nâng relevance cho nhóm từ khóa ngành.
4. **Trang “near me” với query lat/long có thể gây duplicate nếu được index đại trà**
    - Nhiều biến thể `/?lat=...&long=...` có nội dung tương tự (chỉ khác thứ tự và khoảng cách) dễ bị xem là near‑duplicate nếu được index rộng.[^5]
→ Lý tưởng: dùng trang near‑me cho UX (noindex, canonical về root hoặc 1 trang chuẩn), vẫn giữ lợi ích internal linking và trải nghiệm, tránh loãng index.
5. **Chưa thấy rõ integration trực tiếp với GBP bằng `sameAs`**
    - Dù icons Facebook, Google, Instagram, TikTok… xuất hiện trên header, ta không biết chắc chúng đã được nhúng vào schema `sameAs` cho từng store hay chưa.[^1][^3]
→ Cơ hội: với mỗi chi nhánh, thêm `sameAs` trỏ đến GBP, Facebook Page, Instagram của chi nhánh đó để tăng entity linking và “prominence” signals.[^12][^10][^2]

***

## 8. Gợi ý áp dụng khi xây microsite tương tự cho thương hiệu của bạn

Dựa trên những gì DAN+DAN đang làm và best‑practice local SEO hiện tại, khi bạn thiết kế microsite để hỗ trợ GBP, có thể tham khảo:

1. **Giữ kiến trúc tương tự (root locator → tỉnh/khu vực → kota/quận → chi nhánh)**
    - Dùng URL có từ khóa ngành + location.
    - Mỗi chi nhánh có landing riêng, được chọn làm “Website URL” trên GBP tương ứng.[^7][^6][^5]
2. **Triển khai LocalBusiness schema riêng cho từng chi nhánh**
    - Dùng subtype phù hợp ngành (ví dụ Store + HealthAndBeautyBusiness / BeautySalon / CosmeticsStore tùy case).[^14][^11][^2]
    - Mỗi schema gồm: name, address (PostalAddress), geo (lat/long), telephone, openingHours, image, sameAs (GBP, Facebook, IG), aggregateRating \& review nếu có.[^10][^2][^12]
3. **Tăng nội dung unique cho mỗi location page**
    - Thêm đoạn giới thiệu bối cảnh địa phương, loại khách hàng chính, dịch vụ nổi bật, ưu đãi riêng, hướng đi từ các landmark gần đó.[^7][^4][^5]
    - Nhúng Google Map, block review được chọn lọc, FAQ ngắn theo nhu cầu địa phương.
4. **Tối ưu AIO (AI Overviews) ngay từ đầu**
    - Viết một đoạn mô tả tự nhiên (3–5 câu) trả lời trọn vẹn “Đây là cửa hàng gì, ở đâu, phục vụ ai, có gì nổi bật”.[^4][^10][^8][^5]
    - Chèn rõ NAP trong câu văn (không chỉ ở block schema), để AI dễ trích dẫn khi làm câu trả lời tổng hợp.
5. **Kết nối chặt với GBP \& tracking hành vi**
    - Mỗi GBP dùng đúng landing địa phương tương ứng, đảm bảo keywords trong title/H1/URL khớp với category \& dịch vụ đã khai trên GBP.[^6][^8]
    - Theo dõi CTR từ GBP → website, click Call/Direction, thời gian onsite… vì các tín hiệu hành vi này ngày càng được dùng trong ranking.[^9][^8]

Nếu bạn muốn, ở bước tiếp theo tôi có thể:

- Phác thảo mẫu JSON‑LD LocalBusiness chuẩn cho 1 chi nhánh (tiếng Việt/tiếng Anh).
- Đề xuất cấu trúc URL \& nội dung chi tiết cho microsite local của thương hiệu bạn (theo thị trường Việt Nam).
<span style="display:none">[^15]</span>

<div align="center">⁂</div>

[^1]: https://www.webfx.com/blog/seo/google-business-profile-ranking-factors/

[^2]: https://aubreyyung.com/local-business-schema-multiple-locations/

[^3]: https://www.aoneseoservice.com/blog/gmb-ranking-factors/

[^4]: https://www.yadavbikash.com/blogs/local-landing-pages-seo/

[^5]: https://nogood.io/blog/local-landing-pages/

[^6]: https://www.semrush.com/blog/how-to-improve-local-seo/

[^7]: https://nogood.io/2024/04/22/local-landing-pages/

[^8]: https://www.brightlocal.com/learn/google-local-algorithm-and-ranking-factors/

[^9]: https://www.yadavbikash.com/blogs/google-business-profile-ranking-factors/

[^10]: https://www.semrush.com/blog/local-business-schema/

[^11]: https://schema.org/LocalBusiness

[^12]: https://www.localmighty.com/blog/local-business-schema-markup/

[^13]: https://www.linkedin.com/posts/timkahlert_10-powerful-tips-to-create-local-landing-activity-7291052307532689409-mXDw

[^14]: https://www.schemaapp.com/schema-markup/how-to-do-schema-markup-for-local-business/

[^15]: https://priceweber.com/blog/google-business-profile-ranking-success/

