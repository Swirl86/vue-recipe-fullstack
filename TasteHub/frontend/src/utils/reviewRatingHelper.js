/**
 * ⭐ Convert a decimal fraction of a star into a stepped width percentage for display.
 * Used for partial stars in thirds (0.33, 0.66, 1.0).
 * Example: 0.2 → 33.33%, 0.5 → 66.66%, 0.8 → 100%.
 * @param {number} decimal - Fractional part of a star (0 <= decimal < 1)
 * @returns {number} - Width percentage to fill the partial star
 */
function decimalToThirds(decimal) {
    if (!decimal) return 0;
    const third = 1 / 3;
    if (decimal < third) return 33.33;
    if (decimal < 2 * third) return 66.66;
    return 100;
}

/**
 * ⭐ Determine width of star for display (full, partial, empty)
 * @param {number} starIndex - 1-based index of the star
 * @param {number} fullStars - Number of fully filled stars
 * @param {number} decimal - Decimal part of next star
 * @returns {number} - Width percentage of the star
 */
export function fillAmount(starIndex, fullStars, decimal) {
    if (starIndex <= fullStars) return 100; // full star
    if (starIndex === fullStars + 1) return decimalToThirds(decimal); // partial star
    return 0; // empty star
}

/**
 * ⭐ Calculate average rating from an array of reviews
 * @param {Array<{rating: number}>} reviews
 * @returns {number} Average rating (0 if no reviews)
 */
export function calculateAverageRating(reviews) {
    if (!reviews || !reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
}
