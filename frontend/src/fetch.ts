function getStoredToken(): string {
  return localStorage.getItem("token") || "";
}

export function getUserToken(email: string, password: string) {
  return fetch("/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export function fetchNotes() {
  return fetch("/api/note/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: getStoredToken(),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching notes");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchNoteById(id: string) {
  return fetch(`/api/note/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: getStoredToken(),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching note");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function createNote(content: string) {
  return fetch("/api/note/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getStoredToken(),
    },
    body: JSON.stringify({ content: content }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error creating note");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function updateNote(id: string, content: string) {
  return fetch("/api/note/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getStoredToken(),
    },
    body: JSON.stringify({
      id: id,
      content: content
    })
  })
}

export function deleteNote(id: number) {
  fetch(`/api/note/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: getStoredToken(),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error deleting note");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}
