# Modern MDX Blog System Documentation

Hệ thống blog MDX hiện đại được thiết kế tối ưu cho Wheelhouse Marine với hỗ trợ đa ngôn ngữ, SEO tối ưu và trải nghiệm người dùng tuyệt vời.

## 🏗️ Cấu trúc thư mục

```
content/
├── posts/              # Bài viết blog (MDX files)
├── categories/         # Danh mục (MDX files)  
└── authors/           # Tác giả (MDX files)

src/
├── app/[locale]/blog/        # Blog pages
│   ├── page.tsx             # Trang chính blog
│   └── [slug]/page.tsx      # Trang chi tiết bài viết
├── components/blog/          # Blog components
├── lib/blog/                # Blog utilities
├── types/blog.ts            # TypeScript types
└── styles/blog.css          # Blog-specific CSS
```

## 📝 Cách thêm bài viết mới

### 1. Tạo file MDX trong `content/posts/`

```bash
content/posts/ten-bai-viet.mdx
```

### 2. Thêm frontmatter

```yaml
---
title: "Tiêu đề bài viết"
excerpt: "Mô tả ngắn gọn về bài viết"
publishedAt: "2024-01-15"
updatedAt: "2024-01-20" # Optional
category: "communication"
tags: ["GMDSS", "maritime", "safety"]
author: "john-smith"
coverImage: "/images/blog/cover-image.jpg" # Optional
featured: true # Optional - hiển thị trong hero section
draft: false # Optional - bài nháp (không hiển thị ở production)
locale: "en" # hoặc "vi"
seo: # Optional - SEO optimization
  metaTitle: "Custom meta title"
  metaDescription: "Custom meta description"
  keywords: ["keyword1", "keyword2"]
  ogImage: "/images/blog/og-image.jpg"
---
```

### 3. Viết nội dung với MDX

```mdx
# Heading 1

Đây là paragraph với **bold text** và *italic text*.

## Heading 2

Danh sách:
- Item 1
- Item 2
- Item 3

### Code blocks

```javascript
const example = "Hello World";
console.log(example);
```

### Callouts đặc biệt

<Callout type="info">
Thông tin quan trọng
</Callout>

<Callout type="warning">
Cảnh báo
</Callout>

<Callout type="error">
Lỗi nghiêm trọng
</Callout>

<Callout type="success">
Thành công
</Callout>

### Details/Summary

<Details summary="Click để xem chi tiết">
Nội dung được ẩn/hiện
</Details>
```

## 📂 Quản lý Categories

### Tạo danh mục mới

Tạo file trong `content/categories/`:

```yaml
---
title: "Tên danh mục"
description: "Mô tả chi tiết về danh mục"
slug: "category-slug"
coverImage: "/images/categories/cover.jpg"
color: "#3B82F6" # Màu đại diện
locale: "en" # hoặc "vi"
---

# Mô tả chi tiết

Nội dung mô tả danh mục...
```

## 👤 Quản lý Authors

### Thêm tác giả mới

Tạo file trong `content/authors/`:

```yaml
---
name: "Tên tác giả"
bio: "Tiểu sử ngắn gọn"
avatar: "/images/authors/avatar.jpg"
position: "Chức vụ"
company: "Công ty"
social:
  linkedin: "https://linkedin.com/in/username"
  twitter: "https://twitter.com/username"
  github: "https://github.com/username"
  website: "https://example.com"
locale: "en" # hoặc "vi"
---

# Tiểu sử chi tiết

Nội dung chi tiết về tác giả...
```

## 🎨 Tùy chỉnh giao diện

### Thay đổi màu sắc

Chỉnh sửa trong `src/styles/blog.css`:

```css
/* Thay đổi màu chủ đạo */
.prose a {
  color: #your-color;
}

/* Dark mode */
.dark .prose a {
  color: #your-dark-color;
}
```

### Tùy chỉnh components

Các component chính có thể tùy chỉnh:

- `BlogPostCard.tsx` - Card hiển thị bài viết
- `BlogHero.tsx` - Hero section
- `BlogSidebar.tsx` - Sidebar với filters
- `MDXComponents.tsx` - Custom MDX components

## 🔍 SEO & Performance

### Tự động tối ưu

- ✅ Meta tags tự động từ frontmatter
- ✅ Open Graph & Twitter Cards
- ✅ Structured data cho search engines
- ✅ Sitemap tự động
- ✅ Image optimization với Next.js Image
- ✅ Static generation cho tốc độ tải nhanh

### Tùy chỉnh SEO

```yaml
seo:
  metaTitle: "Custom title for search engines"
  metaDescription: "Custom description under 160 characters"
  keywords: ["keyword1", "keyword2", "keyword3"]
  ogImage: "/images/blog/custom-og-image.jpg"
```

## 🌐 Đa ngôn ngữ (i18n)

### Hỗ trợ ngôn ngữ

- Tiếng Anh (`en`)
- Tiếng Việt (`vi`)

### Thêm bài viết đa ngôn ngữ

```yaml
# Bài viết tiếng Anh
---
locale: "en"
title: "English Title"
---

# Bài viết tiếng Việt  
---
locale: "vi"  
title: "Tiêu đề tiếng Việt"
---
```

## 📊 Analytics & Tracking

### Tích hợp Google Analytics

Thêm vào `next.config.ts`:

```typescript
const nextConfig = {
  env: {
    GOOGLE_ANALYTICS_ID: 'GA-MEASUREMENT-ID'
  }
}
```

### Reading time tracking

Tự động tính toán thời gian đọc dựa trên số từ trong bài viết.

## 🚀 Deployment

### Build production

```bash
pnpm build
```

### Kiểm tra local

```bash
pnpm dev
```

Truy cập: `http://localhost:3000/blog`

## 🔧 API & Utilities

### Các hàm utility chính

```typescript
import { 
  getAllPosts, 
  getPostBySlug, 
  getFeaturedPosts,
  getPostsByCategory,
  searchPosts 
} from '@/lib/blog/mdx'

// Lấy tất cả bài viết
const posts = getAllPosts('en')

// Lấy bài viết theo slug
const post = getPostBySlug('post-slug', 'en')

// Lấy bài viết nổi bật
const featured = getFeaturedPosts(3, 'en')

// Tìm kiếm
const results = searchPosts('GMDSS', 'en')
```

### Filtering & Pagination

```typescript
import { paginatePosts } from '@/lib/blog/mdx'

const paginatedData = paginatePosts(posts, page, postsPerPage)
```

## 🛠️ Troubleshooting

### Lỗi thường gặp

1. **MDX không render**: Kiểm tra frontmatter syntax
2. **Images không hiển thị**: Đảm bảo path đúng trong `public/`
3. **Build error**: Kiểm tra TypeScript types

### Debug mode

```bash
NODE_ENV=development pnpm dev
```

## 📈 Performance Optimization

### Image optimization

- Sử dụng Next.js Image component
- WebP format tự động
- Lazy loading
- Responsive images

### Code splitting

- Automatic route-based splitting
- Dynamic imports cho components lớn
- MDX content lazy loading

## 🔒 Security

### Content validation

- Sanitize user input trong search
- Validate frontmatter
- Safe MDX rendering

### Rate limiting

Implement rate limiting cho search API nếu cần.

## 📱 Mobile Optimization

### Responsive design

- Mobile-first approach
- Touch-friendly navigation
- Optimized reading experience
- Fast loading on mobile networks

## 🤝 Contributing

### Quy trình thêm feature

1. Fork repository
2. Tạo feature branch
3. Implement changes
4. Add tests
5. Submit pull request

### Code style

- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component naming conventions

---

## 📞 Support

Để được hỗ trợ kỹ thuật, liên hệ team Wheelhouse Marine hoặc tạo issue trên repository.
