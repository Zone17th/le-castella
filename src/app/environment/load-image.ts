export class LoadImage {
  static loadImg(imgPath: string): string {
    if (!imgPath) {
      return '';
    }
    if (imgPath.startsWith('http')) {
      return imgPath;
    }
    imgPath = imgPath.replace("\\", "/");
    return `http://localhost:8088/public/files/${imgPath}`;
  }
}
