import { getToken } from "../utils/auth";

const API_URL = "http://localhost:8000";


async function authFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

export async function registerUser(username, email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Registration failed"
    );
  }

  return data;
}


export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Login failed"
    );
  }

  return data;
}

export async function getMeetings() {
  const response = await authFetch(`${API_URL}/api/meetings`);

  if (!response.ok) {
    throw new Error("Failed to load meetings");
  }

  return response.json();
}


export async function getMeeting(meetingId) {
  const response = await authFetch(
    `${API_URL}/api/meetings/${meetingId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || data.error || "Failed to load meeting"
    );
  }

  return data;
}


export async function transcribeFile(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await authFetch(
    `${API_URL}/api/transcribe`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(
      data.error || "Something went wrong"
    );
  }

  return data;
}

export async function analyzeYouTube(url) {
  const response = await authFetch(
    `${API_URL}/api/youtube`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(
      data.error || "Something went wrong"
    );
  }

  return data;
}

export async function askMeetingQuestion(
  meetingId,
  question
) {
  const response = await authFetch(
    `${API_URL}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meeting_id: meetingId,
        question: question,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || data.error || "Failed to get answer"
    );
  }

  return data;
}

export async function getCurrentUser() {
  const response = await authFetch(
    `${API_URL}/api/auth/me`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to get current user"
    );
  }

  return data;
}

export async function loginWithGoogle(credential) {
  const response = await fetch(
    `${API_URL}/api/auth/google`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Google login failed"
    );
  }

  return data;
}

export async function uploadProfilePicture(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await authFetch(
    `${API_URL}/api/auth/profile-picture`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to upload profile picture"
    );
  }

  return data;
}

export async function deleteMeeting(meetingId) {
  const response = await authFetch(
    `${API_URL}/api/meetings/${meetingId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to delete meeting"
    );
  }

  return data;
}