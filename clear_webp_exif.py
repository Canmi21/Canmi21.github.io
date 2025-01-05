import os
from PIL import Image

def clear_exif_in_webp_images(root_dir):
    """
    遍历当前目录及其所有子目录，清除所有 WebP 图片的 EXIF 信息。
    """
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.lower().endswith('.webp'):
                filepath = os.path.join(dirpath, filename)
                try:
                    with Image.open(filepath) as img:
                        img_data = img.convert("RGB")  # 移除元数据
                        img_data.save(filepath, "webp")
                    print(f"[✔] 清除成功: {filepath}")
                except Exception as e:
                    print(f"[❌] 处理失败: {filepath} - 错误信息: {e}")

if __name__ == "__main__":
    current_directory = os.getcwd()
    print(f"📂 正在处理目录: {current_directory}")
    clear_exif_in_webp_images(current_directory)
    print("\n✅ 所有 WebP 图片的 EXIF 信息已清除完成。")
