export const getPresignedURL = async () => {
  const result = await callApi();
  return result;
};

async function callApi() {
  const res = await fetch(`/api/get-presigned-url`);
  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & { status: number };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}
