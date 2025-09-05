# Translation System Documentation

## Tổng quan

Hệ thống blog hỗ trợ đa ngôn ngữ (i18n) với khả năng liên kết bài viết có cùng nội dung nhưng khác ngôn ngữ.

## Cách thức hoạt động

### 1. Translation Key (Khuyến nghị)

Sử dụng `translationKey` để nhóm các bài viết cùng nội dung:

```yaml
# Bài viết tiếng Anh
---
title: "Introduction to Maritime Communication Systems"
locale: "en"
translationKey: "maritime-communication-intro"
translations:
  en: "maritime-communication-systems"
  vi: "he-thong-thong-tin-hang-hai"
---

# Bài viết tiếng Việt  
---
title: "Giới thiệu Hệ thống Thông tin Hàng hải"
locale: "vi"
translationKey: "maritime-communication-intro"
translations:
  en: "maritime-communication-systems"
  vi: "he-thong-thong-tin-hang-hai"
---
```

### 2. Translations Object

Object `translations` chứa mapping slug của tất cả ngôn ngữ:

```yaml
translations:
  en: "slug-tieng-anh"
  vi: "slug-tieng-viet"
  # Có thể mở rộng thêm ngôn ngữ khác
```

## API Functions

### getPostTranslations()

Tìm tất cả bài viết có cùng translationKey:

```typescript
import { getPostTranslations } from '@/lib/blog/mdx'

const translations = getPostTranslations(post)
// Trả về: Post[] - Mảng các bài viết cùng nội dung
```

### getPostByTranslationKey()

Lấy bài viết theo translationKey và locale:

```typescript
import { getPostByTranslationKey } from '@/lib/blog/mdx'

const post = getPostByTranslationKey('maritime-communication-intro', 'vi')
// Trả về: Post | null
```

### getAvailableTranslations()

Lấy danh sách các ngôn ngữ có sẵn cho bài viết:

```typescript
import { getAvailableTranslations } from '@/lib/blog/mdx'

const translations = getAvailableTranslations(post)
// Trả về: Array<{ locale: 'en' | 'vi', slug: string }>
```

## Components

### LanguageSwitcher

Component hiển thị language switcher trên trang bài viết:

```tsx
import { LanguageSwitcher } from '@/components/blog/LanguageSwitcher'

<LanguageSwitcher post={post} className="mt-4" />
```

**Features:**
- Hiển thị ngôn ngữ hiện tại (inactive)
- Link đến các bản dịch khác
- Flag emoji cho mỗi ngôn ngữ
- Responsive design

## Workflow tạo bài viết đa ngôn ngữ

### Bước 1: Tạo bài viết tiếng Anh
```bash
touch content/posts/my-article-en.mdx
```

```yaml
---
title: "My Article Title"
locale: "en"
translationKey: "my-article"
translations:
  en: "my-article-en"
---
```

### Bước 2: Tạo bài viết tiếng Việt
```bash
touch content/posts/my-article-vi.mdx
```

```yaml
---
title: "Tiêu đề bài viết"
locale: "vi"
translationKey: "my-article"
translations:
  en: "my-article-en"
  vi: "my-article-vi"
---
```

### Bước 3: Cập nhật bài viết tiếng Anh
Thêm slug tiếng Việt vào translations:

```yaml
translations:
  en: "my-article-en"
  vi: "my-article-vi"
```

## Best Practices

### 1. Naming Convention
- Slug EN: `topic-name-en` 
- Slug VI: `topic-name-vi`
- Translation Key: `topic-name`

### 2. Consistent Translation Key
Luôn sử dụng cùng một `translationKey` cho tất cả bài viết cùng nội dung.

### 3. Complete Translations Object
Đảm bảo object `translations` có đầy đủ mapping cho tất cả ngôn ngữ.

### 4. Content Parity
Nội dung các bản dịch nên tương đương nhau về độ dài và chi tiết.

## Routing

- English: `/en/blog/my-article-en`
- Vietnamese: `/vi/blog/my-article-vi`

Language switcher sẽ tự động tạo đúng route.

## SEO Considerations

### Hreflang Tags
Hệ thống tự động tạo hreflang tags cho SEO:

```html
<link rel="alternate" href="/en/blog/article" hreflang="en" />
<link rel="alternate" href="/vi/blog/article" hreflang="vi" />
```

### Canonical URLs
Mỗi bản dịch có canonical URL riêng, không duplicate content.

## Troubleshooting

### Lỗi: LanguageSwitcher không hiển thị
**Nguyên nhân:** Thiếu hoặc sai object `translations`
**Giải pháp:** Kiểm tra frontmatter có đúng format không

### Lỗi: Link dẫn 404
**Nguyên nhân:** Slug trong `translations` không khớp với file name
**Giải pháp:** Đảm bảo slug mapping chính xác

### Lỗi: Không tìm thấy translation
**Nguyên nhân:** `translationKey` không nhất quán
**Giải pháp:** Dùng cùng một translationKey cho tất cả bản dịch

## Future Enhancements

1. **Auto-detection:** Tự động detect bài viết cùng translationKey
2. **Missing translation alerts:** Cảnh báo khi thiếu bản dịch
3. **Translation status:** Tracking tình trạng dịch thuật
4. **Bulk operations:** Tools để manage translations hàng loạt
