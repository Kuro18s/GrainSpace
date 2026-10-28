# -*- coding: utf-8 -*-
"""Phục chế ảnh quét cũ bằng xử lý ảnh cổ điển (OpenCV): bỏ vết xước/bụi, giảm nhiễu, khôi phục độ tương phản và màu, làm nét.
Dùng thử với ảnh thật:  python restoration.py anh_cu.jpg anh_moi.jpg"""
import sys
import cv2
import numpy as np

def degrade(img, seed=0):
    """Mô phỏng ảnh cũ: phai màu + ám vàng + nhiễu hạt + vết xước + bụi. (img: BGR uint8)"""
    rng = np.random.default_rng(seed); h, w = img.shape[:2]
    x = img.astype(np.float32) * 0.62 + 60; x[..., 0] *= 0.85
    x = cv2.GaussianBlur(x, (0, 0), 0.8) + rng.normal(0, 9, x.shape)
    x = np.clip(x, 0, 255).astype(np.uint8)
    for _ in range(6):
        px, y0 = int(rng.integers(5, w - 5)), int(rng.integers(0, h // 2))
        cv2.line(x, (px, y0), (px + int(rng.integers(-6, 6)), y0 + int(rng.integers(h // 4, h // 2))), (lambda v: (v, v, v))(int(rng.choice([20, 240]))), 1)
    for _ in range(30):
        cv2.circle(x, (int(rng.integers(0, w)), int(rng.integers(0, h))), int(rng.integers(1, 3)), (lambda v: (v, v, v))(int(rng.choice([25, 240]))), -1)
    return x

def detect_defects(img, thr=45):
    """Tìm vết xước/bụi: chi tiết sáng hoặc tối mảnh hơn ~7 px (top-hat / black-hat)."""
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY); k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    m = ((cv2.morphologyEx(g, cv2.MORPH_TOPHAT, k) > thr) | (cv2.morphologyEx(g, cv2.MORPH_BLACKHAT, k) > thr)).astype(np.uint8) * 255
    return cv2.dilate(m, np.ones((3, 3), np.uint8))

def remove_defects(img): return cv2.inpaint(img, detect_defects(img), 3, cv2.INPAINT_TELEA)

def auto_levels(img, lo=0.5, hi=99.5):
    """Kéo giãn từng kênh màu: lấy lại độ tương phản và bớt ám màu."""
    out = np.empty_like(img)
    for c in range(3):
        a, b = np.percentile(img[..., c], [lo, hi]); out[..., c] = np.clip((img[..., c].astype(np.float32) - a) * 255 / max(b - a, 1), 0, 255)
    return out

def denoise(img, h=5): return cv2.fastNlMeansDenoisingColored(img, None, h, h, 7, 21)

def sharpen(img): return cv2.addWeighted(img, 1.4, cv2.GaussianBlur(img, (0, 0), 1.5), -0.4, 0)

def restore(img): return sharpen(auto_levels(denoise(remove_defects(img))))

if __name__ == "__main__":
    if len(sys.argv) != 3: sys.exit("Cách dùng: python restoration.py anh_vao.jpg anh_ra.jpg")
    im = cv2.imread(sys.argv[1]); assert im is not None, "Không đọc được ảnh"
    cv2.imwrite(sys.argv[2], restore(im)); print("Đã lưu", sys.argv[2])
