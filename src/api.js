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

const formatErrorDetail = (detail) => {
  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        if (item && typeof item === 'object') {
          const location = Array.isArray(item.loc) ? item.loc.filter((part) => part !== 'body').join(' -> ') : '';
          const message = item.msg || item.message || 'Некорректные данные';
          return location ? `${location}: ${message}` : message;
        }

        return '';
      })
      .filter(Boolean);

    return messages.join('. ') || 'Некорректные данные';
  }

  if (detail && typeof detail === 'object') {
    return detail.message || JSON.stringify(detail);
  }

  return 'Request failed';
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
    const detail = typeof payload === 'string' ? payload : formatErrorDetail(payload.detail || payload);
    throw new Error(detail);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};
