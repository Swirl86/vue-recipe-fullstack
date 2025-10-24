export async function withLoadingAndErrorState(asyncFn, loadingRef, errorRef, errorMessage) {
    loadingRef.value = true;
    errorRef.value = null;
    try {
        return await asyncFn();
    } catch (err) {
        console.error(err);
        errorRef.value = errorMessage || "Something went wrong.";
        return null;
    } finally {
        loadingRef.value = false;
    }
}
