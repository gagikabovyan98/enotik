export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const BACKEND_BASE = API_BASE.replace(/\/api\/?$/, '');

export const normalizeAssetUrl = (url) => {
  if (!url) {
    return '';
  }

  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  if (url.startsWith('/media/')) {
    return `${BACKEND_BASE}${url}`;
  }

  return url;
};

export const apiFetch = async (path, options = {}) => {
  const { headers: customHeaders = {}, ...restOptions } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json') ? await response.json() : await response.text();
    const detail = typeof payload === 'string' ? payload : payload.detail || 'Request failed';
    throw new Error(detail);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};
