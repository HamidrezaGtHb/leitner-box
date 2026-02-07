import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Calendar icon built with divs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 110,
            height: 110,
          }}
        >
          {/* Top pins */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 64,
              marginBottom: -4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 16,
                background: '#e5e5e5',
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 8,
                height: 16,
                background: '#e5e5e5',
                borderRadius: 4,
              }}
            />
          </div>
          {/* Calendar body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 90,
              height: 84,
              border: '3px solid #e5e5e5',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {/* Header bar */}
            <div
              style={{
                height: 24,
                background: '#e5e5e5',
                width: '100%',
              }}
            />
            {/* Date number */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e5e5e5',
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              40
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
