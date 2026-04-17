// API client for TTC backend
const API_BASE = '/api';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add admin token if present
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth
  async login(password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { password },
    });
  }

  async verifySession() {
    return this.request('/auth/verify');
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Workshops
  async getWorkshops() {
    return this.request('/workshops');
  }

  async getWorkshop(id) {
    return this.request(`/workshops/${id}`);
  }

  async createWorkshop(data) {
    return this.request('/workshops', {
      method: 'POST',
      body: data,
    });
  }

  async updateWorkshop(id, data) {
    return this.request(`/workshops/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteWorkshop(id) {
    return this.request(`/workshops/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog
  async getBlogPosts() {
    return this.request('/blog');
  }

  async getBlogPost(id) {
    return this.request(`/blog/${id}`);
  }

  async createBlogPost(data) {
    return this.request('/blog', {
      method: 'POST',
      body: data,
    });
  }

  async updateBlogPost(id, data) {
    return this.request(`/blog/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteBlogPost(id) {
    return this.request(`/blog/${id}`, {
      method: 'DELETE',
    });
  }

  // Registrations
  async createCheckoutSession(data) {
    return this.request('/registrations/create-checkout', {
      method: 'POST',
      body: data,
    });
  }

  async createRegistration(data) {
    return this.request('/registrations', {
      method: 'POST',
      body: data,
    });
  }

  async getRegistrations(workshopId) {
    return this.request(`/registrations/workshop/${workshopId}`);
  }

  async getAllRegistrations() {
    return this.request('/registrations/admin/all');
  }

  async deleteRegistration(id) {
    return this.request(`/registrations/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact
  async submitContactForm(data) {
    return this.request('/contact/contact', {
      method: 'POST',
      body: data,
    });
  }

  async subscribeNewsletter(email) {
    return this.request('/contact/subscribe', {
      method: 'POST',
      body: { email },
    });
  }

  async getContactMessages() {
    return this.request('/contact/messages');
  }

  async deleteContactMessage(id) {
    return this.request(`/contact/messages/${id}`, {
      method: 'DELETE',
    });
  }

  async getSubscribers() {
    return this.request('/contact/subscribers');
  }

  async deleteSubscriber(id) {
    return this.request(`/contact/subscribers/${id}`, {
      method: 'DELETE',
    });
  }

  // Consultations
  async submitConsultation(data) {
    return this.request('/consultations', {
      method: 'POST',
      body: data,
    });
  }

  async getConsultations() {
    return this.request('/consultations');
  }

  async updateConsultation(id, status) {
    return this.request(`/consultations/${id}`, {
      method: 'PATCH',
      body: { status },
    });
  }

  async deleteConsultation(id) {
    return this.request(`/consultations/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async trackPageView(data) {
    return this.request('/analytics/pageview', {
      method: 'POST',
      body: data,
    });
  }

  async trackClick(data) {
    return this.request('/analytics/click', {
      method: 'POST',
      body: data,
    });
  }

  async trackTimeSpent(data) {
    return this.request('/analytics/time', {
      method: 'POST',
      body: data,
    });
  }

  async getAnalyticsDashboard() {
    return this.request('/analytics/dashboard');
  }

  // Settings
  async getSettings() {
    return this.request('/settings');
  }

  async saveSettings(settings) {
    return this.request('/settings', {
      method: 'POST',
      body: { settings },
    });
  }
}

export const api = new ApiClient();
