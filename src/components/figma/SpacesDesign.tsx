import { CurrentUserIdentity } from '@/components/CurrentUserIdentity'
import Link from 'next/link'

const assetPathPrefix = '/assets'
const imgDarkroomPhotograph =
  'https://images.unsplash.com/photo-1654572628275-efb1c0ad15fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600'
const imgAperture = `${assetPathPrefix}/ec17a.svg`
const imgBell = `${assetPathPrefix}/d5e8b.svg`
const imgArrowUpRight = `${assetPathPrefix}/79067.svg`
const imgChevronDown = `${assetPathPrefix}/07488.svg`
const imgArrowUpRight1 = `${assetPathPrefix}/b6435.svg`

export default function TimDtKhongGianFilmSpace() {
  return (
    <div
      className="bg-[#080b0e] content-stretch flex flex-col items-start relative size-full"
      data-node-id="3:13886"
      data-name="Tìm & đặt không gian · FILM//SPACE"
    >
      <div
        className="bg-[#080b0e] border-[#26333f] border-b border-solid content-stretch flex h-[80px] items-center justify-between overflow-clip px-[48px] relative shrink-0 w-full"
        data-node-id="3:13887"
        data-name="Điều hướng chính"
      >
        <div
          className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0"
          data-node-id="3:13888"
          data-name="Brand"
        >
          <div
            className="relative shrink-0 size-[28px]"
            data-node-id="3:15093"
            data-name="aperture"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAperture} />
          </div>
          <p
            className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[22px] tracking-[-0.7px] whitespace-nowrap"
            data-node-id="3:13890"
          >{`FILM//SPACE`}</p>
        </div>
        <div
          className="content-stretch flex gap-[28px] items-center overflow-clip relative shrink-0"
          data-node-id="3:13891"
          data-name="Navigation links"
        >
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
            data-node-id="3:13892"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
              data-node-id="3:13893"
            >
              Tổng quan
            </p>
          </div>
          <div
            className="content-stretch flex flex-col gap-[9px] items-start overflow-clip relative shrink-0"
            data-node-id="3:13894"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[13px] whitespace-nowrap"
              data-node-id="3:13895"
            >
              Không gian
            </p>
            <div
              className="bg-[#42d9f3] h-[2px] relative shrink-0 w-[22px]"
              data-node-id="3:13896"
              data-name="Active rule"
            />
          </div>
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
            data-node-id="3:13897"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
              data-node-id="3:13898"
            >
              Cộng đồng
            </p>
          </div>
          <Link
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
            href="/collection"
            data-node-id="3:13899"
            data-name="Navigation item"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[13px] whitespace-nowrap"
              data-node-id="3:13900"
            >
              Bộ sưu tập
            </p>
          </Link>
        </div>
        <div
          className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0"
          data-node-id="3:13901"
          data-name="Account"
        >
          <div className="relative shrink-0 size-[18px]" data-node-id="3:15096" data-name="bell">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBell} />
          </div>
          <div
            className="bg-[#26333f] h-[28px] relative shrink-0 w-px"
            data-node-id="3:13903"
            data-name="Separator"
          />
          <CurrentUserIdentity />
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[28px] items-start overflow-clip pb-[48px] pt-[36px] px-[48px] relative shrink-0 w-full"
        data-node-id="3:13909"
        data-name="Reservation workspace"
      >
        <div
          className="content-stretch flex gap-[32px] items-end overflow-clip relative shrink-0 w-full"
          data-node-id="3:13910"
          data-name="Page introduction"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13911"
            data-name="Introduction"
          >
            <p
              className="font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px] whitespace-nowrap"
              data-node-id="3:13912"
            >{`SPACE / TÌM & ĐẶT CHỖ / DỮ LIỆU MINH HỌA`}</p>
            <p
              className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[38px] tracking-[-0.7px] w-[min-content]"
              data-node-id="3:13913"
            >
              Không gian đúng. Khung hình riêng.
            </p>
            <p
              className="font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[14px] w-[min-content]"
              data-node-id="3:13914"
            >
              Phối hợp phòng, thiết bị và dịch vụ trong cùng một lịch đặt. Mọi tài nguyên đều được
              kiểm tra trước khi xác nhận.
            </p>
          </div>
          <div
            className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[22px] py-[14px] relative rounded-[4px] shrink-0"
            data-node-id="3:13915"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[14px] whitespace-nowrap"
              data-node-id="3:13916"
            >
              Lịch sử đặt chỗ
            </p>
            <div
              className="relative shrink-0 size-[15px]"
              data-node-id="3:15099"
              data-name="arrow-up-right"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgArrowUpRight}
              />
            </div>
          </div>
        </div>
        <div
          className="[word-break:break-word] bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex font-['JetBrains_Mono:Regular'] font-normal gap-[36px] items-start leading-[normal] overflow-clip p-[16px] relative shrink-0 text-[12px] w-full whitespace-pre"
          data-node-id="3:13918"
          data-name="Reservation progress"
        >
          <p
            className="relative shrink-0 text-[#617584]"
            data-node-id="3:13919"
          >{`01  Chọn không gian`}</p>
          <p
            className="relative shrink-0 text-[#42d9f3]"
            data-node-id="3:13920"
          >{`02  Cấu hình & kiểm tra`}</p>
          <p
            className="relative shrink-0 text-[#617584]"
            data-node-id="3:13921"
          >{`03  Thanh toán & xác nhận`}</p>
        </div>
        <div
          className="content-stretch flex gap-[14px] items-end overflow-clip relative shrink-0 w-full"
          data-node-id="3:13922"
          data-name="Search filters"
        >
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13923"
            data-name="Form field"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[12px] whitespace-nowrap"
              data-node-id="3:13924"
            >
              Khu vực
            </p>
            <div
              className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex h-[46px] items-center justify-between overflow-clip px-[14px] relative rounded-[4px] shrink-0 w-full"
              data-node-id="3:13925"
              data-name="Input"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[13px] whitespace-nowrap"
                data-node-id="3:13926"
              >
                TP. Hồ Chí Minh
              </p>
              <div
                className="relative shrink-0 size-[14px]"
                data-node-id="3:15102"
                data-name="chevron-down"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgChevronDown}
                />
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13928"
            data-name="Form field"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[12px] whitespace-nowrap"
              data-node-id="3:13929"
            >
              Loại không gian
            </p>
            <div
              className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex h-[46px] items-center justify-between overflow-clip px-[14px] relative rounded-[4px] shrink-0 w-full"
              data-node-id="3:13930"
              data-name="Input"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[13px] whitespace-nowrap"
                data-node-id="3:13931"
              >
                Phòng tối
              </p>
              <div
                className="relative shrink-0 size-[14px]"
                data-node-id="3:15105"
                data-name="chevron-down"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgChevronDown}
                />
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13933"
            data-name="Form field"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[12px] whitespace-nowrap"
              data-node-id="3:13934"
            >
              Ngày sử dụng
            </p>
            <div
              className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex h-[46px] items-center justify-between overflow-clip px-[14px] relative rounded-[4px] shrink-0 w-full"
              data-node-id="3:13935"
              data-name="Input"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[13px] whitespace-nowrap"
                data-node-id="3:13936"
              >
                06 / 11 / 2026
              </p>
              <div
                className="relative shrink-0 size-[14px]"
                data-node-id="3:15108"
                data-name="chevron-down"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgChevronDown}
                />
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative"
            data-node-id="3:13938"
            data-name="Form field"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[12px] whitespace-nowrap"
              data-node-id="3:13939"
            >
              Ngân sách / giờ
            </p>
            <div
              className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex h-[46px] items-center justify-between overflow-clip px-[14px] relative rounded-[4px] shrink-0 w-full"
              data-node-id="3:13940"
              data-name="Input"
            >
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[13px] whitespace-nowrap"
                data-node-id="3:13941"
              >
                Dưới 300.000đ
              </p>
              <div
                className="relative shrink-0 size-[14px]"
                data-node-id="3:15111"
                data-name="chevron-down"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgChevronDown}
                />
              </div>
            </div>
          </div>
          <div
            className="bg-[#42d9f3] border border-[#42d9f3] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[22px] py-[14px] relative rounded-[4px] shrink-0"
            data-node-id="3:13943"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#080b0e] text-[14px] whitespace-nowrap"
              data-node-id="3:13944"
            >
              Tìm không gian
            </p>
            <div
              className="relative shrink-0 size-[15px]"
              data-node-id="3:15114"
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
          className="content-stretch flex flex-wrap gap-[20px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="3:13946"
          data-name="Search and configuration"
        >
          <div
            className="content-stretch flex flex-col gap-[18px] items-start overflow-clip relative shrink-0 w-[280px]"
            data-node-id="3:13947"
            data-name="Search results"
          >
            <div
              className="[word-break:break-word] content-stretch flex font-['JetBrains_Mono:Regular'] font-normal items-start justify-between leading-[1.5] overflow-clip relative shrink-0 text-[11px] tracking-[1px] w-full whitespace-nowrap"
              data-node-id="3:13948"
              data-name="Result heading"
            >
              <p className="relative shrink-0 text-[#95a7b5]" data-node-id="3:13949">
                03 KẾT QUẢ PHÙ HỢP
              </p>
              <p className="relative shrink-0 text-[#42d9f3]" data-node-id="3:13950">
                GẦN NHẤT ↓
              </p>
            </div>
            <div
              className="is-interactive-selected bg-[#102c36] border border-[#42d9f3] border-solid content-stretch flex flex-col gap-[13px] items-start overflow-clip p-[18px] relative shrink-0 w-full"
              data-node-id="3:13951"
              data-name="Space result"
              data-space-choice
            >
              <div
                className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="3:13952"
                data-name="Result metadata"
              >
                <div
                  className="bg-[#102c36] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:13953"
                  data-name="Status"
                >
                  <div
                    className="bg-[#42d9f3] relative shrink-0 size-[4px]"
                    data-node-id="3:13954"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[10px] whitespace-nowrap"
                    data-node-id="3:13955"
                  >
                    Đang chọn
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#ffb657] text-[11px] tracking-[1px] whitespace-nowrap"
                  data-node-id="3:13956"
                >
                  ★ 4,9
                </p>
              </div>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[21px] tracking-[-0.7px] w-[min-content]"
                data-node-id="3:13957"
              >
                Phòng tối 01
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13958"
              >
                Hạt Bạc Lab · Quận 3
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13959"
              >
                18 m² · 2 người · In đen trắng
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[19px] whitespace-nowrap"
                data-node-id="3:13960"
              >
                180.000đ / giờ
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[12px] whitespace-nowrap"
                data-node-id="3:13961"
              >
                ☑ Đã chọn
              </p>
            </div>
            <div
              className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col gap-[13px] items-start overflow-clip p-[18px] relative shrink-0 w-full"
              data-node-id="3:13962"
              data-name="Space result"
              data-space-choice
            >
              <div
                className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="3:13963"
                data-name="Result metadata"
              >
                <div
                  className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:13964"
                  data-name="Status"
                >
                  <div
                    className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                    data-node-id="3:13965"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                    data-node-id="3:13966"
                  >
                    Còn lịch
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#ffb657] text-[11px] tracking-[1px] whitespace-nowrap"
                  data-node-id="3:13967"
                >
                  ★ 4,9
                </p>
              </div>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[21px] tracking-[-0.7px] w-[min-content]"
                data-node-id="3:13968"
              >
                Phòng tối 02
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13969"
              >
                Hạt Bạc Lab · Quận 3
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13970"
              >{`24 m² · 4 người · Tráng & in`}</p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[19px] whitespace-nowrap"
                data-node-id="3:13971"
              >
                250.000đ / giờ
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[12px] whitespace-nowrap"
                data-node-id="3:13972"
              >
                □ Chọn phòng
              </p>
            </div>
            <div
              className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col gap-[13px] items-start overflow-clip p-[18px] relative shrink-0 w-full"
              data-node-id="3:13973"
              data-name="Space result"
              data-space-choice
            >
              <div
                className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                data-node-id="3:13974"
                data-name="Status"
              >
                <div
                  className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                  data-node-id="3:13975"
                  data-name="Indicator"
                />
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                  data-node-id="3:13976"
                >
                  Còn lịch
                </p>
              </div>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[21px] tracking-[-0.7px] w-[min-content]"
                data-node-id="3:13977"
              >
                Phòng tráng C-41
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13978"
              >
                Trạm Film · Bình Thạnh
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13979"
              >
                15 m² · 2 người · Phim màu
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[19px] whitespace-nowrap"
                data-node-id="3:13980"
              >
                220.000đ / giờ
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[12px] whitespace-nowrap"
                data-node-id="3:13981"
              >
                □ Chọn phòng
              </p>
            </div>
            <div
              className="border border-[#26333f] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[18px] relative shrink-0 w-full"
              data-node-id="3:13982"
              data-name="Comparison tray"
            >
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13983"
              >
                LỰA CHỌN HIỆN TẠI / 01
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13984"
                data-selected-space-comparison
              >
                Phòng tối 01 đang được chọn. Chọn phòng khác để thay thế lựa chọn hiện tại.
              </p>
              <div
                className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[4px] shrink-0"
                data-node-id="3:13985"
                data-name="Action"
              >
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[12px] whitespace-nowrap"
                  data-node-id="3:13986"
                >
                  Chọn phòng khác
                </p>
                <div
                  className="relative shrink-0 size-[15px]"
                  data-node-id="3:15117"
                  data-name="arrow-up-right"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgArrowUpRight}
                  />
                </div>
              </div>
            </div>
            <div
              className="[word-break:break-word] bg-[#102c36] content-stretch flex flex-col font-normal gap-[13px] items-start overflow-clip p-[18px] relative shrink-0 w-full"
              data-node-id="3:13988"
              data-name="AI suggestion"
            >
              <p
                className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:13989"
              >
                MUSE / GỢI Ý
              </p>
              <p
                className="font-['Space_Grotesk:Regular'] leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:13990"
              >
                Bạn mới bắt đầu in ảnh? Gói “Bản in đầu tiên” có chuyên gia hướng dẫn và đủ vật tư
                cho 10 bản in.
              </p>
              <p
                className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#42d9f3] text-[12px] whitespace-nowrap"
                data-node-id="3:13991"
              >
                Hỏi trợ lý về gói dịch vụ ↗
              </p>
            </div>
          </div>
          <div
            className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[640px]"
            data-node-id="3:13992"
            data-name="Selected room and resources"
          >
            <div
              className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-node-id="3:13993"
              data-name="Selected space"
            >
              <div
                className="h-[240px] relative shrink-0 w-full"
                data-node-id="3:13994"
                data-name="Darkroom photograph"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgDarkroomPhotograph}
                />
              </div>
              <div
                className="content-stretch flex flex-col gap-[17px] items-start overflow-clip p-[22px] relative shrink-0 w-full"
                data-node-id="3:13995"
                data-name="Room details"
              >
                <div
                  className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                  data-node-id="3:13996"
                  data-name="Room title"
                >
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-px relative text-[#edf3f5] text-[27px] tracking-[-0.7px]"
                    data-node-id="3:13997"
                    data-selected-space-title
                  >
                    Phòng tối 01
                  </p>
                  <div
                    className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                    data-node-id="3:13998"
                    data-name="Status"
                  >
                    <div
                      className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                      data-node-id="3:13999"
                      data-name="Indicator"
                    />
                    <p
                      className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                      data-node-id="3:14000"
                    >
                      Đã xác minh
                    </p>
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[12px] w-full"
                  data-node-id="3:14001"
                >
                  Hạt Bạc Lab · 42 Nguyễn Đình Chiểu, Quận 3, TP.HCM
                </p>
                <div
                  className="[word-break:break-word] content-stretch flex font-normal gap-[14px] items-start overflow-clip relative shrink-0 w-full whitespace-nowrap"
                  data-node-id="3:14002"
                  data-name="Room specifications"
                >
                  <div
                    className="bg-[#080b0e] content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip p-[12px] relative"
                    data-node-id="3:14003"
                    data-name="Specification"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[16px]"
                      data-node-id="3:14004"
                    >
                      18 m²
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
                      data-node-id="3:14005"
                    >
                      DIỆN TÍCH
                    </p>
                  </div>
                  <div
                    className="bg-[#080b0e] content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip p-[12px] relative"
                    data-node-id="3:14006"
                    data-name="Specification"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[16px]"
                      data-node-id="3:14007"
                    >
                      02 người
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
                      data-node-id="3:14008"
                    >
                      SỨC CHỨA
                    </p>
                  </div>
                  <div
                    className="bg-[#080b0e] content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip p-[12px] relative"
                    data-node-id="3:14009"
                    data-name="Specification"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[16px]"
                      data-node-id="3:14010"
                    >
                      08–21h
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px]"
                      data-node-id="3:14011"
                    >
                      GIỜ MỞ CỬA
                    </p>
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[12px] w-full"
                  data-node-id="3:14012"
                >
                  Phong cách công nghiệp · Đèn an toàn đỏ/amber · Thông gió hút 2 chiều · Bồn rửa,
                  tủ sấy âm bản, Wi-Fi, đồ bảo hộ.
                </p>
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#ffb657] text-[11px] w-full"
                  data-node-id="3:14013"
                >
                  Tối thiểu 2 giờ · Hủy miễn phí trước 24 giờ · Không ăn uống trong phòng · Tuân thủ
                  hướng dẫn hóa chất.
                </p>
              </div>
            </div>
            <div
              className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-node-id="3:14014"
              data-name="01 / Ngày & khung giờ"
            >
              <div
                className="[word-break:break-word] border-[#26333f] border-b border-solid content-stretch flex items-center justify-between leading-[normal] overflow-clip px-[22px] py-[18px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="3:14015"
                data-name="Panel heading"
              >
                <p
                  className="font-['Space_Grotesk:Bold'] font-bold relative shrink-0 text-[#edf3f5] text-[17px]"
                  data-node-id="3:14016"
                >{`01 / Ngày & khung giờ`}</p>
                <p
                  className="font-['JetBrains_Mono:Regular'] font-normal relative shrink-0 text-[#617584] text-[10px]"
                  data-node-id="3:14017"
                >
                  GMT+7
                </p>
              </div>
              <div
                className="content-stretch flex flex-col gap-[18px] items-start overflow-clip p-[22px] relative shrink-0 w-full"
                data-node-id="3:14018"
                data-name="Panel content"
              >
                <div
                  className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                  data-node-id="3:14019"
                  data-name="Time fields"
                >
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative"
                    data-node-id="3:14020"
                    data-name="Form field"
                  >
                    <p
                      className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[12px] whitespace-nowrap"
                      data-node-id="3:14021"
                    >
                      Ngày đặt
                    </p>
                    <input
                      aria-label="Ngày đặt"
                      className="h-[46px] w-full rounded-[4px] border border-[#26333f] bg-[#080b0e] px-[14px] font-['Space_Grotesk:Regular'] text-[13px] text-[#edf3f5] [color-scheme:dark]"
                      data-booking-date
                      type="date"
                    />
                  </div>
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative"
                    data-node-id="3:14025"
                    data-name="Form field"
                  >
                    <p
                      className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[12px] whitespace-nowrap"
                      data-node-id="3:14026"
                    >
                      Bắt đầu
                    </p>
                    <div
                      className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex h-[46px] items-center justify-between overflow-clip px-[14px] relative rounded-[4px] shrink-0 w-full"
                      data-node-id="3:14027"
                      data-name="Input"
                    >
                      <p
                        className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[13px] whitespace-nowrap"
                        data-node-id="3:14028"
                      >
                        --:--
                      </p>
                      <div
                        className="relative shrink-0 size-[14px]"
                        data-node-id="3:15123"
                        data-name="chevron-down"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgChevronDown}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative"
                    data-node-id="3:14030"
                    data-name="Form field"
                  >
                    <p
                      className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[12px] whitespace-nowrap"
                      data-node-id="3:14031"
                    >
                      Kết thúc
                    </p>
                    <div
                      className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex h-[46px] items-center justify-between overflow-clip px-[14px] relative rounded-[4px] shrink-0 w-full"
                      data-node-id="3:14032"
                      data-name="Input"
                    >
                      <p
                        className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[normal] relative shrink-0 text-[#edf3f5] text-[13px] whitespace-nowrap"
                        data-node-id="3:14033"
                      >
                        --:--
                      </p>
                      <div
                        className="relative shrink-0 size-[14px]"
                        data-node-id="3:15126"
                        data-name="chevron-down"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgChevronDown}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[6px] items-start overflow-clip relative shrink-0 w-full"
                  data-node-id="3:14035"
                  data-name="Available time slots"
                >
                  <div
                    className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] items-start justify-center min-w-px overflow-clip p-[10px] relative"
                    data-node-id="3:14036"
                    data-name="Time slot"
                  >
                    <p
                      className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[11px] whitespace-nowrap"
                      data-node-id="3:14037"
                    >
                      09–11
                    </p>
                  </div>
                  <div
                    className="bg-[#19232d] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] items-start justify-center min-w-px overflow-clip p-[10px] relative"
                    data-node-id="3:14038"
                    data-name="Time slot"
                  >
                    <p
                      className="[text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['JetBrains_Mono:Regular'] font-normal leading-[normal] line-through relative shrink-0 text-[#617584] text-[11px] whitespace-nowrap"
                      data-node-id="3:14039"
                    >
                      11–13
                    </p>
                  </div>
                  <div
                    className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] items-start justify-center min-w-px overflow-clip p-[10px] relative"
                    data-node-id="3:14040"
                    data-name="Time slot"
                  >
                    <p
                      className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[11px] whitespace-nowrap"
                      data-node-id="3:14041"
                    >
                      14–17
                    </p>
                  </div>
                  <div
                    className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] items-start justify-center min-w-px overflow-clip p-[10px] relative"
                    data-node-id="3:14042"
                    data-name="Time slot"
                  >
                    <p
                      className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[11px] whitespace-nowrap"
                      data-node-id="3:14043"
                    >
                      17–19
                    </p>
                  </div>
                  <div
                    className="bg-[#080b0e] border border-[#26333f] border-solid content-stretch flex flex-[1_0_0] items-start justify-center min-w-px overflow-clip p-[10px] relative"
                    data-node-id="3:14044"
                    data-name="Time slot"
                  >
                    <p
                      className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[11px] whitespace-nowrap"
                      data-node-id="3:14045"
                    >
                      19–21
                    </p>
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px] whitespace-nowrap"
                  data-node-id="3:14046"
                >
                  11–13 ĐÃ ĐẶT · HÃY CHỌN MỘT KHUNG GIỜ
                </p>
              </div>
            </div>
            <div
              className="[word-break:break-word] bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-node-id="3:14047"
              data-name="02 / Gói dịch vụ & tài nguyên"
            >
              <div
                className="border-[#26333f] border-b border-solid content-stretch flex items-center justify-between leading-[normal] overflow-clip px-[22px] py-[18px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="3:14048"
                data-name="Panel heading"
              >
                <p
                  className="font-['Space_Grotesk:Bold'] font-bold relative shrink-0 text-[#edf3f5] text-[17px]"
                  data-node-id="3:14049"
                >{`02 / Gói dịch vụ & tài nguyên`}</p>
                <p
                  className="font-['JetBrains_Mono:Regular'] font-normal relative shrink-0 text-[#617584] text-[10px]"
                  data-node-id="3:14050"
                >
                  TÙY CHỈNH
                </p>
              </div>
              <div
                className="content-stretch flex flex-col gap-[18px] items-start overflow-clip p-[22px] relative shrink-0 w-full"
                data-node-id="3:14051"
                data-name="Panel content"
              >
                <div
                  className="bg-[#102c36] border border-[#42d9f3] border-solid content-stretch flex gap-[16px] items-start overflow-clip p-[16px] relative shrink-0 w-full"
                  data-node-id="3:14052"
                  data-name="Selected package"
                >
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[7px] items-start min-w-px overflow-clip relative"
                    data-node-id="3:14053"
                    data-name="Package details"
                  >
                    <p
                      className="font-['Space_Grotesk:Bold'] font-bold leading-[1.2] relative shrink-0 text-[#edf3f5] text-[19px] tracking-[-0.7px] w-full"
                      data-node-id="3:14054"
                    >
                      ◉ Bản in đầu tiên
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[12px] w-full"
                      data-node-id="3:14055"
                    >
                      Phòng 3 giờ + máy phóng + vật tư + hướng dẫn 1 giờ.
                    </p>
                  </div>
                  <p
                    className="font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[14px] whitespace-nowrap"
                    data-node-id="3:14056"
                  >
                    1.000.000đ
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-col font-normal items-start overflow-clip relative shrink-0 w-full"
                  data-node-id="3:14057"
                  data-name="Data table"
                >
                  <div
                    className="bg-[#131b23] content-stretch flex font-['JetBrains_Mono:Regular'] gap-[14px] items-start leading-[normal] overflow-clip px-[14px] py-[12px] relative shrink-0 text-[#617584] text-[10px] w-full"
                    data-node-id="3:14058"
                    data-name="Column headings"
                  >
                    <p className="relative shrink-0 w-[290px]" data-node-id="3:14059">
                      TÀI NGUYÊN ĐI KÈM
                    </p>
                    <p className="relative shrink-0 w-[90px]" data-node-id="3:14060">
                      SỐ LƯỢNG
                    </p>
                    <p
                      className="relative shrink-0 w-[130px]"
                      data-node-id="3:14061"
                      data-selected-time-badge
                    >
                      CHƯA CHỌN GIỜ
                    </p>
                  </div>
                  <div
                    className="bg-[#0d1218] border-[#26333f] border-b border-solid content-stretch flex gap-[14px] items-center leading-[1.5] overflow-clip px-[14px] py-[17px] relative shrink-0 w-full"
                    data-node-id="3:14062"
                    data-name="Record"
                  >
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#95a7b5] text-[11px] w-[290px]"
                      data-node-id="3:14063"
                    >
                      Máy phóng Durst M605 · EQ-01
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#edf3f5] text-[12px] w-[90px]"
                      data-node-id="3:14064"
                    >
                      01 máy
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#42d9f3] text-[12px] w-[130px]"
                      data-node-id="3:14065"
                    >
                      ✓ Khả dụng
                    </p>
                  </div>
                  <div
                    className="bg-[#131b23] border-[#26333f] border-b border-solid content-stretch flex gap-[14px] items-center leading-[1.5] overflow-clip px-[14px] py-[17px] relative shrink-0 w-full"
                    data-node-id="3:14066"
                    data-name="Record"
                  >
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#95a7b5] text-[11px] w-[290px]"
                      data-node-id="3:14067"
                    >
                      Giấy Ilford RC 20×25 · Lô P11
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#edf3f5] text-[12px] w-[90px]"
                      data-node-id="3:14068"
                    >
                      10 tờ / 60
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#42d9f3] text-[12px] w-[130px]"
                      data-node-id="3:14069"
                    >
                      ✓ Đủ tồn kho
                    </p>
                  </div>
                  <div
                    className="bg-[#0d1218] border-[#26333f] border-b border-solid content-stretch flex gap-[14px] items-center leading-[1.5] overflow-clip px-[14px] py-[17px] relative shrink-0 w-full"
                    data-node-id="3:14070"
                    data-name="Record"
                  >
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#95a7b5] text-[11px] w-[290px]"
                      data-node-id="3:14071"
                    >{`Hóa chất in B&W · Lô C11`}</p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#edf3f5] text-[12px] w-[90px]"
                      data-node-id="3:14072"
                    >
                      01 bộ / 12
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#42d9f3] text-[12px] w-[130px]"
                      data-node-id="3:14073"
                    >
                      ✓ Còn hạn
                    </p>
                  </div>
                  <div
                    className="bg-[#131b23] border-[#26333f] border-b border-solid content-stretch flex gap-[14px] items-center leading-[1.5] overflow-clip px-[14px] py-[17px] relative shrink-0 w-full"
                    data-node-id="3:14074"
                    data-name="Record"
                  >
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#95a7b5] text-[11px] w-[290px]"
                      data-node-id="3:14075"
                    >
                      Đức Huy · Hướng dẫn 14–15h
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#edf3f5] text-[12px] w-[90px]"
                      data-node-id="3:14076"
                    >
                      01 giờ
                    </p>
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#42d9f3] text-[12px] w-[130px]"
                      data-node-id="3:14077"
                    >
                      ✓ Khả dụng
                    </p>
                  </div>
                </div>
                <div
                  className="content-stretch flex font-['Space_Grotesk:Regular'] font-normal items-start justify-between overflow-clip relative shrink-0 text-[12px] w-full"
                  data-node-id="3:14078"
                  data-name="Equipment options"
                >
                  <p
                    className="flex-[1_0_0] leading-[1.6] min-w-px relative text-[#95a7b5]"
                    data-node-id="3:14079"
                  >{`Thiết bị tương thích: âm bản 35 mm & 120.`}</p>
                  <p
                    className="leading-[normal] relative shrink-0 text-[#42d9f3] whitespace-nowrap"
                    data-node-id="3:14080"
                  >
                    Thay đổi cấu hình ↗
                  </p>
                </div>
                <p
                  className="font-['Space_Grotesk:Regular'] font-normal leading-[1.6] relative shrink-0 text-[#95a7b5] text-[11px] w-full"
                  data-node-id="3:14081"
                >
                  Tùy chọn thêm: scanner Epson V850 (+100.000đ/giờ). Máy phóng EQ-02 đang bảo trì,
                  không thể chọn.
                </p>
              </div>
            </div>
          </div>
          <div
            className="content-stretch grid basis-full grid-cols-1 gap-[20px] items-start min-w-px overflow-clip relative w-full xl:grid-cols-2"
            data-node-id="3:14082"
            data-name="Reservation summary"
          >
            <div
              className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full xl:col-span-2"
              data-node-id="3:14083"
              data-name="Tóm tắt đặt chỗ"
            >
              <div
                className="[word-break:break-word] border-[#26333f] border-b border-solid content-stretch flex items-center justify-between leading-[normal] overflow-clip px-[22px] py-[18px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="3:14084"
                data-name="Panel heading"
              >
                <p
                  className="font-['Space_Grotesk:Bold'] font-bold relative shrink-0 text-[#edf3f5] text-[17px]"
                  data-node-id="3:14085"
                >
                  Tóm tắt đặt chỗ
                </p>
                <p
                  className="font-['JetBrains_Mono:Regular'] font-normal relative shrink-0 text-[#617584] text-[10px]"
                  data-node-id="3:14086"
                >
                  BẢN NHÁP
                </p>
              </div>
              <div
                className="content-stretch flex flex-col gap-[18px] items-start overflow-clip p-[22px] relative shrink-0 w-full xl:grid xl:grid-cols-[minmax(0,1.35fr)_minmax(220px,0.75fr)_minmax(280px,1fr)] xl:gap-[24px]"
                data-node-id="3:14087"
                data-name="Panel content"
              >
                <p
                  className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#42d9f3] text-[11px] tracking-[1px] whitespace-nowrap xl:col-start-1 xl:row-start-1"
                  data-node-id="3:14088"
                  data-selected-space-summary
                >
                  HẠT BẠC LAB / PHÒNG TỐI 01
                </p>
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[24px] tracking-[-0.7px] w-[min-content] xl:col-start-2 xl:row-start-1"
                  data-node-id="3:14089"
                  data-selected-date-summary
                >
                  Chưa chọn ngày
                </p>
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[14px] w-[min-content] xl:col-start-3 xl:row-start-1"
                  data-node-id="3:14090"
                  data-selected-time-summary
                >
                  Chưa chọn khung giờ · 01 người
                </p>
                <div
                  className="[word-break:break-word] content-stretch flex flex-col font-normal gap-[16px] items-start leading-[normal] overflow-clip relative shrink-0 text-[12px] w-full whitespace-nowrap xl:col-start-1 xl:row-span-3 xl:row-start-2"
                  data-node-id="3:14091"
                  data-name="Itemized pricing"
                >
                  <div
                    className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                    data-node-id="3:14092"
                    data-name="Cost line"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#95a7b5]"
                      data-node-id="3:14093"
                    >
                      Phòng tối · 3 × 180.000đ
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#edf3f5]"
                      data-node-id="3:14094"
                    >
                      540.000đ
                    </p>
                  </div>
                  <div
                    className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                    data-node-id="3:14095"
                    data-name="Cost line"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#95a7b5]"
                      data-node-id="3:14096"
                    >
                      Máy phóng Durst M605
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#edf3f5]"
                      data-node-id="3:14097"
                    >
                      120.000đ
                    </p>
                  </div>
                  <div
                    className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                    data-node-id="3:14098"
                    data-name="Cost line"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#95a7b5]"
                      data-node-id="3:14099"
                    >
                      Giấy Ilford RC · 10 tờ
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#edf3f5]"
                      data-node-id="3:14100"
                    >
                      180.000đ
                    </p>
                  </div>
                  <div
                    className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                    data-node-id="3:14101"
                    data-name="Cost line"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#95a7b5]"
                      data-node-id="3:14102"
                    >
                      Hóa chất in đen trắng
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#edf3f5]"
                      data-node-id="3:14103"
                    >
                      90.000đ
                    </p>
                  </div>
                  <div
                    className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                    data-node-id="3:14104"
                    data-name="Cost line"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#95a7b5]"
                      data-node-id="3:14105"
                    >
                      Chuyên gia · 1 giờ
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#edf3f5]"
                      data-node-id="3:14106"
                    >
                      150.000đ
                    </p>
                  </div>
                  <div
                    className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
                    data-node-id="3:14107"
                    data-name="Cost line"
                  >
                    <p
                      className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#95a7b5]"
                      data-node-id="3:14108"
                    >
                      Ưu đãi gói dịch vụ
                    </p>
                    <p
                      className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#6ddbad]"
                      data-node-id="3:14109"
                    >
                      −80.000đ
                    </p>
                  </div>
                </div>
                <div
                  className="[word-break:break-word] border-[#26333f] border-solid border-t content-stretch flex flex-col font-normal gap-[8px] items-start overflow-clip pt-[20px] relative shrink-0 w-full xl:col-start-2 xl:row-start-2"
                  data-node-id="3:14110"
                  data-name="Total"
                >
                  <p
                    className="font-['JetBrains_Mono:Regular'] leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px] whitespace-nowrap"
                    data-node-id="3:14111"
                  >
                    TỔNG THANH TOÁN / VND
                  </p>
                  <p
                    className="font-['Space_Grotesk:Regular'] leading-[normal] relative shrink-0 text-[#edf3f5] text-[36px] tracking-[-1px] whitespace-nowrap"
                    data-node-id="3:14112"
                  >
                    1.000.000đ
                  </p>
                  <p
                    className="font-['Space_Grotesk:Regular'] leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[11px] w-[min-content]"
                    data-node-id="3:14113"
                  >
                    Đã gồm thuế. Chưa phát sinh phụ phí ngoài giờ.
                  </p>
                </div>
                <div
                  className="bg-[#152c26] content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[15px] relative shrink-0 w-full xl:col-start-3 xl:row-span-2 xl:row-start-2"
                  data-node-id="3:14114"
                  data-name="Availability validation"
                >
                  <div
                    className="bg-[#152c26] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                    data-node-id="3:14115"
                    data-name="Status"
                  >
                    <div
                      className="bg-[#6ddbad] relative shrink-0 size-[4px]"
                      data-node-id="3:14116"
                      data-name="Indicator"
                    />
                    <p
                      className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                      data-node-id="3:14117"
                    >
                      05 / 05 TÀI NGUYÊN KHẢ DỤNG
                    </p>
                  </div>
                  <p
                    className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                    data-node-id="3:14118"
                  >
                    Đã kiểm tra phòng, máy phóng, giấy, hóa chất và chuyên gia. Không có xung đột
                    lịch.
                  </p>
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#6ddbad] text-[10px] whitespace-nowrap"
                    data-node-id="3:14119"
                  >
                    CẬP NHẬT 10:42 · KIỂM TRA LẠI ↻
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content] xl:col-start-2 xl:row-start-3"
                  data-node-id="3:14120"
                >
                  ☑ Tôi đã đọc chính sách hủy và quy định sử dụng phòng tối.
                </p>
                <div
                  className="bg-[#42d9f3] border border-[#42d9f3] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[22px] py-[14px] relative rounded-[4px] shrink-0 xl:col-start-2 xl:row-start-4 xl:w-full"
                  data-node-id="3:14121"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#080b0e] text-[14px] whitespace-nowrap"
                    data-node-id="3:14122"
                  >
                    Tiếp tục thanh toán
                  </p>
                  <div
                    className="relative shrink-0 size-[15px]"
                    data-node-id="3:15129"
                    data-name="arrow-up-right"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgArrowUpRight1}
                    />
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[11px] w-[min-content] xl:col-span-2 xl:col-start-2 xl:row-start-5"
                  data-node-id="3:14124"
                >
                  Ở bước tiếp theo: chọn QR ngân hàng hoặc thẻ. Phòng và thiết bị chỉ được khóa khi
                  xác nhận đặt thành công.
                </p>
              </div>
            </div>
            <div
              className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative shrink-0 w-full"
              data-node-id="3:14125"
              data-name="Payment preview"
            >
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:14126"
              >
                03 / THANH TOÁN TIẾP THEO
              </p>
              <div
                className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0"
                data-node-id="3:14127"
                data-name="Payment methods"
              >
                <div
                  className="bg-[#19232d] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:14128"
                  data-name="Status"
                >
                  <div
                    className="bg-[#95a7b5] relative shrink-0 size-[4px]"
                    data-node-id="3:14129"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[10px] whitespace-nowrap"
                    data-node-id="3:14130"
                  >
                    CHUYỂN KHOẢN NGÂN HÀNG
                  </p>
                </div>
                <div
                  className="bg-[#19232d] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[5px] relative rounded-[3px] shrink-0"
                  data-node-id="3:14131"
                  data-name="Status"
                >
                  <div
                    className="bg-[#95a7b5] relative shrink-0 size-[4px]"
                    data-node-id="3:14132"
                    data-name="Indicator"
                  />
                  <p
                    className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#95a7b5] text-[10px] whitespace-nowrap"
                    data-node-id="3:14133"
                  >
                    VNPAY / THẺ
                  </p>
                </div>
              </div>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:14134"
              >
                Chọn Vietcombank, BIDV, VietinBank, Techcombank, MB Bank, ACB, VPBank hoặc
                Sacombank ở bước xác nhận. Hệ thống lưu lựa chọn để đối soát, không tự động trừ tiền.
              </p>
            </div>
            <div
              className="border border-[#26333f] border-solid content-stretch flex flex-col gap-[13px] items-start overflow-clip p-[20px] relative shrink-0 w-full"
              data-node-id="3:14135"
              data-name="Provider support"
            >
              <p
                className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#95a7b5] text-[11px] tracking-[1px] whitespace-nowrap"
                data-node-id="3:14136"
              >
                CẦN TƯ VẤN?
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#edf3f5] text-[19px] tracking-[-0.7px] w-[min-content]"
                data-node-id="3:14137"
              >
                Hạt Bạc Lab
              </p>
              <p
                className="[word-break:break-word] font-['Space_Grotesk:Regular'] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#95a7b5] text-[12px] w-[min-content]"
                data-node-id="3:14138"
              >
                Phản hồi trong khoảng 15 phút. Hỏi về quy trình in và thiết bị trước khi đặt.
              </p>
              <div
                className="bg-[#0d1218] border border-[#26333f] border-solid content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[4px] shrink-0"
                data-node-id="3:14139"
                data-name="Action"
              >
                <p
                  className="[word-break:break-word] font-['Space_Grotesk:Bold'] font-bold leading-[normal] relative shrink-0 text-[#edf3f5] text-[12px] whitespace-nowrap"
                  data-node-id="3:14140"
                >
                  Nhắn nhà cung cấp
                </p>
                <div
                  className="relative shrink-0 size-[15px]"
                  data-node-id="3:15132"
                  data-name="arrow-up-right"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgArrowUpRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="[word-break:break-word] border-[#26333f] border-solid border-t content-stretch flex items-center justify-between leading-[normal] overflow-clip px-[48px] py-[34px] relative shrink-0 w-full whitespace-nowrap"
        data-node-id="3:14142"
        data-name="Chân trang"
      >
        <div
          className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0"
          data-node-id="3:14143"
          data-name="Brand statement"
        >
          <p
            className="font-['Space_Grotesk:Bold'] font-bold relative shrink-0 text-[#edf3f5] text-[20px]"
            data-node-id="3:14144"
          >{`FILM//SPACE`}</p>
          <p
            className="font-['Space_Grotesk:Regular'] font-normal relative shrink-0 text-[#95a7b5] text-[12px]"
            data-node-id="3:14145"
          >
            Kết nối không gian. Giữ lại chất phim.
          </p>
        </div>
        <div
          className="content-stretch flex font-['Space_Grotesk:Regular'] font-normal gap-[28px] items-start overflow-clip relative shrink-0 text-[#95a7b5] text-[12px]"
          data-node-id="3:14146"
          data-name="Footer links"
        >
          <p className="relative shrink-0" data-node-id="3:14147">
            Hướng dẫn
          </p>
          <p className="relative shrink-0" data-node-id="3:14148">
            Điều khoản
          </p>
          <p className="relative shrink-0" data-node-id="3:14149">
            Quyền riêng tư
          </p>
          <p className="relative shrink-0" data-node-id="3:14150">
            Hỗ trợ
          </p>
        </div>
        <p
          className="font-['JetBrains_Mono:Regular'] font-normal relative shrink-0 text-[#617584] text-[10px]"
          data-node-id="3:14151"
        >
          ĐỒ ÁN TỐT NGHIỆP / DEMO 2026
        </p>
      </div>
    </div>
  )
}
