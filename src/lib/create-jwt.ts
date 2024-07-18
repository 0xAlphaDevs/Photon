export const createJWT = async (data: string) => {
  const result = await callApi(data);

  return result;
};

async function callApi(message: string) {
  const res = await fetch("/api/create-jwt-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ message }),
  });
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