const BASE_URL = "https://notes-api.dicoding.dev/v1";

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

interface NoteInput {
  title: string;
  body: string;
}

interface ApiResponse<T = any> {
  status: "success" | "fail";
  message?: string;
  data?: T;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

interface ApiResult<T = any> {
  error: boolean;
  data: T | null;
}

// Token Functions
function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken: string): void {
  localStorage.setItem("accessToken", accessToken);
}

// Fetch with token
async function fetchWithToken(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

// API Functions
async function login({
  email,
  password,
}: LoginCredentials): Promise<ApiResult<{ accessToken: string }>> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson: ApiResponse<{ accessToken: string }> =
    await response.json();

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function register({
  name,
  email,
  password,
}: RegisterData): Promise<{ error: boolean }> {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson: ApiResponse = await response.json();

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function getUserLogged(): Promise<ApiResult<User>> {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson: ApiResponse<User> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function addNote({ title, body }: NoteInput): Promise<ApiResult<Note>> {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson: ApiResponse<Note> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function getActiveNotes(): Promise<ApiResult<Note[]>> {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson: ApiResponse<Note[]> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function getArchivedNotes(): Promise<ApiResult<Note[]>> {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson: ApiResponse<Note[]> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function getNote(id: string): Promise<ApiResult<Note>> {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson: ApiResponse<Note> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function archiveNote(id: string): Promise<ApiResult<Note>> {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });

  const responseJson: ApiResponse<Note> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function unarchiveNote(id: string): Promise<ApiResult<Note>> {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });

  const responseJson: ApiResponse<Note> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function deleteNote(id: string): Promise<ApiResult<{ message: string }>> {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson: ApiResponse<{ message: string }> = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data! };
}

async function fetchAllNotes(): Promise<Note[]> {
  const [activeRes, archivedRes] = await Promise.all([
    getActiveNotes(),
    getArchivedNotes(),
  ]);

  if (activeRes.error || archivedRes.error) {
    throw new Error("Failed to fetch notes");
  }

  return [...activeRes.data!, ...archivedRes.data!];
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  fetchAllNotes,
};

export type {
  LoginCredentials,
  RegisterData,
  NoteInput,
  User,
  Note,
  ApiResult,
};
