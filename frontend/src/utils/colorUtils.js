/**
 * Utility to get a consistent background color for a company logo based on its name.
 * Returns HEX codes to ensure they always render regardless of Tailwind purging.
 */
export const getCompanyColor = (companyName, brandColor) => {
    // 1. Map legacy Tailwind classes to Hex equivalents if provided in DB
    const classToHex = {
        'bg-primary': '#4640DE',
        'bg-emerald-500': '#10B981',
        'bg-rose-500': '#F43F5E',
        'bg-amber-500': '#F59E0B',
        'bg-indigo-600': '#4F46E5',
        'bg-cyan-500': '#06B6D4',
        'bg-violet-500': '#8B5CF6',
        'bg-teal-500': '#14B8A6'
    };

    if (brandColor && classToHex[brandColor]) {
        return classToHex[brandColor];
    }

    // 2. High-contrast professional palette (Hex)
    const hexPalette = [
        '#4640DE', // Indigo
        '#00A884', // Mint/Emerald
        '#FF4F4F', // Warm Red
        '#FFB800', // Amber
        '#26A4FF', // Sky Blue
        '#7B61FF', // Purple
        '#FF3D71', // Rose
        '#00C2FF', // Cyan
        '#FF5C00', // Deep Orange
        '#10B981'  // Green
    ];

    if (!companyName || typeof companyName !== 'string') return hexPalette[0];

    // 3. Deterministic hashing
    let hash = 0;
    for (let i = 0; i < companyName.length; i++) {
        hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % hexPalette.length;
    return hexPalette[index];
};
