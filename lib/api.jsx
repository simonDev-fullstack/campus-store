export const api = {
  async get(url) {
    const r = await fetch(process.env.NEXT_PUBLIC_API + url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return r.json();
  },

  async post(url, data) {
    const r = await fetch(process.env.NEXT_PUBLIC_API + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    return r.json();
  },

  async put(url, data) {
    const r = await fetch(process.env.NEXT_PUBLIC_API + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    return r.json();
  },

  async delete(url) {
    const r = await fetch(process.env.NEXT_PUBLIC_API + url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return r.json();
  },
};
