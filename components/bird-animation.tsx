"use client"

export default function BirdAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Bird 1 */}
      <div className="bird-1 absolute top-[20%] left-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 8C18 8 16 10 14 12L8 18C6 20 6 22 8 24C10 26 12 26 14 24L16 22C18 20 20 18 20 16M20 8C22 8 24 10 26 12L32 18C34 20 34 22 32 24C30 26 28 26 26 24L24 22C22 20 20 18 20 16M20 8V16"
            stroke="rgba(107, 207, 155, 0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bird 2 */}
      <div className="bird-2 absolute top-[10%] left-0">
        <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 8C18 8 16 10 14 12L8 18C6 20 6 22 8 24C10 26 12 26 14 24L16 22C18 20 20 18 20 16M20 8C22 8 24 10 26 12L32 18C34 20 34 22 32 24C30 26 28 26 26 24L24 22C22 20 20 18 20 16M20 8V16"
            stroke="rgba(255, 201, 60, 0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bird 3 */}
      <div className="bird-3 absolute top-[30%] right-0">
        <svg width="45" height="45" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 8C18 8 16 10 14 12L8 18C6 20 6 22 8 24C10 26 12 26 14 24L16 22C18 20 20 18 20 16M20 8C22 8 24 10 26 12L32 18C34 20 34 22 32 24C30 26 28 26 26 24L24 22C22 20 20 18 20 16M20 8V16"
            stroke="rgba(107, 207, 155, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bird 4 */}
      <div className="bird-4 absolute top-[50%] left-0">
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 8C18 8 16 10 14 12L8 18C6 20 6 22 8 24C10 26 12 26 14 24L16 22C18 20 20 18 20 16M20 8C22 8 24 10 26 12L32 18C34 20 34 22 32 24C30 26 28 26 26 24L24 22C22 20 20 18 20 16M20 8V16"
            stroke="rgba(255, 201, 60, 0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bird 5 */}
      <div className="bird-5 absolute bottom-0 left-[30%]">
        <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 8C18 8 16 10 14 12L8 18C6 20 6 22 8 24C10 26 12 26 14 24L16 22C18 20 20 18 20 16M20 8C22 8 24 10 26 12L32 18C34 20 34 22 32 24C30 26 28 26 26 24L24 22C22 20 20 18 20 16M20 8V16"
            stroke="rgba(107, 207, 155, 0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
