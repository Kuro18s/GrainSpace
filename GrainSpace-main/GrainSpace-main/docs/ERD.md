# ERD và database schema bản đầu (Thành viên 1, Tuần 1)

```mermaid
erDiagram
  USERS ||--o| PROVIDERS : "là"
  PROVIDERS ||--o{ CREATIVE_SPACES : "sở hữu"
  CREATIVE_SPACES ||--o{ EQUIPMENT : "có"
  CREATIVE_SPACES ||--o{ PACKAGES : "có"
  USERS ||--o{ BOOKINGS : "đặt"
  CREATIVE_SPACES ||--o{ BOOKINGS : "được đặt"
  BOOKINGS ||--o{ PAYMENTS : "thanh toán"
  BOOKINGS ||--o| REVIEWS : "được đánh giá"
  USERS ||--o{ CONTENTS : "đăng"

  USERS { int id PK; string email UK; string password_hash; string full_name; string role; datetime created_at }
  PROVIDERS { int id PK; int user_id FK; string business_name; string phone; string address }
  CREATIVE_SPACES { int id PK; int provider_id FK; string name; string type; string district; int area; int capacity; int price_per_hour; string style; text description; string open_time; string close_time; bool active }
  EQUIPMENT { int id PK; int space_id FK; string name; string status }
  PACKAGES { int id PK; int space_id FK; string name; int hours; int price }
  BOOKINGS { int id PK; int user_id FK; int space_id FK; datetime start_time; datetime end_time; string status; text note; int total_price; datetime created_at }
  PAYMENTS { int id PK; int booking_id FK; int amount; string method; string status }
  REVIEWS { int id PK; int booking_id FK; float rating; text comment }
  CONTENTS { int id PK; int author_id FK; string title; text body; string kind }
```

- `users.role`: `photographer | provider | expert | admin`.
- `bookings.status`: `pending → confirmed`, hoặc `rejected`, hoặc `cancelled`.
- `equipment.status`: `available | maintenance`.
- Đã có API ở MVP: users, providers, creative_spaces, equipment, bookings. Còn lại (packages, payments, reviews, contents) mới có schema trong `backend/models.py`.
