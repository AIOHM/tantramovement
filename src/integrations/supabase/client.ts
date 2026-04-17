const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';

const tableRoutes: Record<string, string> = {
  site_settings: '/api/settings',
  workshops: '/api/workshops',
  blog_posts: '/api/blog',
  consultation_requests: '/api/consultations',
  contact_messages: '/api/contact/messages',
  newsletter_subscribers: '/api/contact/subscribers',
  analytics_page_views: '/api/analytics/pageview',
  analytics_events: '/api/analytics/click',
  analytics_time_spent: '/api/analytics/time',
};

const functionRoutes: Record<string, string> = {
  'validate-admin': '/api/auth/login',
};

const normalizeUrl = (path: string) => {
  if (!path) return API_BASE || '/';
  return path.startsWith('/') ? `${API_BASE}${path}` : `${API_BASE}/${path}`;
};

const handleResponse = async (response: Response) => {
  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    return {
      data: null,
      error: {
        message: data?.error || response.statusText || 'Request failed',
        code: response.status,
      },
    };
  }

  return { data, error: null };
};

const filterFields = (row: any, selectFields: string) => {
  if (!selectFields || selectFields === '*' || selectFields.trim() === '*') {
    return row;
  }
  const fields = selectFields.split(',').map((field) => field.trim().replace(/^"|"$/g, ''));
  const filtered: any = {};
  fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(row, field)) {
      filtered[field] = row[field];
    }
  });
  return filtered;
};

const createTableClient = (table: string) => {
  const route = tableRoutes[table];
  if (!route) {
    throw new Error(`No API route configured for table '${table}'`);
  }

  const state = {
    select: '*',
    order: null as null | { field: string; ascending: boolean },
    limit: null as null | number,
    filters: [] as Array<{ field: string; value: any }>,
    maybeSingle: false,
    single: false,
  };

  const buildUrl = () => {
    const idFilter = state.filters.find((filter) => filter.field === 'id');
    if (idFilter) {
      return normalizeUrl(`${route}/${encodeURIComponent(String(idFilter.value))}`);
    }
    return normalizeUrl(route);
  };

  const execute = async (operation: 'select' | 'insert' | 'update' | 'delete', body?: any) => {
    const baseUrl = buildUrl();
    let response: Response;
    const opts: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    switch (operation) {
      case 'select': {
        response = await fetch(baseUrl, opts);
        const { data, error } = await handleResponse(response);
        if (error) return { data: null, error };

        if (Array.isArray(data)) {
          let result = state.select !== '*' ? data.map((row) => filterFields(row, state.select)) : data;

          if (state.order) {
            result = [...result].sort((a: any, b: any) => {
              const valueA = a[state.order!.field];
              const valueB = b[state.order!.field];
              if (valueA == null) return 1;
              if (valueB == null) return -1;
              if (valueA < valueB) return state.order!.ascending ? -1 : 1;
              if (valueA > valueB) return state.order!.ascending ? 1 : -1;
              return 0;
            });
          }

          if (typeof state.limit === 'number') {
            result = result.slice(0, state.limit);
          }

          if (state.single || state.maybeSingle) {
            return { data: result[0] ?? null, error: null };
          }
          return { data: result, error: null };
        }

        return { data, error: null };
      }
      case 'insert': {
        let insertUrl = baseUrl;
        if (table === 'contact_messages') {
          insertUrl = normalizeUrl('/api/contact/contact');
        } else if (table === 'newsletter_subscribers') {
          insertUrl = normalizeUrl('/api/contact/subscribe');
        }
        opts.method = 'POST';
        opts.body = JSON.stringify(body);
        response = await fetch(insertUrl, opts);
        return handleResponse(response);
      }
      case 'update': {
        opts.method = 'PUT';
        opts.body = JSON.stringify(body);
        response = await fetch(baseUrl, opts);
        return handleResponse(response);
      }
      case 'delete': {
        opts.method = 'DELETE';
        response = await fetch(baseUrl, opts);
        return handleResponse(response);
      }
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  };

  return {
    select(fields = '*') {
      state.select = fields;
      return this;
    },
    order(field: string, opts: { ascending?: boolean } = { ascending: true }) {
      state.order = { field, ascending: opts.ascending ?? true };
      return this;
    },
    limit(count: number) {
      state.limit = count;
      return this;
    },
    eq(field: string, value: any) {
      state.filters.push({ field, value });
      return this;
    },
    maybeSingle() {
      state.maybeSingle = true;
      return this;
    },
    single() {
      state.single = true;
      return this;
    },
    insert(body: any) {
      return execute('insert', body);
    },
    update(body: any) {
      return execute('update', body);
    },
    delete() {
      return execute('delete');
    },
    then(resolve: any, reject: any) {
      return execute('select').then(resolve, reject);
    },
    catch(reject: any) {
      return this.then(undefined, reject);
    },
  };
};

export const supabase: any = {
  from(table: string) {
    return createTableClient(table);
  },
  functions: {
    async invoke(functionName: string, options: { body?: any } = {}) {
      const route = functionRoutes[functionName];
      if (!route) {
        return { data: { success: true }, error: null };
      }
      const response = await fetch(normalizeUrl(route), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options.body || {}),
      });
      return handleResponse(response);
    },
  },
  auth: {
    async getSession() {
      return { data: { session: null }, error: null };
    },
  },
};
