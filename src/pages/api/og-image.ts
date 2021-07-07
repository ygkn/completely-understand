import { createCanvas, registerFont, Image } from 'canvas';
import Mikan from 'mikanjs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import LogoImage from '../../../public/icons/192.png';

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const text =
    (Array.isArray(request.query.text)
      ? request.query.text[0]
      : request.query.text) ?? '';

  const texts = text.split(':');

  const buf = await createOGP({
    title: texts[0] ?? '',
    extact: texts[1] ?? '',
  });

  response.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buf.length,
  });
  response.end(buf, 'binary');
};

const createOGP = async (pageInfo: {
  title: string;
  extact: string;
}): Promise<Buffer> => {
  registerFont(path.join('./fonts/NotoSansCJKjp-Regular.otf'), {
    family: 'NotoSansJP',
  });
  registerFont(path.join('./fonts/NotoSansCJKjp-Bold.otf'), {
    family: 'NotoSansJP',
    weight: 'bold',
  });

  const width = 1200;
  const height = 630;
  const rem = width / 30;
  const mergin = 1.5 * rem;
  const innerWidth = 1200 - mergin * 2;
  const innerButtom = height - mergin;

  let top = mergin;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const renderText = (text: string, lineHeight: number, maxLine = Infinity) => {
    let row = '';
    const words = text.split('');

    let lineCount = 0;

    for (const word of words) {
      if (ctx.measureText(`${row}${word}`).width > innerWidth) {
        if (lineCount >= maxLine - 1) {
          row = `${row.slice(0, -1)}…`;
        }

        if (top >= innerButtom || lineCount >= maxLine) {
          return;
        }

        ctx.fillText(row, width / 2, top);
        top += lineHeight;
        lineCount += 1;
        row = word;
      } else {
        row = `${row}${word}`;
      }
    }

    if (row.length !== 0) {
      if (top >= innerButtom || lineCount >= maxLine) {
        return;
      }

      ctx.fillText(row, width / 2, top);
      top += lineHeight;
    }
  };

  ctx.strokeStyle = 'none';

  // background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // logo
  const logoSize = 3 * rem;

  const logoImage = new Image();
  logoImage.onload = () => {
    console.log('draw');
    ctx.drawImage(
      logoImage,
      width / 2 - (1 / 2) * logoSize,
      top,
      logoSize,
      logoSize
    );
  };

  logoImage.onerror = console.log;

  logoImage.src = LogoImage;

  top += logoSize;

  // text
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.font = `bold ${1.5 * rem}px NotoSansJP`;
  renderText(`${pageInfo.title}完全に理解した`, 2.5 * rem, 3);

  ctx.fillStyle = '#444444';
  top += rem;

  ctx.font = `${rem}px NotoSansJP`;
  renderText(pageInfo.extact, 1.5 * rem);

  return canvas.toBuffer();
};
