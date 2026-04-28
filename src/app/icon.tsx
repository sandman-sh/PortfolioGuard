import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff9d',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: '2px solid #00ff9d',
        }}
      >
        <div style={{ display: 'flex', marginTop: '-2px' }}>PG</div>
      </div>
    ),
    {
      ...size,
    }
  )
}
