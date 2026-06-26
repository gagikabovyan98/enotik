import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE, BACKEND_BASE, apiFetch, normalizeAssetUrl } from '../api';

import './../App.css';

const STORAGE_KEY = 'enotik_admin_token';

const categoryOptions = [
  { value: 'loans', label: 'Займы' },
  { value: 'cards', label: 'Дебетовые карты' },
  { value: 'consumer-loans', label: 'Потребительские кредиты' },
  { value: 'auto-loans', label: 'Кредитные карты' },
  { value: 'collateral-loans', label: 'Кредиты под залог' },
  { value: 'job', label: 'Вакансии' },
  { value: 'education', label: 'Обучение' },
];

const emptySettings = {
  site_name: '',
  logo_url: '',
  hero_title: '',
  hero_subtitle: '',
  hero_image_url: '',
  footer_disclaimer_lines: [],
  footer_cookie_lines: [],
  social_links: [],
};

const emptyProduct = {
  category: 'loans',
  slug: '',
  title: '',
  subtitle: '',
  description: '',
  image_url: '',
  link_url: '',
  cta_text: 'Подробнее',
  rate: '',
  term: '',
  amount: '',
  bullets: [],
  position: 0,
  is_active: true,
};

const emptyNavItem = {
  label: '',
  path: '',
  position: 0,
  is_visible: true,
};

const emptyHomeFeature = {
  title: '',
  path: '',
  image_url: '',
  alt_text: '',
  position: 0,
  is_visible: true,
};

const emptyGalleryItem = {
  title: '',
  image_url: '',
  position: 0,
  is_visible: true,
};

const emptyReview = {
  name: '',
  review_text: '',
  avatar_url: '',
  position: 0,
  is_visible: true,
};

const TextareaArrayField = ({ label, value, onChange, placeholder }) => (
  <label className="admin-field admin-field-full">
    <span>{label}</span>
    <textarea
      value={(value || []).join('\n')}
      onChange={(event) => onChange(event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
      placeholder={placeholder}
      rows={5}
    />
  </label>
);

const JsonArrayField = ({ label, value, onChange, placeholder }) => (
  <label className="admin-field admin-field-full">
    <span>{label}</span>
    <textarea
      value={JSON.stringify(value || [], null, 2)}
      onChange={(event) => {
        try {
          onChange(JSON.parse(event.target.value || '[]'));
        } catch (error) {
          // Ignore invalid intermediate JSON while typing.
        }
      }}
      placeholder={placeholder}
      rows={8}
    />
  </label>
);

const ImagePreview = ({ value }) => {
  if (!value) {
    return null;
  }

  return <img className="admin-image-preview" src={normalizeAssetUrl(value)} alt="preview" />;
};

const UploadField = ({ token, onUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !token) {
      return;
    }

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${API_BASE}/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Не удалось загрузить изображение');
      }

      const data = await response.json();
      onUploaded(data.url);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="admin-upload">
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>Загрузка...</p>}
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
};

const uploadDataUrl = async (dataUrl, token) => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const extension = blob.type.split('/')[1] || 'png';
  const file = new File([blob], `upload.${extension}`, { type: blob.type || 'image/png' });
  const formData = new FormData();
  formData.append('file', file);

  const uploadResponse = await fetch(`${API_BASE}/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error('Не удалось загрузить изображение');
  }

  return uploadResponse.json();
};

const SectionList = ({ title, items, renderItem, emptyText }) => (
  <section className="admin-section">
    <div className="admin-section-header">
      <h2>{title}</h2>
    </div>
    {items.length ? <div className="admin-list">{items.map(renderItem)}</div> : <p>{emptyText}</p>}
  </section>
);

const AdminPage = () => {
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEY) || '');
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: 'admin12345' });
  const [loginError, setLoginError] = useState('');
  const [bootstrap, setBootstrap] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [activeTab, setActiveTab] = useState('settings');
  const [settingsForm, setSettingsForm] = useState(emptySettings);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [navForm, setNavForm] = useState(emptyNavItem);
  const [featureForm, setFeatureForm] = useState(emptyHomeFeature);
  const [galleryForm, setGalleryForm] = useState(emptyGalleryItem);
  const [reviewForm, setReviewForm] = useState(emptyReview);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const groupedProducts = useMemo(() => {
    const items = bootstrap?.products || [];
    return categoryOptions.map((category) => ({
      ...category,
      items: items.filter((item) => item.category === category.value),
    }));
  }, [bootstrap]);

  const loadBootstrap = useCallback(async (authToken = token) => {
    if (!authToken) {
      return;
    }

    try {
      setLoadError('');
      const data = await apiFetch('/admin/bootstrap', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBootstrap(data);
      setSettingsForm(data.settings || emptySettings);
    } catch (error) {
      setLoadError(error.message);
    }
  }, [token]);

  useEffect(() => {
    loadBootstrap();
  }, [loadBootstrap]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoginError('');
      setStatusMessage('');
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginForm),
      });
      localStorage.setItem(STORAGE_KEY, data.access_token);
      setToken(data.access_token);
      await loadBootstrap(data.access_token);
      setStatusType('success');
      setStatusMessage('Вход выполнен');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const saveSettings = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      setStatusMessage('');
      const data = await apiFetch('/admin/settings', {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(settingsForm),
      });
      setSettingsForm(data);
      await loadBootstrap();
      setStatusType('success');
      setStatusMessage('Настройки сохранены. При необходимости нажмите "Обновить".');
    } catch (error) {
      setStatusType('error');
      setStatusMessage(typeof error.message === 'string' ? error.message : 'Не удалось сохранить настройки');
    } finally {
      setSaving(false);
    }
  };

  const saveEntity = async ({ path, form, resetForm, editId }) => {
    setSaving(true);
    try {
      setStatusMessage('');
      const payload = { ...form };

      if (typeof payload.image_url === 'string' && payload.image_url.startsWith('data:image/')) {
        const uploaded = await uploadDataUrl(payload.image_url, token);
        payload.image_url = uploaded.url;
      }

      if (typeof payload.link_url === 'string' && payload.link_url.startsWith('data:')) {
        throw new Error('В поле ссылки должен быть обычный URL, а не изображение base64');
      }

      await apiFetch(`${path}${editId ? `/${editId}` : ''}`, {
        method: editId ? 'PUT' : 'POST',
        headers: authHeaders,
        body: JSON.stringify(payload),
      });
      resetForm();
      await loadBootstrap();
      setStatusType('success');
      setStatusMessage(editId ? 'Изменения сохранены. При необходимости нажмите "Обновить".' : 'Запись добавлена. При необходимости нажмите "Обновить".');
    } catch (error) {
      setStatusType('error');
      setStatusMessage(typeof error.message === 'string' ? error.message : 'Не удалось сохранить запись');
    } finally {
      setSaving(false);
    }
  };

  const deleteEntity = async (path, id) => {
    if (!window.confirm('Удалить запись?')) {
      return;
    }

    setSaving(true);
    try {
      setStatusMessage('');
      await apiFetch(`${path}/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      await loadBootstrap();
      setStatusType('success');
      setStatusMessage('Запись удалена. При необходимости нажмите "Обновить".');
    } catch (error) {
      setStatusType('error');
      setStatusMessage(typeof error.message === 'string' ? error.message : 'Не удалось удалить запись');
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken('');
    setBootstrap(null);
  };

  if (!token) {
    return (
      <div className="admin-page">
        <div className="admin-login-card">
          <h1>Вход в админку</h1>
          <form onSubmit={handleLogin} className="admin-grid">
            <label className="admin-field">
              <span>Логин</span>
              <input value={loginForm.username} onChange={(event) => setLoginForm((prev) => ({ ...prev, username: event.target.value }))} />
            </label>
            <label className="admin-field">
              <span>Пароль</span>
              <input type="password" value={loginForm.password} onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))} />
            </label>
            <button type="submit" className="admin-button">Войти</button>
          </form>
          {loginError && <p className="admin-error">{loginError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <div>
          <h1>Административная панель</h1>
          <p>API: {BACKEND_BASE}</p>
        </div>
        <div className="admin-actions">
          <button type="button" className="admin-button admin-button-secondary" onClick={() => loadBootstrap()}>
            Обновить
          </button>
          <button type="button" className="admin-button admin-button-secondary" onClick={logout}>
            Выйти
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        {[
          ['settings', 'Настройки сайта'],
          ['products', 'Продукты'],
          ['home', 'Главная'],
          ['gallery', 'Галерея'],
          ['reviews', 'Отзывы'],
          ['nav', 'Меню'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`admin-tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {loadError && <p className="admin-error">{loadError}</p>}
      {statusMessage && <p className={statusType === 'success' ? 'admin-success' : 'admin-error'}>{statusMessage}</p>}

      {activeTab === 'settings' && (
        <section className="admin-section">
          <h2>Общие настройки</h2>
          <form className="admin-grid" onSubmit={saveSettings}>
            <label className="admin-field">
              <span>Название сайта</span>
              <input value={settingsForm.site_name} onChange={(event) => setSettingsForm((prev) => ({ ...prev, site_name: event.target.value }))} />
            </label>
            <label className="admin-field">
              <span>URL логотипа</span>
              <input value={settingsForm.logo_url || ''} onChange={(event) => setSettingsForm((prev) => ({ ...prev, logo_url: event.target.value }))} />
              <ImagePreview value={settingsForm.logo_url} />
              <UploadField token={token} onUploaded={(url) => setSettingsForm((prev) => ({ ...prev, logo_url: url }))} />
            </label>
            <label className="admin-field">
              <span>Hero title</span>
              <input value={settingsForm.hero_title} onChange={(event) => setSettingsForm((prev) => ({ ...prev, hero_title: event.target.value }))} />
            </label>
            <label className="admin-field">
              <span>Hero subtitle</span>
              <input value={settingsForm.hero_subtitle} onChange={(event) => setSettingsForm((prev) => ({ ...prev, hero_subtitle: event.target.value }))} />
            </label>
            <label className="admin-field admin-field-full">
              <span>Hero image URL</span>
              <input value={settingsForm.hero_image_url || ''} onChange={(event) => setSettingsForm((prev) => ({ ...prev, hero_image_url: event.target.value }))} />
              <ImagePreview value={settingsForm.hero_image_url} />
              <UploadField token={token} onUploaded={(url) => setSettingsForm((prev) => ({ ...prev, hero_image_url: url }))} />
            </label>
            <TextareaArrayField
              label="Блок дисклеймеров"
              value={settingsForm.footer_disclaimer_lines}
              onChange={(value) => setSettingsForm((prev) => ({ ...prev, footer_disclaimer_lines: value }))}
              placeholder="Одна строка на абзац"
            />
            <TextareaArrayField
              label="Блок cookie и условий"
              value={settingsForm.footer_cookie_lines}
              onChange={(value) => setSettingsForm((prev) => ({ ...prev, footer_cookie_lines: value }))}
              placeholder="Одна строка на абзац"
            />
            <JsonArrayField
              label="Социальные ссылки JSON"
              value={settingsForm.social_links}
              onChange={(value) => setSettingsForm((prev) => ({ ...prev, social_links: value }))}
              placeholder='[{"label":"VK","url":"https://..."}]'
            />
            <button type="submit" className="admin-button" disabled={saving}>Сохранить настройки</button>
          </form>
        </section>
      )}

      {activeTab === 'products' && (
        <>
          <section className="admin-section">
            <h2>{productForm.id ? 'Редактирование продукта' : 'Новый продукт'}</h2>
            <form
              className="admin-grid"
              onSubmit={(event) => {
                event.preventDefault();
                saveEntity({
                  path: '/admin/products',
                  form: productForm,
                  editId: productForm.id,
                  resetForm: () => setProductForm(emptyProduct),
                });
              }}
            >
              <label className="admin-field">
                <span>Категория</span>
                <select value={productForm.category} onChange={(event) => setProductForm((prev) => ({ ...prev, category: event.target.value }))}>
                  {categoryOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label className="admin-field">
                <span>Slug</span>
                <input value={productForm.slug} onChange={(event) => setProductForm((prev) => ({ ...prev, slug: event.target.value }))} />
              </label>
              <label className="admin-field">
                <span>Название</span>
                <input value={productForm.title} onChange={(event) => setProductForm((prev) => ({ ...prev, title: event.target.value }))} />
              </label>
              <label className="admin-field">
                <span>Подзаголовок</span>
                <input value={productForm.subtitle || ''} onChange={(event) => setProductForm((prev) => ({ ...prev, subtitle: event.target.value }))} />
              </label>
              <label className="admin-field">
                <span>Ставка</span>
                <input value={productForm.rate || ''} onChange={(event) => setProductForm((prev) => ({ ...prev, rate: event.target.value }))} />
              </label>
              <label className="admin-field">
                <span>Срок</span>
                <input value={productForm.term || ''} onChange={(event) => setProductForm((prev) => ({ ...prev, term: event.target.value }))} />
              </label>
              <label className="admin-field">
                <span>Сумма</span>
                <input value={productForm.amount || ''} onChange={(event) => setProductForm((prev) => ({ ...prev, amount: event.target.value }))} />
              </label>
              <label className="admin-field">
                <span>Текст кнопки</span>
                <input value={productForm.cta_text} onChange={(event) => setProductForm((prev) => ({ ...prev, cta_text: event.target.value }))} />
              </label>
              <label className="admin-field admin-field-full">
                <span>Описание</span>
                <textarea rows={4} value={productForm.description || ''} onChange={(event) => setProductForm((prev) => ({ ...prev, description: event.target.value }))} />
              </label>
              <label className="admin-field admin-field-full">
                <span>URL изображения</span>
                <input value={productForm.image_url || ''} onChange={(event) => setProductForm((prev) => ({ ...prev, image_url: event.target.value }))} />
                <ImagePreview value={productForm.image_url} />
                <UploadField token={token} onUploaded={(url) => setProductForm((prev) => ({ ...prev, image_url: url }))} />
              </label>
              <label className="admin-field admin-field-full">
                <span>Ссылка</span>
                <input value={productForm.link_url} onChange={(event) => setProductForm((prev) => ({ ...prev, link_url: event.target.value }))} />
              </label>
              <TextareaArrayField
                label="Пункты списка"
                value={productForm.bullets}
                onChange={(value) => setProductForm((prev) => ({ ...prev, bullets: value }))}
                placeholder="Одна строка на пункт"
              />
              <label className="admin-field">
                <span>Позиция</span>
                <input type="number" value={productForm.position} onChange={(event) => setProductForm((prev) => ({ ...prev, position: Number(event.target.value) }))} />
              </label>
              <label className="admin-field checkbox-field">
                <input type="checkbox" checked={productForm.is_active} onChange={(event) => setProductForm((prev) => ({ ...prev, is_active: event.target.checked }))} />
                <span>Активен</span>
              </label>
              <div className="admin-actions-row">
                <button type="submit" className="admin-button" disabled={saving}>Сохранить продукт</button>
                <button type="button" className="admin-button admin-button-secondary" onClick={() => setProductForm(emptyProduct)}>Очистить</button>
              </div>
            </form>
          </section>

          {groupedProducts.map((group) => (
            <SectionList
              key={group.value}
              title={group.label}
              items={group.items}
              emptyText="Записей пока нет."
              renderItem={(item) => (
                <div key={item.id} className="admin-card">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.slug}</p>
                    <p>{item.link_url}</p>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="admin-button admin-button-secondary" onClick={() => setProductForm(item)}>Редактировать</button>
                    <button type="button" className="admin-button admin-button-danger" onClick={() => deleteEntity('/admin/products', item.id)}>Удалить</button>
                  </div>
                </div>
              )}
            />
          ))}
        </>
      )}

      {activeTab === 'home' && (
        <>
          <section className="admin-section">
            <h2>{featureForm.id ? 'Редактирование блока главной' : 'Новый блок главной'}</h2>
            <form
              className="admin-grid"
              onSubmit={(event) => {
                event.preventDefault();
                saveEntity({
                  path: '/admin/home-features',
                  form: featureForm,
                  editId: featureForm.id,
                  resetForm: () => setFeatureForm(emptyHomeFeature),
                });
              }}
            >
              <label className="admin-field"><span>Заголовок</span><input value={featureForm.title} onChange={(event) => setFeatureForm((prev) => ({ ...prev, title: event.target.value }))} /></label>
              <label className="admin-field"><span>Путь</span><input value={featureForm.path} onChange={(event) => setFeatureForm((prev) => ({ ...prev, path: event.target.value }))} /></label>
              <label className="admin-field"><span>Alt text</span><input value={featureForm.alt_text || ''} onChange={(event) => setFeatureForm((prev) => ({ ...prev, alt_text: event.target.value }))} /></label>
              <label className="admin-field"><span>Позиция</span><input type="number" value={featureForm.position} onChange={(event) => setFeatureForm((prev) => ({ ...prev, position: Number(event.target.value) }))} /></label>
              <label className="admin-field admin-field-full"><span>URL изображения</span><input value={featureForm.image_url || ''} onChange={(event) => setFeatureForm((prev) => ({ ...prev, image_url: event.target.value }))} /><ImagePreview value={featureForm.image_url} /><UploadField token={token} onUploaded={(url) => setFeatureForm((prev) => ({ ...prev, image_url: url }))} /></label>
              <label className="admin-field checkbox-field"><input type="checkbox" checked={featureForm.is_visible} onChange={(event) => setFeatureForm((prev) => ({ ...prev, is_visible: event.target.checked }))} /><span>Показывать</span></label>
              <div className="admin-actions-row">
                <button type="submit" className="admin-button" disabled={saving}>Сохранить</button>
                <button type="button" className="admin-button admin-button-secondary" onClick={() => setFeatureForm(emptyHomeFeature)}>Очистить</button>
              </div>
            </form>
          </section>
          <SectionList
            title="Блоки главной"
            items={bootstrap?.home_features || []}
            emptyText="Блоков пока нет."
            renderItem={(item) => (
              <div key={item.id} className="admin-card">
                <div><strong>{item.title}</strong><p>{item.path}</p></div>
                <div className="admin-actions">
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => setFeatureForm(item)}>Редактировать</button>
                  <button type="button" className="admin-button admin-button-danger" onClick={() => deleteEntity('/admin/home-features', item.id)}>Удалить</button>
                </div>
              </div>
            )}
          />
        </>
      )}

      {activeTab === 'gallery' && (
        <>
          <section className="admin-section">
            <h2>{galleryForm.id ? 'Редактирование изображения' : 'Новое изображение'}</h2>
            <form
              className="admin-grid"
              onSubmit={(event) => {
                event.preventDefault();
                saveEntity({
                  path: '/admin/gallery-items',
                  form: galleryForm,
                  editId: galleryForm.id,
                  resetForm: () => setGalleryForm(emptyGalleryItem),
                });
              }}
            >
              <label className="admin-field"><span>Заголовок</span><input value={galleryForm.title || ''} onChange={(event) => setGalleryForm((prev) => ({ ...prev, title: event.target.value }))} /></label>
              <label className="admin-field"><span>Позиция</span><input type="number" value={galleryForm.position} onChange={(event) => setGalleryForm((prev) => ({ ...prev, position: Number(event.target.value) }))} /></label>
              <label className="admin-field admin-field-full"><span>URL изображения</span><input value={galleryForm.image_url} onChange={(event) => setGalleryForm((prev) => ({ ...prev, image_url: event.target.value }))} /><ImagePreview value={galleryForm.image_url} /><UploadField token={token} onUploaded={(url) => setGalleryForm((prev) => ({ ...prev, image_url: url }))} /></label>
              <label className="admin-field checkbox-field"><input type="checkbox" checked={galleryForm.is_visible} onChange={(event) => setGalleryForm((prev) => ({ ...prev, is_visible: event.target.checked }))} /><span>Показывать</span></label>
              <div className="admin-actions-row">
                <button type="submit" className="admin-button" disabled={saving}>Сохранить</button>
                <button type="button" className="admin-button admin-button-secondary" onClick={() => setGalleryForm(emptyGalleryItem)}>Очистить</button>
              </div>
            </form>
          </section>
          <SectionList
            title="Галерея"
            items={bootstrap?.gallery_items || []}
            emptyText="Изображений пока нет."
            renderItem={(item) => (
              <div key={item.id} className="admin-card">
                <div><strong>{item.title || 'Без названия'}</strong></div>
                <div className="admin-actions">
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => setGalleryForm(item)}>Редактировать</button>
                  <button type="button" className="admin-button admin-button-danger" onClick={() => deleteEntity('/admin/gallery-items', item.id)}>Удалить</button>
                </div>
              </div>
            )}
          />
        </>
      )}

      {activeTab === 'reviews' && (
        <>
          <section className="admin-section">
            <h2>{reviewForm.id ? 'Редактирование отзыва' : 'Новый отзыв'}</h2>
            <form
              className="admin-grid"
              onSubmit={(event) => {
                event.preventDefault();
                saveEntity({
                  path: '/admin/reviews',
                  form: reviewForm,
                  editId: reviewForm.id,
                  resetForm: () => setReviewForm(emptyReview),
                });
              }}
            >
              <label className="admin-field"><span>Имя</span><input value={reviewForm.name} onChange={(event) => setReviewForm((prev) => ({ ...prev, name: event.target.value }))} /></label>
              <label className="admin-field"><span>Позиция</span><input type="number" value={reviewForm.position} onChange={(event) => setReviewForm((prev) => ({ ...prev, position: Number(event.target.value) }))} /></label>
              <label className="admin-field admin-field-full"><span>Текст отзыва</span><textarea rows={5} value={reviewForm.review_text} onChange={(event) => setReviewForm((prev) => ({ ...prev, review_text: event.target.value }))} /></label>
              <label className="admin-field admin-field-full"><span>URL аватара</span><input value={reviewForm.avatar_url || ''} onChange={(event) => setReviewForm((prev) => ({ ...prev, avatar_url: event.target.value }))} /><ImagePreview value={reviewForm.avatar_url} /><UploadField token={token} onUploaded={(url) => setReviewForm((prev) => ({ ...prev, avatar_url: url }))} /></label>
              <label className="admin-field checkbox-field"><input type="checkbox" checked={reviewForm.is_visible} onChange={(event) => setReviewForm((prev) => ({ ...prev, is_visible: event.target.checked }))} /><span>Показывать</span></label>
              <div className="admin-actions-row">
                <button type="submit" className="admin-button" disabled={saving}>Сохранить</button>
                <button type="button" className="admin-button admin-button-secondary" onClick={() => setReviewForm(emptyReview)}>Очистить</button>
              </div>
            </form>
          </section>
          <SectionList
            title="Отзывы"
            items={bootstrap?.reviews || []}
            emptyText="Отзывов пока нет."
            renderItem={(item) => (
              <div key={item.id} className="admin-card">
                <div><strong>{item.name}</strong><p>{item.review_text}</p></div>
                <div className="admin-actions">
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => setReviewForm(item)}>Редактировать</button>
                  <button type="button" className="admin-button admin-button-danger" onClick={() => deleteEntity('/admin/reviews', item.id)}>Удалить</button>
                </div>
              </div>
            )}
          />
        </>
      )}

      {activeTab === 'nav' && (
        <>
          <section className="admin-section">
            <h2>{navForm.id ? 'Редактирование пункта меню' : 'Новый пункт меню'}</h2>
            <form
              className="admin-grid"
              onSubmit={(event) => {
                event.preventDefault();
                saveEntity({
                  path: '/admin/nav-items',
                  form: navForm,
                  editId: navForm.id,
                  resetForm: () => setNavForm(emptyNavItem),
                });
              }}
            >
              <label className="admin-field"><span>Название</span><input value={navForm.label} onChange={(event) => setNavForm((prev) => ({ ...prev, label: event.target.value }))} /></label>
              <label className="admin-field"><span>Путь</span><input value={navForm.path} onChange={(event) => setNavForm((prev) => ({ ...prev, path: event.target.value }))} /></label>
              <label className="admin-field"><span>Позиция</span><input type="number" value={navForm.position} onChange={(event) => setNavForm((prev) => ({ ...prev, position: Number(event.target.value) }))} /></label>
              <label className="admin-field checkbox-field"><input type="checkbox" checked={navForm.is_visible} onChange={(event) => setNavForm((prev) => ({ ...prev, is_visible: event.target.checked }))} /><span>Показывать</span></label>
              <div className="admin-actions-row">
                <button type="submit" className="admin-button" disabled={saving}>Сохранить</button>
                <button type="button" className="admin-button admin-button-secondary" onClick={() => setNavForm(emptyNavItem)}>Очистить</button>
              </div>
            </form>
          </section>
          <SectionList
            title="Пункты меню"
            items={bootstrap?.nav_items || []}
            emptyText="Пунктов пока нет."
            renderItem={(item) => (
              <div key={item.id} className="admin-card">
                <div><strong>{item.label}</strong><p>{item.path}</p></div>
                <div className="admin-actions">
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => setNavForm(item)}>Редактировать</button>
                  <button type="button" className="admin-button admin-button-danger" onClick={() => deleteEntity('/admin/nav-items', item.id)}>Удалить</button>
                </div>
              </div>
            )}
          />
        </>
      )}
    </div>
  );
};

export default AdminPage;
