interface CourseQuery {
  courseId: string;
  courseCreator: string;
}

export const getCourseDetails = async (data: CourseQuery) => {
  const result = await callApi(data);

  return result;
};

async function callApi(query: CourseQuery) {
  const res = await fetch(
    `/api/get-course-videos/?courseId=${query.courseId}&courseCreator=${query.courseCreator}`
  );
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
