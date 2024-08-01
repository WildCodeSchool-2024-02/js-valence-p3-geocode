const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3310/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch...");
    }

    const data = await response.json();
    console.info("Fetched users data:", data);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch. Please try again.");
  }
};

export default fetchUsers;
