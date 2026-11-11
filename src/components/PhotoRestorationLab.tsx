'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'

type Adjustments = {
  contrast: number
  exposure: number
  saturation: number
  softness: number
  vignette: number
  warmth: number
}

const presets: Record<string, Adjustments> = {
  natural: { contrast: 105, exposure: 3, saturation: 108, softness: 0, vignette: 8, warmth: 5 },
  restore: { contrast: 122, exposure: 9, saturation: 92, softness: 3, vignette: 3, warmth: 4 },
  beauty: { contrast: 108, exposure: 7, saturation: 118, softness: 7, vignette: 12, warmth: 11 },
  mono: { contrast: 128, exposure: 4, saturation: 0, softness: 1, vignette: 18, warmth: 0 },
}

const controlConfig: Array<{
  key: keyof Adjustments
  label: string
  max: number
  min: number
  suffix: string
}> = [
  { key: 'exposure', label: 'Độ sáng', min: -25, max: 30, suffix: '%' },
  { key: 'contrast', label: 'Tương phản', min: 70, max: 150, suffix: '%' },
  { key: 'saturation', label: 'Độ bão hòa', min: 0, max: 170, suffix: '%' },
  { key: 'warmth', label: 'Màu ấm', min: 0, max: 35, suffix: '%' },
  { key: 'softness', label: 'Làm mịn', min: 0, max: 12, suffix: '' },
  { key: 'vignette', label: 'Tối viền', min: 0, max: 45, suffix: '%' },
]

export function PhotoRestorationLab({
  onClose,
  onNotify,
  open,
}: {
  onClose: () => void
  onNotify: (message: string) => void
  open: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const [adjustments, setAdjustments] = useState<Adjustments>(presets.natural)
  const [activePreset, setActivePreset] = useState('natural')
  const [fileName, setFileName] = useState('')
  const [hasImage, setHasImage] = useState(false)
  const [showOriginal, setShowOriginal] = useState(false)

  useEffect(() => {
    if (!hasImage || !imageRef.current || !canvasRef.current) return
    const image = imageRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const maxDimension = 1800
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight))
    canvas.width = Math.round(image.naturalWidth * scale)
    canvas.height = Math.round(image.naturalHeight * scale)

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.filter = showOriginal
      ? 'none'
      : `brightness(${100 + adjustments.exposure}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%) sepia(${adjustments.warmth}%) blur(${adjustments.softness / 12}px)`
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    context.filter = 'none'

    if (!showOriginal && adjustments.vignette > 0) {
      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) * 0.2,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.7,
      )
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, `rgba(0,0,0,${adjustments.vignette / 100})`)
      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [adjustments, hasImage, showOriginal])

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    },
    [],
  )

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      onNotify('Vui lòng chọn tệp ảnh JPG, PNG hoặc WEBP.')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      onNotify('Ảnh vượt quá giới hạn 15 MB.')
      return
    }

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    const image = new Image()
    image.onload = () => {
      imageRef.current = image
      setFileName(file.name)
      setHasImage(true)
      setAdjustments(presets.restore)
      setActivePreset('restore')
      onNotify('Ảnh đã được tải vào phòng lab.')
    }
    image.src = url
  }

  const applyPreset = (name: keyof typeof presets) => {
    setAdjustments(presets[name])
    setActivePreset(name)
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas || !hasImage) return
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = `${fileName.replace(/\.[^.]+$/, '') || 'filmspace'}-restored.jpg`
        anchor.click()
        URL.revokeObjectURL(url)
        onNotify('Ảnh đã xử lý được tải xuống.')
      },
      'image/jpeg',
      0.94,
    )
  }

  if (!open) return null

  return (
    <div className="photo-lab-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="photo-lab-title"
        aria-modal="true"
        className="photo-lab"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header>
          <div>
            <span className="eyebrow">MUSE / PHOTO RESTORATION LAB</span>
            <h2 id="photo-lab-title">Phục chế & làm đẹp ảnh.</h2>
            <p>Xử lý cục bộ trong trình duyệt. Ảnh của bạn không được tải lên máy chủ.</p>
          </div>
          <button aria-label="Đóng phòng lab" onClick={onClose} type="button">×</button>
        </header>

        <div className="photo-lab-workspace">
          <div className={`photo-stage ${hasImage ? 'has-image' : ''}`}>
            {!hasImage && (
              <label className="photo-upload">
                <span>+</span>
                <strong>Chọn ảnh cần phục chế</strong>
                <small>JPG, PNG hoặc WEBP · tối đa 15 MB</small>
                <input accept="image/jpeg,image/png,image/webp" onChange={uploadImage} type="file" />
              </label>
            )}
            <canvas aria-label="Ảnh xem trước sau xử lý" ref={canvasRef} />
            {hasImage && (
              <div className="photo-stage-tools">
                <label>
                  Thay ảnh
                  <input accept="image/jpeg,image/png,image/webp" onChange={uploadImage} type="file" />
                </label>
                <button
                  onPointerDown={() => setShowOriginal(true)}
                  onPointerLeave={() => setShowOriginal(false)}
                  onPointerUp={() => setShowOriginal(false)}
                  type="button"
                >
                  Giữ để xem ảnh gốc
                </button>
              </div>
            )}
          </div>

          <aside className="photo-controls">
            <div className="photo-presets">
              <span>CHẾ ĐỘ XỬ LÝ</span>
              <div>
                {[
                  ['natural', 'Tự nhiên'],
                  ['restore', 'Phục chế'],
                  ['beauty', 'Làm đẹp'],
                  ['mono', 'Đen trắng'],
                ].map(([key, label]) => (
                  <button
                    className={activePreset === key ? 'is-active' : ''}
                    disabled={!hasImage}
                    key={key}
                    onClick={() => applyPreset(key)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="photo-sliders">
              {controlConfig.map((control) => (
                <label key={control.key}>
                  <span>
                    {control.label}
                    <output>{adjustments[control.key]}{control.suffix}</output>
                  </span>
                  <input
                    disabled={!hasImage}
                    max={control.max}
                    min={control.min}
                    onChange={(event) => {
                      setActivePreset('custom')
                      setAdjustments((current) => ({
                        ...current,
                        [control.key]: Number(event.target.value),
                      }))
                    }}
                    type="range"
                    value={adjustments[control.key]}
                  />
                </label>
              ))}
            </div>

            <div className="photo-lab-note">
              <span />
              <p>
                <strong>Gợi ý:</strong> preset Phục chế cân bằng lại ảnh cũ bị bạc màu; preset Làm đẹp tăng sắc da, độ sáng và độ mềm vừa phải.
              </p>
            </div>

            <footer>
              <button
                disabled={!hasImage}
                onClick={() => {
                  applyPreset('natural')
                  onNotify('Đã đặt lại thông số ảnh.')
                }}
                type="button"
              >
                Đặt lại
              </button>
              <button disabled={!hasImage} onClick={downloadImage} type="button">
                Tải ảnh JPG →
              </button>
            </footer>
          </aside>
        </div>
      </section>
    </div>
  )
}
