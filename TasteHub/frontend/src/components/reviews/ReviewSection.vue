<template>
    <div class="reviews-list flex flex-col h-full mt-4 p-4 border-t pt-6">
        <!-- Section title -->
        <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ⭐ Reviews & Ratings
        </h3>

        <!-- Add new review -->
        <form @submit.prevent="submitReview" class="space-y-4 mb-4">
            <!-- Rating stars -->
            <div class="flex items-center gap-1">
                <label
                    v-for="i in 5"
                    :key="i"
                    class="cursor-pointer text-2xl sm:text-3xl"
                    @click="newRating = newRating === i ? 0 : i"
                >
                    <span :class="i <= newRating ? 'text-yellow-500' : 'text-gray-400'">★</span>
                </label>
            </div>

            <!-- Textarea -->
            <div class="relative">
                <textarea
                    v-model="newComment"
                    placeholder="Write your review..."
                    class="w-full max-w-full max-h-[200px] border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-white text-sm sm:text-base min-h-[80px] resize-y"
                    maxlength="300"
                    :disabled="newRating === 0"
                ></textarea>
                <span
                    class="absolute bottom-1 right-2 text-xs text-gray-500 dark:text-gray-400"
                    v-if="newComment.length > 0"
                >
                    {{ newComment.length }}/300
                </span>
            </div>

            <!-- Submit button -->
            <button
                type="submit"
                class="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loading || newRating === 0"
            >
                {{
                    loading
                        ? "Submitting..."
                        : newComment.trim()
                        ? "Submit Review"
                        : "Submit Rating"
                }}
            </button>
        </form>

        <div class="mt-2 border-t" />

        <!-- Reviews list -->
        <div
            v-if="reviews.length > 0"
            class="reviews-scroll flex-1 pr-2 space-y-4 overflow-y-auto overflow-x-hidden mt-4"
        >
            <div
                v-for="review in reviews"
                :key="review._id"
                class="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 break-words"
            >
                <!-- Rating -->
                <div class="flex justify-between mb-2">
                    <span
                        v-for="i in 5"
                        :key="i"
                        class="text-2xl sm:text-3xl font-semibold text-center flex-1"
                        :class="
                            i <= review.rating
                                ? 'text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                        "
                    >
                        ★
                    </span>
                </div>

                <!-- Comment -->
                <div
                    v-if="review.comment.length > 0"
                    class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-gray-700 dark:text-gray-200 text-sm sm:text-base"
                >
                    {{ review.comment }}
                </div>

                <!-- Metadata -->
                <div class="flex justify-center flex-wrap gap-2 mt-4 text-xs sm:text-sm">
                    <span
                        class="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium text-gray-700 dark:text-gray-200 flex gap-1"
                    >
                        {{
                            review.updatedAt && review.updatedAt !== review.createdAt
                                ? "Last Edited:"
                                : "Posted:"
                        }}
                        <span class="font-semibold">
                            {{
                                review.updatedAt && review.updatedAt !== review.createdAt
                                    ? new Date(review.updatedAt).toLocaleDateString()
                                    : new Date(review.createdAt).toLocaleDateString()
                            }}
                        </span>
                        by <span class="font-semibold">{{ review.userId || "Anonymous" }}</span>
                    </span>
                </div>
            </div>
        </div>

        <div v-else class="text-gray-500 dark:text-gray-400 mt-2">
            No reviews yet… maybe you can be the hero of this chapter! 🥢🍣
        </div>
    </div>
</template>

<script setup>
import { fetchReviews, postReview } from "@/api/reviews.js";
import { onMounted, ref, watch } from "vue";

const props = defineProps({ recipeId: String });
const reviews = ref([]);
const newRating = ref(0);
const newComment = ref("");
const loading = ref(false);

async function loadReviews() {
    if (!props.recipeId) return;
    reviews.value = await fetchReviews(props.recipeId);
}

async function submitReview() {
    if (!newRating.value) return alert("Please select a rating");

    loading.value = true;
    try {
        await postReview({
            recipeId: props.recipeId,
            rating: Number(newRating.value),
            comment: newComment.value || "",
        });
        newComment.value = "";
        newRating.value = 0;
        await loadReviews();
    } catch (err) {
        console.error("Failed to submit review:", err);
    } finally {
        loading.value = false;
    }
}

onMounted(loadReviews);
watch(() => props.recipeId, loadReviews);
</script>

<style scope>
.reviews-scroll::-webkit-scrollbar {
    width: 4px;
}

.reviews-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 9999px;
}

.reviews-scroll::-webkit-scrollbar-thumb:hover {
    background-color: rgba(107, 114, 128, 0.7);
}

.reviews-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.reviews-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgba(107, 114, 128, 0.5) transparent;
}

.reviews-scroll > div {
    max-width: 100%;
    word-break: break-word;
}

.reviews-list {
    overflow: visible;
}

@media (max-width: 768px) {
    .reviews-scroll {
        max-height: none !important;
        overflow-y: visible !important;
    }
}
</style>
