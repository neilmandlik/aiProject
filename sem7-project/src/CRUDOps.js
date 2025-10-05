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
