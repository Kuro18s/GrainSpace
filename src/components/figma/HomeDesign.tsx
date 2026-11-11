import { CurrentUserGreeting, CurrentUserIdentity } from '@/components/CurrentUserIdentity'
import Link from 'next/link'

const assetPathPrefix = '/assets'
const imgCameraStillLife =
  'https://images.unsplash.com/photo-1520522801082-bc68bc09689f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1800'
const imgResourcePhotograph =
  'https://images.unsplash.com/photo-1654572628275-efb1c0ad15fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'
const imgResourcePhotograph1 =
  'https://images.unsplash.com/photo-1675221707607-4a49d00bb308?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'
const imgResourcePhotograph2 =
  'https://images.unsplash.com/photo-1637408982203-2eb65bd6aa22?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'
const imgAperture = `${assetPathPrefix}/ec17a.svg`
const imgBell = `${assetPathPrefix}/d5e8b.svg`
const imgArrowUpRight = `${assetPathPrefix}/b6435.svg`
const imgArrowUpRight1 = `${assetPathPrefix}/79067.svg`
const imgCamera = `${assetPathPrefix}/2e8bd.svg`
const imgScanLine = `${assetPathPrefix}/93bc8.svg`
const imgWarehouse = `${assetPathPrefix}/a7150.svg`
const imgGraduationCap = `${assetPathPrefix}/0e9e5.svg`
const imgCalendarRange = `${assetPathPrefix}/eba60.svg`
const imgImages = `${assetPathPrefix}/17672.svg`
const imgSparkles = `${assetPathPrefix}/77242.svg`

export default function TrangChFilmSpace() {
  return (
    <div
      className="bg-[#080b0e] content-stretch flex flex-col items-start relative size-full"
      data-node-id="3:13560"
      data-name="Trang chủ · FILM//SPACE"
    >
      <div
        className="bg-[#080b0e] border-[#26333f] border-b border-solid content-stretch flex h-[80px] items-center justify-between overflow-clip px-[48px] relative shrink-0 w-full"
        data-node-id="3:13561"
        data-name="Điều hướng chính"
      >
        <div
          className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0"
          data-node-id="3:13562"
          data-name="Brand"
        >
          <div
            className="relative shrink-0 size-[28px]"
            data-node-id="3:15051"
            data-name="aperture"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAperture} />
          </div>
          <p
            className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[22px] tracking-[-0.7px] whitespace-nowrap"
            data-node-id="3:13564"
          >{`FILM//SPACE`}</p>
        </div>
        <div
          className="content-stretch flex gap-[28px] items-center overflow-clip relative shrink-0"
          data-node-id="3:13565"
          data-name="Navigation links"
        >
          <div
            className="content-stretch flex flex-col gap-[9px] items-start overflow-clip relative shrink-0"
            data-node-id="3:13566"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px] whitespace-nowrap"
              data-node-id="3:13567"
            >
              Tổng quan
            </p>
            <div
              className="bg-[#42d9f3] h-[2px] relative shrink-0 w-[22px]"
              data-node-id="3:13568"
              data-name="Active rule"
            />
          </div>
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
            data-node-id="3:13569"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
              data-node-id="3:13570"
            >
              Không gian
            </p>
          </div>
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
            data-node-id="3:13571"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
              data-node-id="3:13572"
            >
              Cộng đồng
            </p>
          </div>
          <Link
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
            href="/collection"
            data-node-id="3:13573"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
              data-node-id="3:13574"
            >
              Bộ sưu tập
            </p>
          </Link>
        </div>
        <div
          className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0"
          data-node-id="3:13575"
          data-name="Account"
        >
          <div className="relative shrink-0 size-[18px]" data-node-id="3:15054" data-name="bell">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBell} />
          </div>
          <div
            className="bg-[#26333f] h-[28px] relative shrink-0 w-px"
            data-node-id="3:13577"
            data-name="Separator"
          />
          <CurrentUserIdentity />
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[40px] items-start overflow-clip pb-[32px] pt-[38px] px-[48px] relative shrink-0 w-full"
        data-node-id="3:13583"
        data-name="Mở đầu hành trình"
      >
        <div
          className="[word-break:break-word] content-stretch flex font-['JetBrains_Mono:Regular'] font-normal items-start justify-between leading-[1.5] overflow-clip relative shrink-0 text-[11px] tracking-[1px] w-full whitespace-nowrap"
          data-node-id="3:13584"
          data-name="Session status"
        >
          <p className="relative shrink-0 text-[#42d9f3]" data-node-id="3:13585">
            <CurrentUserGreeting />
          </p>
          <p className="relative shrink-0 text-[#95a7b5]" data-node-id="3:13586">
            TP. HỒ CHÍ MINH · 02.11.2026
          </p>
        </div>
        <div
          className="content-stretch flex gap-[40px] items-center overflow-clip relative shrink-0 w-full"
          data-node-id="3:13587"
          data-name="Hero composition"
        >
          <div
            className="content-stretch flex flex-col gap-[26px] items-start overflow-clip relative shrink-0 w-[640px]"
            data-node-id="3:13588"
            data-name="Creative promise"
          >
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#ffb657] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13589"
            >
              01 / KẾT NỐI CỘNG ĐỒNG NHIẾP ẢNH PHIM
            </p>
            <div
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#edf3f5] text-[70px] tracking-[-3px] w-[min-content]"
              data-node-id="3:13590"
            >
              <p className="leading-[1.06] mb-0">Từ cuộn phim,</p>
              <p className="leading-[1.06] mb-0">đến không gian</p>
              <p className="leading-[1.06]">của riêng bạn.</p>
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[17px] w-[min-content]"
              data-node-id="3:13591"
            >
              Đặt phòng tối, tìm studio và thiết bị phù hợp. Kết nối cùng chuyên gia để biến ý tưởng
              thành những khung hình có thật.
            </p>
            <div
              className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0"
              data-node-id="3:13592"
              data-name="Hero actions"
            >
              <div
                className="bg-[#42d9f3] border border-[#42d9f3] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[22px] py-[14px] relative rounded-[4px] shrink-0"
                data-node-id="3:13593"
                data-name="Action"
              >
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#080b0e] text-[14px] whitespace-nowrap"
                  data-node-id="3:13594"
                >
                  Tìm không gian sáng tạo
                </p>
                <div
                  className="relative shrink-0 size-[15px]"
                  data-node-id="3:15057"
                  data-name="arrow-up-right"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgArrowUpRight}
                  />
                </div>
              </div>
              <div
                className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[22px] py-[14px] relative rounded-[4px] shrink-0"
                data-node-id="3:13596"
                data-name="Action"
              >
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[14px] whitespace-nowrap"
                  data-node-id="3:13597"
                >
                  Khám phá cộng đồng
                </p>
                <div
                  className="relative shrink-0 size-[15px]"
                  data-node-id="3:15060"
                  data-name="arrow-up-right"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgArrowUpRight1}
                  />
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[24px] items-start overflow-clip pt-[12px] relative shrink-0"
              data-node-id="3:13599"
              data-name="Trust signals"
            >
              <div
                className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                data-node-id="3:13600"
                data-name="Status"
              >
                <div
                  className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                  data-node-id="3:13601"
                  data-name="Indicator"
                />
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                  data-node-id="3:13602"
                >
                  LỊCH TRỐNG ĐỒNG BỘ
                </p>
              </div>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13603"
              >
                KHÔNG GIAN + THIẾT BỊ + CẢM HỨNG
              </p>
            </div>
          </div>
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[470px] items-start min-w-px overflow-clip p-[14px] relative"
            data-node-id="3:13604"
            data-name="Analog still life"
          >
            <div
              className="[word-break:break-word] content-stretch flex font-['JetBrains_Mono:Regular'] font-normal items-start justify-between leading-[1.5] overflow-clip relative shrink-0 text-[11px] tracking-[1px] w-full whitespace-nowrap"
              data-node-id="3:13605"
              data-name="Frame metadata"
            >
              <p className="relative shrink-0 text-[#ffb657]" data-node-id="3:13606">
                FRAME / 036
              </p>
              <p className="relative shrink-0 text-[#95a7b5]" data-node-id="3:13607">
                ISO 400 · 35 MM
              </p>
            </div>
            <div
              className="h-[352px] relative shrink-0 w-full"
              data-node-id="3:13608"
              data-name="Camera still life"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgCameraStillLife}
              />
            </div>
            <div
              className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
              data-node-id="3:13609"
              data-name="Negative edge"
            >
              <div
                className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0"
                data-node-id="3:13610"
                data-name="Film perforations"
              >
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13611"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13612"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13613"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13614"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13615"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13616"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13617"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13618"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13619"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13620"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13621"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13622"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13623"
                  data-name="Perforation"
                />
                <div
                  className="bg-[#26333f] h-[8px] relative rounded-[2px] shrink-0 w-[12px]"
                  data-node-id="3:13624"
                  data-name="Perforation"
                />
              </div>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13625"
              >
                →
              </p>
            </div>
          </div>
        </div>
        <div
          className="[word-break:break-word] border-[#26333f] border-solid border-t content-stretch flex font-normal items-start overflow-clip pt-[28px] relative shrink-0 w-full whitespace-nowrap"
          data-node-id="3:13626"
          data-name="Ecosystem snapshot"
        >
          <div
            className="content-stretch flex flex-[1_0_0] gap-[18px] items-center min-w-px overflow-clip relative"
            data-node-id="3:13627"
            data-name="Snapshot metric"
          >
            <p
              className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[30px]"
              data-node-id="3:13628"
            >
              24
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
              data-node-id="3:13629"
            >
              KHÔNG GIAN
            </p>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] gap-[18px] items-center min-w-px overflow-clip relative"
            data-node-id="3:13630"
            data-name="Snapshot metric"
          >
            <p
              className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[30px]"
              data-node-id="3:13631"
            >
              86
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
              data-node-id="3:13632"
            >
              THIẾT BỊ KHẢ DỤNG
            </p>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] gap-[18px] items-center min-w-px overflow-clip relative"
            data-node-id="3:13633"
            data-name="Snapshot metric"
          >
            <p
              className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[30px]"
              data-node-id="3:13634"
            >
              1.280
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
              data-node-id="3:13635"
            >
              THÀNH VIÊN
            </p>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] gap-[18px] items-center min-w-px overflow-clip relative"
            data-node-id="3:13636"
            data-name="Snapshot metric"
          >
            <p
              className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[30px]"
              data-node-id="3:13637"
            >
              12
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
              data-node-id="3:13638"
            >
              CHUYÊN GIA
            </p>
          </div>
        </div>
        <p
          className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#617584] text-[11px] tracking-[1px] whitespace-nowrap"
          data-node-id="3:13639"
        >
          * SỐ LIỆU VÀ ĐỐI TÁC MINH HỌA CHO ĐỒ ÁN
        </p>
      </div>
      <div
        className="border-[#26333f] border-solid border-t content-stretch flex flex-col gap-[30px] items-start overflow-clip px-[48px] py-[56px] relative shrink-0 w-full"
        data-node-id="3:13640"
        data-name="Hệ sinh thái sáng tạo"
      >
        <div
          className="content-stretch flex gap-[60px] items-end overflow-clip relative shrink-0 w-full"
          data-node-id="3:13641"
          data-name="Section heading"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13642"
            data-name="Title group"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13643"
            >
              02 / HỆ SINH THÁI
            </p>
            <p
              className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[30px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13644"
            >
              Một điểm chạm. Mọi nguồn lực.
            </p>
          </div>
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[460px]"
            data-node-id="3:13645"
            data-name="Section description"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[14px] w-full"
              data-node-id="3:13646"
            >
              Từ người chụp đến người vận hành, cùng chia sẻ một lịch tài nguyên và một niềm yêu
              thích nhiếp ảnh phim.
            </p>
          </div>
        </div>
        <div
          className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="3:13647"
          data-name="Ecosystem architecture"
        >
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[18px] items-start min-w-px overflow-clip p-[24px] relative"
            data-node-id="3:13648"
            data-name="Ecosystem node"
          >
            <div
              className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
              data-node-id="3:13649"
              data-name="Node identity"
            >
              <div
                className="relative shrink-0 size-[24px]"
                data-node-id="3:15063"
                data-name="camera"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgCamera}
                />
              </div>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#617584] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13651"
              >
                ↔
              </p>
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[20px] tracking-[-0.7px] w-full"
              data-node-id="3:13652"
            >
              Nhiếp ảnh gia
            </p>
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[10px] w-full"
              data-node-id="3:13653"
            >
              Ý tưởng · Hồ sơ · Bộ sưu tập
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13654"
            >
              Tìm đúng không gian cho mỗi dự án.
            </p>
            <Link
              className="mt-auto text-[12px] font-bold text-[#42d9f3]"
              href="/collection"
            >
              Xem tác phẩm & hồ sơ ↗
            </Link>
          </div>
          <div
            className="bg-[#102c36] border border-[#42d9f3] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[18px] items-start min-w-px overflow-clip p-[24px] relative"
            data-node-id="3:13655"
            data-name="Ecosystem node"
          >
            <div
              className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
              data-node-id="3:13656"
              data-name="Node identity"
            >
              <div
                className="relative shrink-0 size-[24px]"
                data-node-id="3:15066"
                data-name="scan-line"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgScanLine}
                />
              </div>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13658"
              >
                CORE
              </p>
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[20px] tracking-[-0.7px] w-full"
              data-node-id="3:13659"
            >{`FILM//SPACE`}</p>
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[10px] w-full"
              data-node-id="3:13660"
            >
              Lịch trống · Đặt chỗ · Kết nối
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13661"
            >
              Ghép đúng người với đúng nguồn lực.
            </p>
            <Link className="mt-auto text-[12px] font-bold text-[#42d9f3]" href="/spaces">
              Tìm & đặt không gian ↗
            </Link>
          </div>
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[18px] items-start min-w-px overflow-clip p-[24px] relative"
            data-node-id="3:13662"
            data-name="Ecosystem node"
          >
            <div
              className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
              data-node-id="3:13663"
              data-name="Node identity"
            >
              <div
                className="relative shrink-0 size-[24px]"
                data-node-id="3:15069"
                data-name="warehouse"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgWarehouse}
                />
              </div>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#617584] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13665"
              >
                ↔
              </p>
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[20px] tracking-[-0.7px] w-full"
              data-node-id="3:13666"
            >
              Nhà cung cấp
            </p>
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[10px] w-full"
              data-node-id="3:13667"
            >
              Phòng · Thiết bị · Gói dịch vụ
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13668"
            >
              Vận hành hiệu quả, không trùng lịch.
            </p>
            <Link className="mt-auto text-[12px] font-bold text-[#42d9f3]" href="/provider">
              Mở cổng nhà cung cấp ↗
            </Link>
          </div>
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[18px] items-start min-w-px overflow-clip p-[24px] relative"
            data-node-id="3:13669"
            data-name="Ecosystem node"
          >
            <div
              className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
              data-node-id="3:13670"
              data-name="Node identity"
            >
              <div
                className="relative shrink-0 size-[24px]"
                data-node-id="3:15072"
                data-name="graduation-cap"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGraduationCap}
                />
              </div>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#617584] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13672"
              >
                ↔
              </p>
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[20px] tracking-[-0.7px] w-full"
              data-node-id="3:13673"
            >{`Chuyên gia & AI`}</p>
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[10px] w-full"
              data-node-id="3:13674"
            >
              Tri thức · Workshop · Gợi ý
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13675"
            >
              Học hỏi và hoàn thiện chất ảnh.
            </p>
            <div className="mt-auto flex flex-wrap gap-3">
              <Link className="text-[12px] font-bold text-[#42d9f3]" href="/community">
                Góc chuyên gia ↗
              </Link>
              <button
                className="border-0 bg-transparent p-0 text-[12px] font-bold text-[#ffb657]"
                data-name="Action"
                type="button"
              >
                Hỏi trợ lý MUSE ↗
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#0d1218] content-stretch flex flex-col gap-[28px] items-start overflow-clip px-[48px] py-[56px] relative shrink-0 w-full"
        data-node-id="3:13676"
        data-name="Tài nguyên sáng tạo"
      >
        <div
          className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="3:13677"
          data-name="Section heading"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-[850px]"
            data-node-id="3:13678"
            data-name="Title group"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13679"
            >{`03 / KHÔNG GIAN & THIẾT BỊ`}</p>
            <p
              className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[30px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13680"
            >
              Chọn nơi ý tưởng được thành hình.
            </p>
            <p
              className="font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[14px] w-[min-content]"
              data-node-id="3:13681"
            >
              Những nguồn lực được tuyển chọn cho lần chụp, tráng và in tiếp theo của bạn.
            </p>
          </div>
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[4px] shrink-0"
            data-node-id="3:13682"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[12px] whitespace-nowrap"
              data-node-id="3:13683"
            >
              Xem tất cả tài nguyên
            </p>
            <div
              className="relative shrink-0 size-[15px]"
              data-node-id="3:15075"
              data-name="arrow-up-right"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgArrowUpRight1}
              />
            </div>
          </div>
        </div>
        <div
          className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="3:13685"
          data-name="Resource collection"
        >
          <div
            className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
            data-node-id="3:13686"
            data-name="Resource card"
          >
            <div
              className="h-[215px] relative shrink-0 w-full"
              data-node-id="3:13687"
              data-name="Resource photograph"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgResourcePhotograph}
              />
            </div>
            <div
              className="content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[22px] relative shrink-0 w-full"
              data-node-id="3:13688"
              data-name="Resource details"
            >
              <div
                className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="3:13689"
                data-name="Availability"
              >
                <div
                  className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:13690"
                  data-name="Status"
                >
                  <div
                    className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                    data-node-id="3:13691"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                    data-node-id="3:13692"
                  >
                    Sẵn sàng
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#ffb657] text-[11px] tracking-[1px] whitespace-nowrap"
                  data-node-id="3:13693"
                >
                  ★ 4,9
                </p>
              </div>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[23px] tracking-[-0.7px] w-full"
                data-node-id="3:13694"
              >
                Phòng tối 01
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[12px] w-full"
                data-node-id="3:13695"
              >
                Hạt Bạc Lab · Quận 3
              </p>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[10px] w-full"
                data-node-id="3:13696"
              >
                18 m² / 2 người / In đen trắng
              </p>
              <div
                className="[word-break:break-word] border-[#26333f] border-solid border-t content-stretch flex font-['Space_Grotesk:Regular'] font-normal items-start justify-between leading-[normal] overflow-clip pt-[12px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="3:13697"
                data-name="Price and action"
              >
                <p className="relative shrink-0 text-[#edf3f5] text-[21px]" data-node-id="3:13698">
                  180.000đ / giờ
                </p>
                <p className="relative shrink-0 text-[#42d9f3] text-[13px]" data-node-id="3:13699">
                  Khám phá ↗
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
            data-node-id="3:13700"
            data-name="Resource card"
          >
            <div
              className="h-[215px] relative shrink-0 w-full"
              data-node-id="3:13701"
              data-name="Resource photograph"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgResourcePhotograph1}
              />
            </div>
            <div
              className="content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[22px] relative shrink-0 w-full"
              data-node-id="3:13702"
              data-name="Resource details"
            >
              <div
                className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="3:13703"
                data-name="Availability"
              >
                <div
                  className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:13704"
                  data-name="Status"
                >
                  <div
                    className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                    data-node-id="3:13705"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                    data-node-id="3:13706"
                  >
                    Còn 3 khung giờ
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#ffb657] text-[11px] tracking-[1px] whitespace-nowrap"
                  data-node-id="3:13707"
                >
                  ★ 4,9
                </p>
              </div>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[23px] tracking-[-0.7px] w-full"
                data-node-id="3:13708"
              >
                Studio Ánh Sáng
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[12px] w-full"
                data-node-id="3:13709"
              >
                Hạt Bạc Lab · Quận 3
              </p>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[10px] w-full"
                data-node-id="3:13710"
              >
                45 m² / 6 người / Ánh sáng tự nhiên
              </p>
              <div
                className="[word-break:break-word] border-[#26333f] border-solid border-t content-stretch flex font-['Space_Grotesk:Regular'] font-normal items-start justify-between leading-[normal] overflow-clip pt-[12px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="3:13711"
                data-name="Price and action"
              >
                <p className="relative shrink-0 text-[#edf3f5] text-[21px]" data-node-id="3:13712">
                  350.000đ / giờ
                </p>
                <p className="relative shrink-0 text-[#42d9f3] text-[13px]" data-node-id="3:13713">
                  Khám phá ↗
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
            data-node-id="3:13714"
            data-name="Resource card"
          >
            <div
              className="h-[215px] relative shrink-0 w-full"
              data-node-id="3:13715"
              data-name="Resource photograph"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgResourcePhotograph2}
              />
            </div>
            <div
              className="content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[22px] relative shrink-0 w-full"
              data-node-id="3:13716"
              data-name="Resource details"
            >
              <div
                className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="3:13717"
                data-name="Availability"
              >
                <div
                  className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:13718"
                  data-name="Status"
                >
                  <div
                    className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                    data-node-id="3:13719"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                    data-node-id="3:13720"
                  >
                    Đã kiểm định
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#ffb657] text-[11px] tracking-[1px] whitespace-nowrap"
                  data-node-id="3:13721"
                >
                  ★ 4,9
                </p>
              </div>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[23px] tracking-[-0.7px] w-full"
                data-node-id="3:13722"
              >
                Bộ máy ảnh 35 mm
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[12px] w-full"
                data-node-id="3:13723"
              >
                Trạm Film · Bình Thạnh
              </p>
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[10px] w-full"
                data-node-id="3:13724"
              >
                Nikon FM2 / 50 mm f/1.8 / 1 ngày
              </p>
              <div
                className="[word-break:break-word] border-[#26333f] border-solid border-t content-stretch flex font-['Space_Grotesk:Regular'] font-normal items-start justify-between leading-[normal] overflow-clip pt-[12px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="3:13725"
                data-name="Price and action"
              >
                <p className="relative shrink-0 text-[#edf3f5] text-[21px]" data-node-id="3:13726">
                  250.000đ / ngày
                </p>
                <p className="relative shrink-0 text-[#42d9f3] text-[13px]" data-node-id="3:13727">
                  Khám phá ↗
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[32px] items-start overflow-clip px-[48px] py-[56px] relative shrink-0 w-full"
        data-node-id="3:13728"
        data-name="Quy trình đặt và sử dụng"
      >
        <div
          className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="3:13729"
          data-name="Section heading"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-[900px]"
            data-node-id="3:13730"
            data-name="Title group"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13731"
            >
              04 / TỪ LỰA CHỌN ĐẾN KHUNG HÌNH
            </p>
            <p
              className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[30px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13732"
            >
              Không bỏ sót một nguồn lực nào.
            </p>
          </div>
          <div
            className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
            data-node-id="3:13733"
            data-name="Status"
          >
            <div
              className="bg-[#6ddbad] relative shrink-0 size-[4px]"
              data-node-id="3:13734"
              data-name="Indicator"
            />
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
              data-node-id="3:13735"
            >
              KIỂM TRA ĐỒNG THỜI
            </p>
          </div>
        </div>
        <div
          className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="3:13736"
          data-name="Reservation flow"
        >
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13737"
            data-name="Booking stage"
          >
            <div
              className="content-stretch flex gap-[14px] items-center overflow-clip relative shrink-0 w-full"
              data-node-id="3:13738"
              data-name="Stage marker"
            >
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#617584] text-[25px] whitespace-nowrap"
                data-node-id="3:13739"
              >
                01
              </p>
              <div
                className="bg-[#26333f] flex-[1_0_0] h-px min-w-px relative"
                data-node-id="3:13740"
                data-name="Connector"
              />
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[19px] tracking-[-0.7px] w-full"
              data-node-id="3:13741"
            >{`Tìm & phối hợp`}</p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13742"
            >
              Chọn phòng, thiết bị, vật tư và người hướng dẫn theo ý tưởng.
            </p>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13743"
            data-name="Booking stage"
          >
            <div
              className="content-stretch flex gap-[14px] items-center overflow-clip relative shrink-0 w-full"
              data-node-id="3:13744"
              data-name="Stage marker"
            >
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[25px] whitespace-nowrap"
                data-node-id="3:13745"
              >
                02
              </p>
              <div
                className="bg-[#26333f] flex-[1_0_0] h-px min-w-px relative"
                data-node-id="3:13746"
                data-name="Connector"
              />
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[19px] tracking-[-0.7px] w-full"
              data-node-id="3:13747"
            >
              Xác minh lịch trống
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13748"
            >
              Kiểm tra tất cả tài nguyên, không cho phép đặt trùng.
            </p>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13749"
            data-name="Booking stage"
          >
            <div
              className="content-stretch flex gap-[14px] items-center overflow-clip relative shrink-0 w-full"
              data-node-id="3:13750"
              data-name="Stage marker"
            >
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#617584] text-[25px] whitespace-nowrap"
                data-node-id="3:13751"
              >
                03
              </p>
              <div
                className="bg-[#26333f] flex-[1_0_0] h-px min-w-px relative"
                data-node-id="3:13752"
                data-name="Connector"
              />
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[19px] tracking-[-0.7px] w-full"
              data-node-id="3:13753"
            >{`Giữ chỗ & thanh toán`}</p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13754"
            >
              Khóa phòng và thiết bị cùng lúc sau khi xác nhận đặt.
            </p>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13755"
            data-name="Booking stage"
          >
            <div
              className="content-stretch flex gap-[14px] items-center overflow-clip relative shrink-0 w-full"
              data-node-id="3:13756"
              data-name="Stage marker"
            >
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#617584] text-[25px] whitespace-nowrap"
                data-node-id="3:13757"
              >
                04
              </p>
              <div
                className="bg-[#26333f] flex-[1_0_0] h-px min-w-px relative"
                data-node-id="3:13758"
                data-name="Connector"
              />
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[19px] tracking-[-0.7px] w-full"
              data-node-id="3:13759"
            >
              QR → Sáng tạo → Kết thúc
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[13px] w-full"
              data-node-id="3:13760"
            >
              Check-in, ghi nhận sử dụng thực tế và đối soát phụ phí.
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-[#0d1218] content-stretch flex flex-col gap-[28px] items-start overflow-clip px-[48px] py-[56px] relative shrink-0 w-full"
        data-node-id="3:13761"
        data-name="Mô-đun sáng tạo"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="3:13762"
          data-name="Section heading"
        >
          <p
            className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
            data-node-id="3:13763"
          >
            05 / BỘ CÔNG CỤ CỦA BẠN
          </p>
          <p
            className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[30px] tracking-[-0.7px] w-[min-content]"
            data-node-id="3:13764"
          >
            Ít thao tác hơn. Nhiều sáng tạo hơn.
          </p>
        </div>
        <div
          className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="3:13765"
          data-name="Platform modules"
        >
          <div
            className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[22px] items-start min-w-px overflow-clip p-[26px] relative"
            data-node-id="3:13766"
            data-name="Module card"
          >
            <div
              className="relative shrink-0 size-[30px]"
              data-node-id="3:15078"
              data-name="calendar-range"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgCalendarRange}
              />
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[21px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13768"
            >
              SPACE / Đặt không gian
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[14px] w-[min-content]"
              data-node-id="3:13769"
            >
              So sánh phòng tối, studio và gói dịch vụ. Lịch trống được kiểm tra cùng toàn bộ thiết
              bị đi kèm.
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px] whitespace-nowrap"
              data-node-id="3:13770"
            >
              Tạo lượt đặt mới ↗
            </p>
          </div>
          <div
            className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[22px] items-start min-w-px overflow-clip p-[26px] relative"
            data-node-id="3:13771"
            data-name="Module card"
          >
            <div
              className="relative shrink-0 size-[30px]"
              data-node-id="3:15081"
              data-name="images"
            >
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgImages} />
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[21px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13773"
            >
              ARCHIVE / Lưu chất phim
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[14px] w-[min-content]"
              data-node-id="3:13774"
            >
              Quản lý lịch sử đặt, bộ sưu tập ảnh số và đánh giá sau mỗi buổi chụp trong hồ sơ cá
              nhân.
            </p>
            <Link
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px] whitespace-nowrap"
              href="/collection"
              data-node-id="3:13775"
            >
              Mở bộ sưu tập ↗
            </Link>
          </div>
          <div
            className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[22px] items-start min-w-px overflow-clip p-[26px] relative"
            data-node-id="3:13776"
            data-name="Module card"
          >
            <div
              className="relative shrink-0 size-[30px]"
              data-node-id="3:15084"
              data-name="sparkles"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgSparkles}
              />
            </div>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[21px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13778"
            >
              MUSE / Trợ lý nhiếp ảnh
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[14px] w-[min-content]"
              data-node-id="3:13779"
            >
              Gợi ý bộ thiết bị theo nhu cầu, tìm kiến thức theo ngữ nghĩa và khám phá phục hồi ảnh
              bằng AI.
            </p>
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px] whitespace-nowrap"
              data-node-id="3:13780"
            >
              Trò chuyện với MUSE ↗
            </p>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[28px] items-start overflow-clip px-[48px] py-[56px] relative shrink-0 w-full"
        data-node-id="3:13781"
        data-name="Không gian làm việc cá nhân"
      >
        <div
          className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="3:13782"
          data-name="Section heading"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-[900px]"
            data-node-id="3:13783"
            data-name="Title group"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13784"
            >
              06 / KHÔNG GIAN LÀM VIỆC
            </p>
            <p
              className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[30px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13785"
            >
              Lần hẹn tiếp theo với chất phim.
            </p>
          </div>
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[4px] shrink-0"
            data-node-id="3:13786"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[12px] whitespace-nowrap"
              data-node-id="3:13787"
            >
              Xem lịch của tôi
            </p>
            <div
              className="relative shrink-0 size-[15px]"
              data-node-id="3:15087"
              data-name="arrow-up-right"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgArrowUpRight1}
              />
            </div>
          </div>
        </div>
        <div
          className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          data-node-id="3:13789"
          data-name="Operations workspace"
          id="workspace"
        >
          <div
            className="border-[#26333f] border-b border-solid content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="3:13790"
            data-name="Workspace tabs"
          >
            <div
              className="bg-[#102c36] border-[#42d9f3] border-b-2 border-solid content-stretch flex items-start overflow-clip px-[21px] py-[16px] relative shrink-0"
              data-node-id="3:13791"
              data-name="Tab"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px] whitespace-nowrap"
                data-node-id="3:13792"
              >
                Lượt đặt của tôi
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border-[rgba(0,0,0,0)] border-b-2 border-solid content-stretch flex items-start overflow-clip px-[21px] py-[16px] relative shrink-0"
              data-node-id="3:13793"
              data-name="Tab"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
                data-node-id="3:13794"
              >
                Thiết bị yêu thích
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border-[rgba(0,0,0,0)] border-b-2 border-solid content-stretch flex items-start overflow-clip px-[21px] py-[16px] relative shrink-0"
              data-node-id="3:13795"
              data-name="Tab"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
                data-node-id="3:13796"
              >
                Bộ sưu tập ảnh
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border-[rgba(0,0,0,0)] border-b-2 border-solid content-stretch flex items-start overflow-clip px-[21px] py-[16px] relative shrink-0"
              data-node-id="3:13797"
              data-name="Tab"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
                data-node-id="3:13798"
              >
                Gói đã lưu
              </p>
            </div>
          </div>
          <div
            className="content-stretch flex gap-[28px] items-start overflow-clip p-[24px] relative shrink-0 w-full"
            data-node-id="3:13799"
            data-name="Workspace content"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative"
              data-node-id="3:13800"
              data-name="Upcoming bookings"
            >
              <div
                className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="3:13801"
                data-name="Table description"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-px relative text-[#95a7b5] text-[14px]"
                  data-node-id="3:13802"
                >
                  02 lượt đặt sắp tới · Lịch theo giờ Việt Nam
                </p>
                <div
                  className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:13803"
                  data-name="Status"
                >
                  <div
                    className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                    data-node-id="3:13804"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                    data-node-id="3:13805"
                  >
                    ĐÃ ĐỒNG BỘ
                  </p>
                </div>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex flex-col font-normal items-start overflow-clip relative shrink-0 w-full"
                data-node-id="3:13806"
                data-name="Data table"
              >
                <div
                  className="bg-[#131b23] content-stretch flex font-['JetBrains_Mono:Regular'] gap-[14px] items-start leading-[normal] overflow-clip px-[14px] py-[12px] relative shrink-0 text-[#617584] text-[10px] w-full"
                  data-node-id="3:13807"
                  data-name="Column headings"
                >
                  <p className="flex-[1_0_0] min-w-px relative" data-node-id="3:13808">
                    MÃ ĐẶT
                  </p>
                  <p className="flex-[1_0_0] min-w-px relative" data-node-id="3:13809">
                    KHÔNG GIAN
                  </p>
                  <p className="flex-[1_0_0] min-w-px relative" data-node-id="3:13810">
                    THỜI GIAN
                  </p>
                  <p className="flex-[1_0_0] min-w-px relative" data-node-id="3:13811">
                    TRẠNG THÁI
                  </p>
                </div>
                <div
                  className="bg-[#0d1218] border-[#26333f] border-b border-solid content-stretch flex gap-[14px] items-center leading-[1.5] overflow-clip px-[14px] py-[17px] relative shrink-0 w-full"
                  data-node-id="3:13812"
                  data-name="Record"
                >
                  <p
                    className="flex-[1_0_0] font-['JetBrains_Mono:Regular'] min-w-px relative text-[#95a7b5] text-[11px]"
                    data-node-id="3:13813"
                  >
                    BK-1024
                  </p>
                  <p
                    className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#edf3f5] text-[12px]"
                    data-node-id="3:13814"
                  >
                    Phòng tối 01 · Hạt Bạc Lab
                  </p>
                  <p
                    className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#edf3f5] text-[12px]"
                    data-node-id="3:13815"
                  >
                    04.11 / 14:00–17:00
                  </p>
                  <p
                    className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#42d9f3] text-[12px]"
                    data-node-id="3:13816"
                  >
                    Đã xác nhận
                  </p>
                </div>
                <div
                  className="bg-[#131b23] border-[#26333f] border-b border-solid content-stretch flex gap-[14px] items-center leading-[1.5] overflow-clip px-[14px] py-[17px] relative shrink-0 w-full"
                  data-node-id="3:13817"
                  data-name="Record"
                >
                  <p
                    className="flex-[1_0_0] font-['JetBrains_Mono:Regular'] min-w-px relative text-[#95a7b5] text-[11px]"
                    data-node-id="3:13818"
                  >
                    BK-1031
                  </p>
                  <p
                    className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#edf3f5] text-[12px]"
                    data-node-id="3:13819"
                  >
                    Studio Ánh Sáng · Hạt Bạc Lab
                  </p>
                  <p
                    className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#edf3f5] text-[12px]"
                    data-node-id="3:13820"
                  >
                    08.11 / 09:00–11:00
                  </p>
                  <p
                    className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#42d9f3] text-[12px]"
                    data-node-id="3:13821"
                  >
                    Đã xác nhận
                  </p>
                </div>
              </div>
            </div>
            <div
              className="[word-break:break-word] bg-[#102c36] border border-[#26333f] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative shrink-0 w-[310px]"
              data-node-id="3:13822"
              data-name="Booking reminder"
            >
              <p
                className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13823"
              >
                CHUẨN BỊ CHO BUỔI IN
              </p>
              <p
                className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[20px] tracking-[-0.7px] w-[min-content]"
                data-node-id="3:13824"
              >
                Phòng tối 01
              </p>
              <p
                className="font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13825"
              >
                04.11 · 14:00–17:00. Mang theo âm bản 35 mm và đến trước 10 phút để nhận hướng dẫn
                an toàn.
              </p>
              <p
                className="font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px] whitespace-nowrap"
                data-node-id="3:13826"
              >{`Xem chi tiết & mã check-in ↗`}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#0d1218] content-stretch flex gap-[40px] items-start overflow-clip px-[48px] py-[56px] relative shrink-0 w-full"
        data-node-id="3:13827"
        data-name="Cảm hứng cộng đồng"
      >
        <div
          className="content-stretch flex flex-col gap-[18px] items-start overflow-clip relative shrink-0 w-[430px]"
          data-node-id="3:13828"
          data-name="Community story"
        >
          <p
            className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
            data-node-id="3:13829"
          >
            07 / CÙNG NHAU GIỮ LỬA
          </p>
          <div
            className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#edf3f5] text-[30px] tracking-[-0.7px] w-[min-content]"
            data-node-id="3:13830"
          >
            <p className="leading-[1.2] mb-0">Chất phim nằm ở</p>
            <p className="leading-[1.2]">những người bạn gặp.</p>
          </div>
          <p
            className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[14px] w-[min-content]"
            data-node-id="3:13831"
          >
            Học một kỹ thuật mới, chia sẻ một cuộn phim cũ. Luôn có ai đó sẵn sàng cùng bạn bắt đầu.
          </p>
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[22px] py-[14px] relative rounded-[4px] shrink-0"
            data-node-id="3:13832"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[14px] whitespace-nowrap"
              data-node-id="3:13833"
            >
              Tham gia cộng đồng
            </p>
            <div
              className="relative shrink-0 size-[15px]"
              data-node-id="3:15090"
              data-name="arrow-up-right"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgArrowUpRight1}
              />
            </div>
          </div>
        </div>
        <div
          className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px overflow-clip p-[28px] relative"
          data-node-id="3:13835"
          data-name="Featured workshop"
        >
          <div
            className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
            data-node-id="3:13836"
            data-name="Workshop metadata"
          >
            <div
              className="bg-[#30271a] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
              data-node-id="3:13837"
              data-name="Status"
            >
              <div
                className="bg-[#ffb657] relative shrink-0 size-[4px]"
                data-node-id="3:13838"
                data-name="Indicator"
              />
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#ffb657] text-[10px] whitespace-nowrap"
                data-node-id="3:13839"
              >
                WORKSHOP / 08.11
              </p>
            </div>
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13840"
            >
              CÒN 06 / 12 CHỖ
            </p>
          </div>
          <p
            className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[28px] tracking-[-0.7px] w-full"
            data-node-id="3:13841"
          >
            Từ âm bản đến bản in đầu tiên
          </p>
          <p
            className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[14px] w-full"
            data-node-id="3:13842"
          >
            Thực hành in đen trắng cùng chuyên gia Đức Huy tại Hạt Bạc Lab. Bao gồm phòng tối, giấy
            ảnh và hóa chất.
          </p>
          <div
            className="[word-break:break-word] content-stretch flex font-normal items-start justify-between overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="3:13843"
            data-name="Workshop footer"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
              data-node-id="3:13844"
            >
              09:00–12:00 · 450.000đ / NGƯỜI
            </p>
            <p
              className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px]"
              data-node-id="3:13845"
            >
              Xem chương trình ↗
            </p>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[28px] items-start overflow-clip px-[48px] py-[52px] relative shrink-0 w-full"
        data-node-id="3:13846"
        data-name="Nhịp hoạt động cộng đồng"
      >
        <div
          className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="3:13847"
          data-name="Section heading"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-[1000px]"
            data-node-id="3:13848"
            data-name="Title group"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13849"
            >
              08 / NHỊP HOẠT ĐỘNG
            </p>
            <p
              className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[28px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13850"
            >
              Mỗi ngày, thêm một kết nối.
            </p>
          </div>
          <div
            className="bg-[#19232d] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
            data-node-id="3:13851"
            data-name="Status"
          >
            <div
              className="bg-[#95a7b5] relative shrink-0 size-[4px]"
              data-node-id="3:13852"
              data-name="Indicator"
            />
            <p
              className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[10px] whitespace-nowrap"
              data-node-id="3:13853"
            >
              NHẬT KÝ DEMO
            </p>
          </div>
        </div>
        <div
          className="[word-break:break-word] bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col font-normal gap-[19px] items-start leading-[normal] overflow-clip p-[24px] relative shrink-0 w-full"
          data-node-id="3:13854"
          data-name="Activity log"
        >
          <div
            className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full"
            data-node-id="3:13855"
            data-name="Activity entry"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[11px] whitespace-nowrap"
              data-node-id="3:13856"
            >
              10:42
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#6ddbad] text-[10px] w-[110px]"
              data-node-id="3:13857"
            >
              BOOKING
            </p>
            <p
              className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#95a7b5] text-[13px]"
              data-node-id="3:13858"
            >
              Lượt đặt BK-1024 đã được xác nhận · Phòng tối 01
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[12px] whitespace-nowrap"
              data-node-id="3:13859"
            >
              ↗
            </p>
          </div>
          <div
            className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full"
            data-node-id="3:13860"
            data-name="Activity entry"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[11px] whitespace-nowrap"
              data-node-id="3:13861"
            >
              10:18
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#42d9f3] text-[10px] w-[110px]"
              data-node-id="3:13862"
            >
              KNOWLEDGE
            </p>
            <p
              className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#95a7b5] text-[13px]"
              data-node-id="3:13863"
            >
              Đức Huy chia sẻ: Chọn giấy ảnh cho bản in đen trắng đầu tiên
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[12px] whitespace-nowrap"
              data-node-id="3:13864"
            >
              ↗
            </p>
          </div>
          <div
            className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full"
            data-node-id="3:13865"
            data-name="Activity entry"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[11px] whitespace-nowrap"
              data-node-id="3:13866"
            >
              09:56
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#ffb657] text-[10px] w-[110px]"
              data-node-id="3:13867"
            >
              WORKSHOP
            </p>
            <p
              className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#95a7b5] text-[13px]"
              data-node-id="3:13868"
            >
              Workshop Từ âm bản đến bản in đầu tiên đã mở đăng ký
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[12px] whitespace-nowrap"
              data-node-id="3:13869"
            >
              ↗
            </p>
          </div>
          <div
            className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full"
            data-node-id="3:13870"
            data-name="Activity entry"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[11px] whitespace-nowrap"
              data-node-id="3:13871"
            >
              09:30
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#95a7b5] text-[10px] w-[110px]"
              data-node-id="3:13872"
            >
              RESOURCE
            </p>
            <p
              className="flex-[1_0_0] font-['Space_Grotesk:Regular'] min-w-px relative text-[#95a7b5] text-[13px]"
              data-node-id="3:13873"
            >
              Hạt Bạc Lab cập nhật lịch trống cho tháng 11
            </p>
            <p
              className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[12px] whitespace-nowrap"
              data-node-id="3:13874"
            >
              ↗
            </p>
          </div>
        </div>
      </div>
      <div
        className="[word-break:break-word] border-[#26333f] border-solid border-t content-stretch flex items-center justify-between leading-[normal] overflow-clip px-[48px] py-[34px] relative shrink-0 w-full whitespace-nowrap"
        data-node-id="3:13875"
        data-name="Chân trang"
      >
        <div
          className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0"
          data-node-id="3:13876"
          data-name="Brand statement"
        >
          <p
            className="font-['Space_Grotesk:Bold'] font-bold relative shrink-0 text-[#edf3f5] text-[20px]"
            data-node-id="3:13877"
          >{`FILM//SPACE`}</p>
          <p
            className="font-['Space_Grotesk:Regular'] font-normal relative shrink-0 text-[#95a7b5] text-[12px]"
            data-node-id="3:13878"
          >
            Kết nối không gian. Giữ lại chất phim.
          </p>
        </div>
        <div
          className="content-stretch flex font-['Space_Grotesk:Regular'] font-normal gap-[28px] items-start overflow-clip relative shrink-0 text-[#95a7b5] text-[12px]"
          data-node-id="3:13879"
          data-name="Footer links"
        >
          <p className="relative shrink-0" data-node-id="3:13880">
            Hướng dẫn
          </p>
          <p className="relative shrink-0" data-node-id="3:13881">
            Điều khoản
          </p>
          <p className="relative shrink-0" data-node-id="3:13882">
            Quyền riêng tư
          </p>
          <p className="relative shrink-0" data-node-id="3:13883">
            Hỗ trợ
          </p>
        </div>
        <p
          className="font-['JetBrains_Mono:Regular'] font-normal relative shrink-0 text-[#617584] text-[10px]"
          data-node-id="3:13884"
        >
          ĐỒ ÁN TỐT NGHIỆP / DEMO 2026
        </p>
      </div>
    </div>
  )
}
