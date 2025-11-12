export const getData = async (route) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${route}`);

    // If network completely fails (backend down)
    if (!response) {
      throw new Error("NO_RESPONSE");
    }

    const data = await response.json();

    if (!response.ok) {
      const err = new Error(data?.message || "Server error");
      err.status = response.status;
      err.userMessage = "Something went wrong while fetching data. Please refresh or try again later.";
      throw err;
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError") {
      // The classic 'Failed to fetch'
      error.userMessage = "Cannot connect to the server right now. Please refresh the page.";
    }
    throw error;
  }
};


export const postFile = async (route, file, extraFields = {}) => {
  try {
    // Construct FormData (multipart/form-data)
    const formData = new FormData();
    formData.append("file", file);

    // If you want to send additional data like bodyName or userId
    for (const [key, value] of Object.entries(extraFields)) {
      formData.append(key, value);
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${route}`, {
      method: "POST",
      body: formData,
    });

    // If backend is unreachable
    if (!response) {
      throw new Error("NO_RESPONSE");
    }

    const data = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
      const err = new Error(data?.message || "Server error");
      err.status = response.status;
      err.userMessage =
        "Something went wrong while uploading the file. Please try again.";
      throw err;
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError") {
      // “Failed to fetch” case
      error.userMessage =
        "Cannot connect to the server right now. Please check your internet or try again later.";
    }
    throw error;
  }
};
