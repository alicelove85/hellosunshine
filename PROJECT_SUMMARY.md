# 🌞 Hello Sunshine - 프로젝트 요약

## 프로젝트 정보
- **이름**: Hello Sunshine
- **설명**: 인도네시아 니아스 소라케 비치 서퍼를 위한 홈스테이 예약 웹사이트
- **위치**: 니아스 소라케 비치 (서핑천국, 매일 파도가 있는 곳)
- **연락처**: +62 081236557548
- **Google Maps**: https://maps.app.goo.gl/sA2AnaKVtuoA3Nrq7

---

## 🛠️ 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **다국어 지원**: next-intl (영어, 인도네시아어, 한국어)
- **애니메이션**: Framer Motion
- **캘린더**: react-day-picker
- **아이콘**: Lucide React

---

## 🏠 객실 정보 (총 8개)

| 객실 | 수량 | 가격 (1박) | 특징 |
|------|------|-----------|------|
| 오션뷰 스튜디오 | 3개 | IDR 450K | 45㎡ (4.5×10m), 오션뷰 발코니, 주방 (인덕션 & 전자렌지) |
| 패밀리룸 | 1개 | IDR 450K | 방/거실 분리형, 킹+싱글 베드, 최대 4인 |
| 스탠다드 룸 | 4개 | IDR 350K | 킹사이즈 베드, 주방 |

### 공통 시설
- 킹사이즈 베드 (180×200)
- 주방
- 에어컨
- 세탁기
- 냉장고
- 온수
- ※ 7박 이상 장기 숙박 시 전기세 불포함

---

## 💰 장기 숙박 할인

| 기간 | 할인율 |
|------|--------|
| 7박 이상 | 10% |
| 14박 이상 | 15% |
| 30박 이상 | 20% |

### 할인 적용 가격표

| 객실 | 1박 | 7박 (10%) | 14박 (15%) | 30박 (20%) |
|------|-----|-----------|------------|------------|
| 오션뷰/패밀리 | 450K | 2,835K | 5,355K | 10,800K |
| 스탠다드 | 350K | 2,205K | 4,165K | 8,400K |

---

## 🎯 서비스

| 서비스 | 가격 | 설명 |
|--------|------|------|
| 🍳 조식 | IDR 50K/1인 | 홈메이드 조식, 커피 포함 |
| 🚗 공항 픽업 | IDR 600K | 비나카 공항에서 픽업 |
| 🏍️ 오토바이 렌탈 | IDR 50K/일 | 섬 탐험용 |
| 🏄 서핑 레슨 | IDR 300K~ | 로컬 강사 |
| 🏄‍♂️ 보드 렌탈 | IDR 100K/일~ | 숏보드, 롱보드, 폼보드 |
| 📸 서핑 촬영 | IDR 200K/2시간 | 프로 서핑 촬영 |

---

## 💳 결제 안내

- **예약금**: IDR 500,000 (예약 확정 필수)
- **잔금**: 현지에서 현금 또는 계좌이체로 결제

---

## 📂 프로젝트 구조

```
hello-sunshine/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx      # 메인 레이아웃
│   │   │   ├── page.tsx        # 홈페이지
│   │   │   └── admin/
│   │   │       ├── layout.tsx  # 관리자 레이아웃
│   │   │       └── page.tsx    # 관리자 페이지
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── RoomsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── BookingSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── lib/
│   │   └── bookingStore.ts     # 예약 데이터 관리
│   ├── messages/
│   │   ├── en.json             # 영어
│   │   ├── id.json             # 인도네시아어
│   │   └── ko.json             # 한국어
│   ├── i18n.ts
│   └── middleware.ts
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── README.md
```

---

## 🌐 URL 구조

| 페이지 | URL |
|--------|-----|
| 홈 (한국어) | /ko |
| 홈 (영어) | /en |
| 홈 (인도네시아어) | /id |
| 관리자 페이지 | /ko/admin |

---

## 🚀 실행 방법

```bash
# 프로젝트 디렉토리로 이동
cd /Users/eatwell/Documents/rapidclass/hello-sunshine

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 확인
# http://localhost:3000/ko
```

---

## 📝 배포 방법 (Vercel)

1. GitHub에 코드 업로드
2. [vercel.com](https://vercel.com) 가입
3. GitHub 저장소 연결
4. 자동 배포
5. 도메인 연결 (Settings → Domains)

### DNS 설정 (도메인 구매 후)
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📅 개발 일자
- **생성일**: 2026년 1월 9일

---

## 📞 연락처 정보
- **WhatsApp**: +62 081236557548
- **이메일**: hello@hellosunshine.surf
- **인스타그램**: @hellosunshine.nias
- **위치**: 니아스 소라케 비치, 북수마트라, 인도네시아

---

## 🔧 향후 추가 가능 기능
- [ ] 실제 결제 시스템 연동 (Stripe, PayPal)
- [ ] 이메일 알림 시스템
- [ ] 실제 객실 사진 업로드
- [ ] 리뷰 시스템
- [ ] 실시간 객실 가용성 체크
- [ ] 다국어 이메일 템플릿

---

*Hello Sunshine - 서핑하기 위한 완벽한 공간* 🏄‍♂️🌊


