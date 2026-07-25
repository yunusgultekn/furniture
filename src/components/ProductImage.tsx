import React from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data/categories';

interface ProductImageProps {
  product: Product;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  product,
  className = '',
  width = '100%',
  height = 'auto',
}) => {
  const catObj = CATEGORIES.find((c) => c.slug === product.cat);
  const colors = catObj?.colors || ['#78716c', '#a8a29e'];
  const [c1, c2] = colors;

  // Render SVG diagrams based on category type
  const renderShape = () => {
    switch (product.cat) {
      case 'cekmece':
        return (
          <g transform="translate(70,60)">
            <rect x="0" y="0" width="260" height="160" rx="12" fill={c1} opacity="0.9" />
            <rect x="16" y="20" width="228" height="56" rx="6" fill={c2} opacity="0.8" />
            <rect x="16" y="88" width="228" height="56" rx="6" fill={c2} opacity="0.6" />
            <rect x="100" y="42" width="60" height="10" rx="5" fill="#ffffff" opacity="0.8" />
            <rect x="100" y="110" width="60" height="10" rx="5" fill="#ffffff" opacity="0.8" />
          </g>
        );

      case 'ray':
        return (
          <g transform="translate(50,110)">
            <rect x="0" y="0" width="300" height="26" rx="8" fill={c1} />
            <rect x="12" y="7" width="220" height="12" rx="6" fill={c2} />
            <circle cx="40" cy="13" r="8" fill="#ffffff" opacity="0.7" />
            <circle cx="150" cy="13" r="8" fill="#ffffff" opacity="0.7" />
            <rect x="0" y="38" width="260" height="16" rx="6" fill={c2} opacity="0.85" />
          </g>
        );

      case 'kulp':
        return (
          <g transform="translate(80,120)">
            <rect x="0" y="0" width="240" height="22" rx="11" fill={c1} />
            <rect x="8" y="5" width="224" height="6" rx="3" fill="#ffffff" opacity="0.6" />
            <circle cx="20" cy="45" r="12" fill={c2} />
            <circle cx="220" cy="45" r="12" fill={c2} />
            <rect x="14" y="22" width="12" height="25" fill={c1} />
            <rect x="214" y="22" width="12" height="25" fill={c1} />
          </g>
        );

      case 'mentese':
        return (
          <g transform="translate(110,75)">
            <rect x="0" y="20" width="75" height="120" rx="10" fill={c1} />
            <rect x="105" y="20" width="75" height="120" rx="10" fill={c1} />
            <circle cx="90" cy="65" r="28" fill="none" stroke={c2} strokeWidth="12" />
            <circle cx="90" cy="65" r="12" fill={c2} />
            <circle cx="25" cy="50" r="7" fill="#ffffff" opacity="0.7" />
            <circle cx="25" cy="110" r="7" fill="#ffffff" opacity="0.7" />
          </g>
        );

      case 'ayak':
        return (
          <g transform="translate(140,60)">
            <rect x="0" y="0" width="120" height="18" rx="5" fill={c1} />
            <path d="M35 18 L22 165 L98 165 L85 18 Z" fill={c1} opacity="0.85" />
            <rect x="18" y="165" width="84" height="16" rx="8" fill={c2} />
            <rect x="45" y="35" width="30" height="5" fill="#ffffff" opacity="0.4" />
            <rect x="42" y="70" width="36" height="5" fill="#ffffff" opacity="0.4" />
          </g>
        );

      case 'raf':
        return (
          <g transform="translate(60,85)">
            <rect x="0" y="0" width="280" height="18" rx="5" fill={c1} />
            <rect x="15" y="18" width="16" height="45" rx="4" fill={c2} />
            <rect x="249" y="18" width="16" height="45" rx="4" fill={c2} />
            <rect x="0" y="75" width="280" height="18" rx="5" fill={c1} opacity="0.75" />
            <circle cx="70" cy="68" r="7" fill={c2} />
            <circle cx="210" cy="68" r="7" fill={c2} />
          </g>
        );

      case 'aski':
        return (
          <g transform="translate(80,55)">
            <rect x="0" y="30" width="240" height="16" rx="8" fill={c1} />
            <path
              d="M45 46 q12 45 -10 68"
              fill="none"
              stroke={c2}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M120 46 q12 45 -10 68"
              fill="none"
              stroke={c2}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M195 46 q12 45 -10 68"
              fill="none"
              stroke={c2}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="6" cy="38" r="10" fill={c2} />
            <circle cx="234" cy="38" r="10" fill={c2} />
          </g>
        );

      case 'kilit':
        return (
          <g transform="translate(140,65)">
            <rect x="0" y="55" width="120" height="90" rx="12" fill={c1} />
            <path
              d="M20 55 V36 a40 40 0 0 1 80 0 V55"
              fill="none"
              stroke={c2}
              strokeWidth="14"
            />
            <circle cx="60" cy="95" r="14" fill={c2} />
            <rect x="54" y="100" width="12" height="26" rx="4" fill={c2} />
          </g>
        );

      case 'baglanti':
        return (
          <g transform="translate(110,75)">
            <circle cx="45" cy="75" r="38" fill="none" stroke={c1} strokeWidth="14" />
            <circle cx="45" cy="75" r="14" fill={c2} />
            <rect x="125" y="30" width="16" height="95" rx="5" fill={c1} />
            <path d="M133 20 l-16 18 h32 z" fill={c1} />
            <rect x="120" y="52" width="26" height="5" fill={c2} />
            <rect x="120" y="68" width="26" height="5" fill={c2} />
            <rect x="120" y="84" width="26" height="5" fill={c2} />
          </g>
        );

      case 'aydinlatma':
        return (
          <g transform="translate(70,105)">
            <rect x="0" y="0" width="260" height="28" rx="14" fill={c1} />
            <rect x="16" y="8" width="228" height="12" rx="6" fill={c2} />
            {[45, 110, 175, 240].map((x, idx) => (
              <g key={idx}>
                <circle cx={x} cy="14" r="5" fill="#fffbe6" />
                <path d={`M${x} 32 l-18 28 h36 z`} fill="#f2c14e" opacity="0.3" />
              </g>
            ))}
          </g>
        );

      default:
        return <circle cx="200" cy="150" r="75" fill={c1} opacity="0.5" />;
    }
  };

  return (
    <svg
      viewBox="0 0 400 280"
      className={`w-full h-auto object-cover rounded-md transition-transform duration-500 ${className}`}
      style={{ width, height }}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={product.name}
    >
      <defs>
        <linearGradient id={`grad-${product.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c2} stopOpacity="0.12" />
          <stop offset="100%" stopColor={c1} stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Subtle Grid Pattern Background */}
      <rect width="400" height="280" fill={`url(#grad-${product.id})`} />
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.25" />
      </pattern>
      <rect width="400" height="280" fill="url(#grid)" />

      {/* Main Vector Shape */}
      {renderShape()}

      {/* Brand stamp overlay */}
      <rect x="16" y="248" width="70" height="20" rx="4" fill="#ffffff" opacity="0.85" />
      <text
        x="51"
        y="262"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#292524"
      >
        {product.brand}
      </text>

      {/* Product color indicator dot */}
      <circle cx="372" cy="258" r="8" fill={c1} stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
};
