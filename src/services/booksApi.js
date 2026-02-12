import API from "./api";

export const getBooks = async ({
  page,
  limit,
  search,
  sort,
  order,
  signal,
  createdBy,
}) => {
  const params = new URLSearchParams({
    page: page,
    limit: limit,
    ...(search && { search: search }),
    ...(sort && { sort: sort }),
    ...(order && { order: order }),
    ...(createdBy && { createdBy }),
  });
  try {
    const res = await API.get(`books`, { params, signal });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};
export const getMyBooks = async ({
  page,
  limit,
  search,
  sort,
  order,
  signal,
  createdBy,
}) => {
  const params = new URLSearchParams({
    page: page,
    limit: limit,
    ...(search && { search: search }),
    ...(sort && { sort: sort }),
    ...(order && { order: order }),
    ...(createdBy && { createdBy }),
  });
  try {
    const res = await API.get(`books/my`, { params, signal });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};

export const createBook = async (book) => {
  try {
    const res = await API.post("books", book);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create book");
  }
};

export const updateBook = async ({ _id, ...updates }) => {
  try {
    const res = await API.patch(`books/book/${_id}`, updates);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update book");
  }
};
export const updateMyBook = async ({ _id, ...updates }) => {
  try {
    const res = await API.patch(`books/mybook/${_id}`, updates);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update book");
  }
};

export const deleteBook = async (_id) => {
  try {
    const res = await API.delete(`books/book/${_id}`);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete book");
  }
};
