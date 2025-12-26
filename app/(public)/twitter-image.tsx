import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'ApexMed - Premium Medical Tourism in South Africa'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            background: 'white',
            padding: '20px 40px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          }}
        >
           {/* Logo Icon */}
           <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 20 }}
           >
            <path d="M19 14c1.49-1.28 3.6-1.28 5.14 0 .34.66.17 1.48-.43 1.98-.6.5-1.43.5-2.03 0-.6-.5-.77-1.32-.43-1.98" />
            <path d="M2 14c1.49-1.28 3.6-1.28 5.14 0 .34.66.17 1.48-.43 1.98-.6.5-1.43.5-2.03 0-.6-.5-.77-1.32-.43-1.98" />
            <path d="M12 2v20" />
            <path d="M12 12h10" />
            <path d="M12 12H2" />
            <path d="M12 7a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" transform="translate(0, 5)" />
           </svg>
           <h1 style={{ fontSize: 64, fontWeight: 'bold', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
            ApexMed
          </h1>
        </div>
        <p style={{ fontSize: 36, fontWeight: 600, color: '#334155', textAlign: 'center', maxWidth: '80%', margin: 0, marginBottom: 16 }}>
          Premium Medical Tourism in South Africa
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
            <div style={{ background: '#0ea5e9', color: 'white', padding: '8px 24px', borderRadius: '50px', fontSize: 20, fontWeight: 500 }}>World-Class Surgeons</div>
            <div style={{ background: '#0ea5e9', color: 'white', padding: '8px 24px', borderRadius: '50px', fontSize: 20, fontWeight: 500 }}>Affordable Care</div>
            <div style={{ background: '#0ea5e9', color: 'white', padding: '8px 24px', borderRadius: '50px', fontSize: 20, fontWeight: 500 }}>Full Support</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
