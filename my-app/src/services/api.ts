const API_BASE_URL = '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Request failed');
  }
  return response.json();
}

export const api = {
  // Artists
  artists: {
    getAll: () => 
      fetch(`${API_BASE_URL}/artists`)
        .then(handleResponse<any[]>),
    
    getById: (id: string) => 
      fetch(`${API_BASE_URL}/artists/${id}`)
        .then(handleResponse<any>),
    
    create: (data: any) => 
      fetch(`${API_BASE_URL}/artists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      }).then(handleResponse<any>),
    
    update: (id: string, data: any) => 
      fetch(`${API_BASE_URL}/artists/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      }).then(handleResponse<any>),
    
    delete: (id: string) => 
      fetch(`${API_BASE_URL}/artists/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(handleResponse<any>)
  },

  // Events
  events: {
    getAll: () => 
      fetch(`${API_BASE_URL}/events`)
        .then(handleResponse<any[]>),
    
    getById: (id: string) => 
      fetch(`${API_BASE_URL}/events/${id}`)
        .then(handleResponse<any>),
    
    create: (data: any) => 
      fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      }).then(handleResponse<any>),
    
    update: (id: string, data: any) => 
      fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      }).then(handleResponse<any>),
    
    delete: (id: string) => 
      fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(handleResponse<any>)
  },

  // Contact
  contact: {
    send: (data: any) => 
      fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(handleResponse<any>)
  },

  // Auth
  auth: {
    login: (email: string, password: string) => 
      fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }).then(handleResponse<{ token: string; user: any }>),
    
    register: (data: any) => 
      fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(handleResponse<{ token: string; user: any }>),
    
    getProfile: () => 
      fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(handleResponse<any>)
  }
};